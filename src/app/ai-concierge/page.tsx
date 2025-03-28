'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import AIChatbot from '@/components/features/AIChatbot';

const travelPreferences = [
  { id: 'adventure', label: 'Adventure', icon: '🏃‍♂️' },
  { id: 'relaxation', label: 'Relaxation', icon: '🌴' },
  { id: 'culture', label: 'Culture', icon: '🏛️' },
  { id: 'luxury', label: 'Luxury', icon: '✨' }
];

const budgetRanges = [
  { min: 1000, max: 3000, label: '$1K - $3K' },
  { min: 3000, max: 5000, label: '$3K - $5K' },
  { min: 5000, max: 10000, label: '$5K - $10K' },
  { min: 10000, max: null, label: '$10K+' }
];

const nftPerks = [
  {
    name: 'Egyptian Sphinx NFT',
    description: 'Limited edition digital collectible',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
    price: '0.5 ETH'
  },
  {
    name: 'Pyramid Access Pass',
    description: 'Exclusive virtual tour access',
    image: 'https://images.unsplash.com/photo-1503177119275-0fa32b8091d0?q=80&w=1000&auto=format&fit=crop',
    price: '0.3 ETH'
  }
];

export default function AIConciergePage() {
  const [selectedPreference, setSelectedPreference] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [showNFTModal, setShowNFTModal] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState('pending');

  const handleVerification = () => {
    setVerificationStatus('verifying');
    // Simulate biometric verification
    setTimeout(() => {
      setVerificationStatus('verified');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <AIChatbot />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-black/80" />
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 gradient-text"
          >
            AI Travel Concierge
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-8"
          >
            Your Personal Travel Assistant
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Travel Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 mb-8"
          >
            <h2 className="text-2xl font-bold mb-6 gradient-text">What type of experience are you looking for?</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {travelPreferences.map((pref) => (
                <motion.button
                  key={pref.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedPreference(pref.id)}
                  className={`p-4 rounded-xl text-center transition-all duration-300 ${
                    selectedPreference === pref.id
                      ? 'bg-blue-500/20 border-2 border-blue-500'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="text-4xl mb-2">{pref.icon}</div>
                  <div className="text-white font-semibold">{pref.label}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Budget Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 mb-8"
          >
            <h2 className="text-2xl font-bold mb-6 gradient-text">What's your budget range?</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {budgetRanges.map((range) => (
                <motion.button
                  key={range.label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedBudget(range.label)}
                  className={`p-4 rounded-xl text-center transition-all duration-300 ${
                    selectedBudget === range.label
                      ? 'bg-blue-500/20 border-2 border-blue-500'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="text-white font-semibold">{range.label}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* NFT Perks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 mb-8"
          >
            <h2 className="text-2xl font-bold mb-6 gradient-text">Exclusive NFT Perks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {nftPerks.map((nft) => (
                <motion.div
                  key={nft.name}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/5 rounded-xl p-4"
                >
                  <img
                    src={nft.image}
                    alt={nft.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-bold mb-2">{nft.name}</h3>
                  <p className="text-gray-400 mb-4">{nft.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-400 font-semibold">{nft.price}</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white text-sm font-semibold"
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Biometric Verification */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6 gradient-text">Confirm Your Booking</h2>
            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleVerification}
                disabled={verificationStatus === 'verifying'}
                className={`px-8 py-4 rounded-full text-white font-semibold shadow-lg transition-all duration-300 ${
                  verificationStatus === 'verified'
                    ? 'bg-green-500'
                    : verificationStatus === 'verifying'
                    ? 'bg-blue-500/50'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-xl'
                }`}
              >
                {verificationStatus === 'verified'
                  ? '✓ Verified'
                  : verificationStatus === 'verifying'
                  ? 'Verifying...'
                  : 'Verify with Biometrics'}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 