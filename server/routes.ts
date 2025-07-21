import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "@shared/schema";
import { z } from "zod";
import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

// Load environment variables
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-06-30.basil', // Match the API version with the installed Stripe types
});

const router = express.Router();

// Type for the checkout session request body
interface CheckoutSessionRequest {
  amount: number;
  name: string;
  description: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}

// Add this middleware to log all requests
router.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`, {
    headers: req.headers,
    body: req.body
  });
  next();
});

router.post('/api/create-checkout-session', async (req, res) => {
  console.log('=== Received checkout session request ===');
  console.log('Request body:', JSON.stringify(req.body, null, 2));
  console.log('Request headers:', JSON.stringify(req.headers, null, 2));
  
  try {
    const { 
      amount, 
      name, 
      description, 
      successUrl, 
      cancelUrl,
      metadata = {}
    } = req.body as CheckoutSessionRequest;

    // Validate required fields
    console.log('Validating request data:', { 
      amount, 
      name, 
      description, 
      successUrl, 
      cancelUrl,
      metadata
    });
    
    if (!amount || !name || !description || !successUrl || !cancelUrl) {
      return res.status(400).json({ 
        error: 'Missing required fields: amount, name, description, successUrl, cancelUrl' 
      });
    }

    // Create a checkout session with enhanced logging
    console.log('Creating Stripe checkout session with:', {
      amount,
      name,
      description,
      successUrl,
      cancelUrl,
      metadata,
      stripeKey: process.env.STRIPE_SECRET_KEY ? 'Key is set' : 'Missing Stripe key!'
    });
    
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: {
              name: name.substring(0, 100), // Ensure name is not too long
              description: description ? description.substring(0, 300) : '',
            },
            unit_amount: Math.round(amount * 100), // Convert to cents
          },
          quantity: 1,
        }],
        mode: 'payment',
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
          ...metadata,
          application: 'RoleRaise',
          timestamp: new Date().toISOString()
        },
      });
      
      console.log('Successfully created Stripe session:', session.id);
      return session;

      res.json({ 
        success: true, 
        sessionId: session.id,
        publishableKey: process.env.STRIPE_PUBLIC_KEY,
        url: session.url // Include the checkout URL in the response
      });
    } catch (error: unknown) {
      // Type assertion for Stripe errors
      const stripeError = error as {
        type?: string;
        code?: string;
        message: string;
        statusCode?: number;
        raw?: any;
      };
      
      console.error('Stripe API error:', {
        message: stripeError.message,
        type: 'type' in stripeError ? stripeError.type : 'unknown',
        code: 'code' in stripeError ? stripeError.code : 'unknown',
        statusCode: stripeError.statusCode,
        raw: stripeError.raw
      });
      
      res.status(500).json({ 
        success: false,
        error: 'Failed to create checkout session',
        details: {
          message: stripeError.message,
          type: 'type' in stripeError ? stripeError.type : 'unknown',
          code: 'code' in stripeError ? stripeError.code : 'unknown',
          statusCode: stripeError.statusCode
        }
      });
    }
  } catch (err: unknown) {
    const error = err as Error;
    console.error('Server error during checkout creation:', {
      message: error.message,
      stack: error.stack
    });
    
    res.status(500).json({ 
      success: false,
      error: 'Internal server error',
      details: error.message || 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
});

export default router;

export async function registerRoutes(app: Express): Promise<Server> {
  // Mount the router that contains our Stripe routes
  app.use(router);
  
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      res.json({ success: true, submission });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid form data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to submit contact form" });
      }
    }
  });

  // Get all contact submissions (for admin/testing purposes)
  app.get("/api/contact-submissions", async (req, res) => {
    try {
      const submissions = await storage.getAllContactSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve submissions" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
