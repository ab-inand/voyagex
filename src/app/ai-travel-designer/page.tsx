'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
//import HolographicOverlay from '@/components/HolographicOverlay';

// Dynamically import components that use browser APIs
const LexiAvatar = dynamic(() => import('@/components/LexiAvatar'), {
  ssr: false,
});

const QuestionFlow = dynamic(() => import('@/components/QuestionFlow'), {
  ssr: false,
});

export default function AITravelDesigner() {
  const [isOverlayActive, setIsOverlayActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Activate overlay after a brief delay
    const timer = setTimeout(() => {
      setIsOverlayActive(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <AnimatePresence>
        {isOverlayActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
          >
            
          </motion.div>
        )}
      </AnimatePresence>

      <QuestionFlow currentStep={currentStep} onStepChange={setCurrentStep} />
    </div>
  );
} 
