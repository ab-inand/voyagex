'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HolographicOverlay from '@/components/HolographicOverlay';

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
            <HolographicOverlay>
              <div className="flex flex-col items-center justify-center h-full">
                <LexiAvatar mode="expert" size="large" />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 text-center"
                >
                  <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                    Let's design your perfect getaway!
                  </h1>
                  <p className="text-xl text-gray-300">
                    I'll ask a few questions—just speak or type.
                  </p>
                </motion.div>
              </div>
            </HolographicOverlay>
          </motion.div>
        )}
      </AnimatePresence>

      <QuestionFlow currentStep={currentStep} onStepChange={setCurrentStep} />
    </div>
  );
} 