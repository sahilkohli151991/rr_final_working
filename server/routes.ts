import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "@shared/schema";
import { z } from "zod";
import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) throw new Error('STRIPE_SECRET_KEY missing in environment');
const stripe = new Stripe(stripeSecretKey, { apiVersion: '2025-06-30.basil' });

const router = express.Router();

// Stripe Checkout session endpoint (merged for Render single-port deploy)
router.post('/api/create-checkout-session', async (req, res) => {
  // Accept both old and new formats for compatibility
  const { planName, amount, currency, name, description, successUrl, cancelUrl } = req.body;

  // Prefer new format (planName, amount, currency)
  const sessionName = planName || name;
  const sessionCurrency = currency || 'usd';
  const sessionDescription = description || '';
  const sessionAmount = amount;

  // Use default success/cancel URLs if not provided
  const defaultSuccess = process.env.STRIPE_SUCCESS_URL || 'https://yourdomain.com/payment-success?session_id={CHECKOUT_SESSION_ID}';
  const defaultCancel = process.env.STRIPE_CANCEL_URL || 'https://yourdomain.com/payment-cancel';

  if (!sessionName || !sessionAmount || !sessionCurrency) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: sessionCurrency,
            product_data: {
              name: sessionName,
              ...(sessionDescription ? { description: sessionDescription } : {}),
            },
            unit_amount: Math.round(Number(sessionAmount) * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl || defaultSuccess,
      cancel_url: cancelUrl || defaultCancel,
    });
    res.json({ url: session.url });
  } catch (err) {
    // Print the full Stripe error object for debugging
    if (err && typeof err === 'object' && 'raw' in err) {
      console.error('Stripe error:', err['raw']);
    } else {
      console.error('Stripe error:', err);
    }
    res.status(500).json({ error: 'Stripe session creation failed', details: err instanceof Error ? err.message : err });
  }
});

// Add this middleware to log all requests
router.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`, {
    headers: req.headers,
    body: req.body
  });
  next();
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
