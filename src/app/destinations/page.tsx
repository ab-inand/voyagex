'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import InteractiveGlobe from '@/components/3d/InteractiveGlobe';

interface Destination {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  rating: number;
  features: string[];
}

const destinations: Destination[] = [
  {
    id: 'paris',
    name: 'Paris',
    description: 'Experience the magic of the City of Light with our exclusive VIP package.',
    price: 'From $2,499',
    image: '/destinations/paris.jpg',
    rating: 4.8,
    features: ['Eiffel Tower VIP Access', 'Louvre Museum Tour', 'Seine River Cruise', 'Michelin Star Dining']
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    description: 'Immerse yourself in the perfect blend of tradition and future.',
    price: 'From $2,899',
    image: '/destinations/tokyo.jpg',
    rating: 4.9,
    features: ['Robot Restaurant VIP', 'Mount Fuji Tour', 'Sushi Making Class', 'Bullet Train Experience']
  },
  {
    id: 'dubai',
    name: 'Dubai',
    description: 'Discover luxury and innovation in the city of the future.',
    price: 'From $3,299',
    image: '/destinations/dubai.jpg',
    rating: 4.7,
    features: ['Burj Khalifa Access', 'Desert Safari', 'Yacht Experience', 'Gold Souk Tour']
  }
];

export default function DestinationsPage() {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [showVR, setShowVR] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 3D Globe Header */}
      <div className="h-[50vh] relative">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <InteractiveGlobe />
          <OrbitControls enableZoom={false} />
        </Canvas>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black pointer-events-none" />
      </div>

      {/* Destinations Grid */}
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 gradient-text">Featured Destinations</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <motion.div
              key={destination.id}
              className="glass rounded-xl overflow-hidden"
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedDestination(destination)}
            >
              <div className="aspect-w-16 aspect-h-9 relative">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold">{destination.name}</h3>
                  <span className="text-sm bg-blue-500 px-2 py-1 rounded">
                    ★ {destination.rating}
                  </span>
                </div>
                <p className="text-gray-300 mb-4">{destination.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-blue-400">{destination.price}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"
                    onClick={() => setShowVR(true)}
                  >
                    View in VR
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* VR Preview Modal */}
      {showVR && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center"
        >
          <div className="container mx-auto p-8">
            <button
              className="absolute top-8 right-8 text-white"
              onClick={() => setShowVR(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden">
              {/* VR Experience would be implemented here */}
              <div className="bg-gray-900 flex items-center justify-center">
                <p className="text-xl">VR Experience Coming Soon</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
} 