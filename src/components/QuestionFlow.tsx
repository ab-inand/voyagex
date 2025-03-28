'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

interface QuestionOption {
  id: string;
  label: string;
  icon?: string;
  image?: string;
}

interface Question {
  id: string;
  question: string;
  type: 'buttons' | 'moodboard' | 'slider' | 'calendar';
  options?: QuestionOption[];
  min?: number;
  max?: number;
  step?: number;
}

interface QuestionFlowProps {
  currentStep: number;
  onStepChange: (step: number) => void;
}

const questions: Question[] = [
  {
    id: 'destination',
    question: 'What type of destination interests you?',
    options: [
      { id: 'beach', label: 'Beach 🏖️', icon: '🏖️' },
      { id: 'mountain', label: 'Mountain ⛰️', icon: '⛰️' },
      { id: 'city', label: 'City 🌆', icon: '🌆' },
      { id: 'jungle', label: 'Jungle 🌴', icon: '🌴' },
    ],
    type: 'buttons',
  },
  {
    id: 'style',
    question: "What's your preferred travel style?",
    options: [
      { id: 'luxury', label: 'Luxury Resort', image: '/images/luxury-resort.jpg' },
      { id: 'adventure', label: 'Backpacker Adventure', image: '/images/backpacker.jpg' },
      { id: 'cultural', label: 'Cultural Experience', image: '/images/cultural.jpg' },
    ],
    type: 'moodboard',
  },
  {
    id: 'budget',
    question: "What's your budget range?",
    type: 'slider',
    min: 1000,
    max: 10000,
    step: 1000,
  },
  {
    id: 'dates',
    question: 'When would you like to travel?',
    type: 'calendar',
  },
];

export default function QuestionFlow({ currentStep, onStepChange }: QuestionFlowProps) {
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isListening, setIsListening] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      // Process the transcript
      console.log('Transcript:', transcript);
    }
  }, [transcript]);

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
    if (currentStep < questions.length - 1) {
      onStepChange(currentStep + 1);
    }
  };

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      setIsListening(false);
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
      setIsListening(true);
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const currentQuestion = questions[currentStep];

  return (
    <div className="fixed inset-0 flex items-center justify-center p-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="w-full max-w-2xl"
        >
          <div className="bg-black/50 backdrop-blur-lg rounded-xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              {currentQuestion.question}
            </h2>

            {/* Question-specific UI */}
            {currentQuestion.type === 'buttons' && currentQuestion.options && (
              <div className="grid grid-cols-2 gap-4">
                {currentQuestion.options.map((option) => (
                  <motion.button
                    key={option.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(currentQuestion.id, option.id)}
                    className="p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10"
                  >
                    <span className="text-4xl mb-2 block">{option.icon}</span>
                    <span>{option.label}</span>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Voice input section */}
            <div className="mt-8">
              <div className="flex items-center justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleListening}
                  className={`p-4 rounded-full ${
                    isListening ? 'bg-red-500' : 'bg-blue-500'
                  }`}
                >
                  {isListening ? '🎤' : '🎤'}
                </motion.button>
                {transcript && (
                  <div className="text-sm text-gray-300">
                    You said: {transcript}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
} 