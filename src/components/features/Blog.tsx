'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
}

const articles: Article[] = [
  {
    id: '1',
    title: 'The Ultimate Guide to Paris',
    excerpt: 'Discover the hidden gems and must-visit spots in the City of Light.',
    content: '...',
    author: 'Sarah Johnson',
    date: '2024-03-15',
    category: 'Destinations',
    image: '/blog/paris.jpg',
    readTime: '8 min read'
  },
  {
    id: '2',
    title: 'Travel Photography Tips',
    excerpt: 'Learn how to capture stunning travel photos with your smartphone.',
    content: '...',
    author: 'Mike Chen',
    date: '2024-03-14',
    category: 'Tips & Tricks',
    image: '/blog/photography.jpg',
    readTime: '6 min read'
  },
  {
    id: '3',
    title: 'Sustainable Travel Guide',
    excerpt: 'How to travel responsibly and reduce your environmental impact.',
    content: '...',
    author: 'Emma Green',
    date: '2024-03-13',
    category: 'Sustainability',
    image: '/blog/sustainable.jpg',
    readTime: '7 min read'
  },
  {
    id: '4',
    title: 'Best Street Food in Tokyo',
    excerpt: 'A foodie\'s guide to the most delicious street food in Tokyo.',
    content: '...',
    author: 'David Kim',
    date: '2024-03-12',
    category: 'Food & Drink',
    image: '/blog/tokyo-food.jpg',
    readTime: '5 min read'
  }
];

const categories = [
  'All',
  'Destinations',
  'Tips & Tricks',
  'Sustainability',
  'Food & Drink',
  'Adventure',
  'Culture'
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const filteredArticles = selectedCategory === 'All'
    ? articles
    : articles.filter(article => article.category === selectedCategory);

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 gradient-text">Travel Blog</h1>
          <p className="text-xl text-gray-300">
            Discover travel tips, guides, and stories from around the world
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600'
                  : 'bg-white/10'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Featured Article */}
        {filteredArticles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl overflow-hidden mb-12 cursor-pointer"
            onClick={() => setSelectedArticle(filteredArticles[0])}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={filteredArticles[0].image}
                  alt={filteredArticles[0].title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-blue-400">{filteredArticles[0].category}</span>
                  <span className="text-gray-400">{filteredArticles[0].readTime}</span>
                </div>
                <h2 className="text-3xl font-bold mb-4">{filteredArticles[0].title}</h2>
                <p className="text-gray-300 mb-6">{filteredArticles[0].excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500" />
                    <span>{filteredArticles[0].author}</span>
                  </div>
                  <span className="text-gray-400">{filteredArticles[0].date}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.slice(1).map((article) => (
            <motion.div
              key={article.id}
              whileHover={{ scale: 1.02 }}
              className="glass rounded-xl overflow-hidden cursor-pointer"
              onClick={() => setSelectedArticle(article)}
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={article.image}
                  alt={article.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-blue-400">{article.category}</span>
                  <span className="text-gray-400">{article.readTime}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                <p className="text-gray-300 mb-4">{article.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-500" />
                    <span className="text-sm">{article.author}</span>
                  </div>
                  <span className="text-sm text-gray-400">{article.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Article Modal */}
      {selectedArticle && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedArticle(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-900 rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-blue-400">{selectedArticle.category}</span>
                <span className="text-gray-400">{selectedArticle.readTime}</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">{selectedArticle.title}</h2>
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500" />
                  <span>{selectedArticle.author}</span>
                </div>
                <span className="text-gray-400">{selectedArticle.date}</span>
              </div>
              <div className="prose prose-invert max-w-none">
                {selectedArticle.content}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
} 