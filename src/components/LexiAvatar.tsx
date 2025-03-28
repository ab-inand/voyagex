'use client';

import { motion } from 'framer-motion';

interface LexiAvatarProps {
  mode?: 'default' | 'expert';
  size?: 'small' | 'medium' | 'large';
}

export default function LexiAvatar({ mode = 'default', size = 'medium' }: LexiAvatarProps) {
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-32 h-32',
    large: 'w-48 h-48',
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`relative ${sizeClasses[size]}`}
    >
      {/* Avatar container */}
      <div className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
        {/* Avatar face */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1/2 h-1/2 bg-white rounded-full opacity-20" />
        </div>

        {/* Expert mode headset */}
        {mode === 'expert' && (
          <>
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-3/4 h-2 bg-blue-400 rounded-full" />
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-1/2 h-4 bg-gradient-to-b from-blue-400 to-transparent rounded-t-full" />
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-1/4 h-2 bg-blue-400 rounded-full" />
          </>
        )}

        {/* Holographic effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent animate-shimmer" />
        
        {/* Glowing ring */}
        <div className="absolute inset-0 border-4 border-blue-400/30 rounded-full animate-pulse" />
      </div>

      {/* Decorative elements */}
      <div className="absolute -inset-2 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
    </motion.div>
  );
} 