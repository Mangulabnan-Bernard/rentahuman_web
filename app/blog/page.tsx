'use client'

import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Link from 'next/link'
import { Calendar, Clock, User, ArrowRight } from 'lucide-react'

const blogPosts = [
  {
    id: 1,
    title: "The Future of Human-AI Collaboration",
    excerpt: "Exploring how human intelligence and artificial intelligence are working together to solve complex problems in unprecedented ways.",
    author: "Sarah Chen",
    date: "2024-02-01",
    readTime: "5 min read",
    category: "AI Trends",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    featured: true
  },
  {
    id: 2,
    title: "How to Become a Successful AI Training Specialist",
    excerpt: "A comprehensive guide to building a career in AI training, including essential skills, tools, and best practices.",
    author: "Marcus Johnson",
    date: "2024-01-28",
    readTime: "8 min read",
    category: "Career Guide",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    featured: false
  },
  {
    id: 3,
    title: "Ethical Considerations in Human-in-the-Loop Systems",
    excerpt: "Understanding the ethical implications of human oversight in AI decision-making processes and how to implement responsible practices.",
    author: "Elena Rodriguez",
    date: "2024-01-25",
    readTime: "6 min read",
    category: "AI Ethics",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop",
    featured: false
  },
  {
    id: 4,
    title: "Quality Assurance in AI Training Data",
    excerpt: "Best practices for ensuring high-quality training data through human validation and quality control processes.",
    author: "David Kim",
    date: "2024-01-22",
    readTime: "7 min read",
    category: "Data Science",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    featured: false
  },
  {
    id: 5,
    title: "The Rise of Remote AI Work Opportunities",
    excerpt: "How the AI industry is creating new remote work opportunities for skilled professionals around the world.",
    author: "Lisa Thompson",
    date: "2024-01-19",
    readTime: "4 min read",
    category: "Remote Work",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop",
    featured: false
  },
  {
    id: 6,
    title: "Building Trust in AI Systems Through Human Oversight",
    excerpt: "Why human oversight is crucial for building trustworthy AI systems that users can rely on.",
    author: "James Wilson",
    date: "2024-01-15",
    readTime: "9 min read",
    category: "Trust & Safety",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop",
    featured: false
  }
]

const categories = ["All", "AI Trends", "Career Guide", "AI Ethics", "Data Science", "Remote Work", "Trust & Safety"]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory)

  const featuredPost = blogPosts.find(post => post.featured)
  const regularPosts = filteredPosts.filter(post => !post.featured)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            RentHuman Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Insights, trends, and stories from the intersection of human intelligence and artificial intelligence.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {selectedCategory === "All" && featuredPost && (
          <div className="mb-12">
            <article className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      Featured
                    </span>
                    <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full">
                      {featuredPost.category}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    <Link href={`/blog/${featuredPost.id}`} className="hover:text-primary transition-colors">
                      {featuredPost.title}
                    </Link>
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{featuredPost.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>
                    <Link
                      href={`/blog/${featuredPost.id}`}
                      className="text-primary hover:underline flex items-center space-x-1"
                    >
                      <span>Read more</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map(post => (
            <article key={post.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  <Link href={`/blog/${post.id}`} className="hover:text-primary transition-colors">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <Link
                    href={`/blog/${post.id}`}
                    className="text-primary hover:underline"
                  >
                    Read more
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No posts found in the {selectedCategory} category.
            </p>
          </div>
        )}

        <div className="mt-12 text-center">
          <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
            Load More Posts
          </button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
