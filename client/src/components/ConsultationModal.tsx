import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    Calendly: any;
  }
}

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const calendlyRef = useRef<HTMLDivElement>(null);
  const calendlyScriptAdded = useRef(false);

  // Load Calendly script and initialize
  useEffect(() => {
    if (!isOpen) return;

    let timeoutId: NodeJS.Timeout;

    const loadCalendly = () => {
      if (window.Calendly) {
        // Small delay to ensure DOM is ready
        timeoutId = setTimeout(initCalendly, 100);
        return;
      }

      if (!calendlyScriptAdded.current) {
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        script.onload = () => {
          // Small delay to ensure Calendly is fully loaded
          timeoutId = setTimeout(initCalendly, 100);
        };
        document.head.appendChild(script);
        calendlyScriptAdded.current = true;
      }
    };

    const initCalendly = () => {
      if (calendlyRef.current) {
        // Clear any existing content
        calendlyRef.current.innerHTML = '';
        
        // Add Calendly iframe directly
        const iframe = document.createElement('iframe');
        iframe.src = 'https://calendly.com/kohlisahil151991';
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.frameBorder = '0';
        iframe.title = 'Schedule a consultation';
        calendlyRef.current.appendChild(iframe);
      }
    };

    loadCalendly();

    // Cleanup function
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      // Clear the container when closing
      if (calendlyRef.current) {
        calendlyRef.current.innerHTML = '';
      }
    };
  }, [isOpen]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden"
          style={{ height: '80vh', maxHeight: '800px' }}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
          
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-5 text-white">
              <h2 className="text-xl font-bold">Schedule Your Free Consultation</h2>
              <p className="text-blue-100 text-sm mt-1">
                Pick a time that works best for you
              </p>
            </div>
            
            {/* Calendly Embed */}
            <div 
              ref={calendlyRef}
              className="calendly-inline-widget"
              style={{
                minWidth: '320px',
                height: '100%',
                minHeight: '400px',
                overflow: 'hidden',
                position: 'relative'
              }}
              data-auto-load="false"
            >
              <div className="h-full w-full flex items-center justify-center p-4">
                <div className="text-center">
                  <div className="animate-pulse space-y-4">
                    <div className="h-6 w-40 bg-gray-200 rounded mx-auto"></div>
                    <div className="h-4 w-56 bg-gray-200 rounded mx-auto"></div>
                    <div className="mt-6 space-y-2">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-12 w-full bg-gray-100 rounded-lg"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="border-t border-gray-200 p-4 bg-gray-50">
              <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-600">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span>30-minute meeting</span>
                </div>
                <div className="hidden sm:block">•</div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span>Instant confirmation</span>
                </div>
                <div className="hidden sm:block">•</div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span>Calendar invite sent</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
