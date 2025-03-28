'use client';

import Blog from '@/components/features/Blog';
import Navigation from '@/components/Navigation';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <Blog />
    </div>
  );
} 