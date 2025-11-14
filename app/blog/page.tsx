"use client"

import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/marketing/layout/header"
import { Footer } from "@/components/marketing/layout/footer"
import {
  RiArticleLine,
  RiCalendarLine,
  RiTimeLine,
  RiArrowRightLine,
  RiFireLine,
  RiLightbulbLine,
  RiCodeLine,
  RiFilmLine,
} from "react-icons/ri"
import { Film } from "lucide-react"

export default function BlogPage() {
  const categories = [
    { name: "All Posts", slug: "all", count: 24 },
    { name: "Product Updates", slug: "updates", count: 8 },
    { name: "Tutorials", slug: "tutorials", count: 10 },
    { name: "Marketing Tips", slug: "marketing", count: 6 },
  ]

  const featuredPost = {
    title: "How AI Video Generation is Transforming Book Marketing",
    excerpt: "Discover why thousands of authors are using AI-generated video trailers to boost their book sales and reach wider audiences.",
    category: "Product Updates",
    date: "Nov 8, 2025",
    readTime: "8 min read",
    author: "BookTrailer Pro Team",
    image: "featured",
  }

  const blogPosts = [
    {
      title: "Getting Started: Creating Your First Book Trailer",
      excerpt: "Step-by-step guide to creating professional book trailers using AI. From cover upload to final export.",
      category: "Tutorials",
      date: "Nov 5, 2025",
      readTime: "12 min read",
      author: "Sarah Chen",
      tag: "Beginner",
    },
    {
      title: "10 Book Trailer Examples That Went Viral",
      excerpt: "Analyze successful book trailers and learn what makes them engaging, shareable, and effective for marketing.",
      category: "Marketing Tips",
      date: "Nov 3, 2025",
      readTime: "6 min read",
      author: "Marcus Johnson",
      tag: "Popular",
    },
    {
      title: "Choosing the Right Cinematic Style for Your Genre",
      excerpt: "How to select trailer styles that match your book's genre: thriller, romance, fantasy, mystery, and more.",
      category: "Tutorials",
      date: "Nov 1, 2025",
      readTime: "10 min read",
      author: "Emily Rodriguez",
      tag: "Technical",
    },
    {
      title: "Luma Ray vs MiniMax: Comparing Video AI Models",
      excerpt: "A comprehensive comparison of leading video generation models for book trailers: quality, speed, and results.",
      category: "Product Updates",
      date: "Oct 28, 2025",
      readTime: "15 min read",
      author: "BookTrailer Pro Team",
      tag: "Popular",
    },
    {
      title: "How Indie Authors Use Video to Boost Book Sales",
      excerpt: "Case studies: Real authors share how book trailers increased their visibility and sales on social media.",
      category: "Marketing Tips",
      date: "Oct 25, 2025",
      readTime: "7 min read",
      author: "Alex Turner",
      tag: "Case Study",
    },
    {
      title: "Best Practices for Book Cover Images in Trailers",
      excerpt: "Essential tips for preparing your book cover and images for maximum impact in video trailers.",
      category: "Tutorials",
      date: "Oct 22, 2025",
      readTime: "11 min read",
      author: "Design Team",
      tag: "Technical",
    },
    {
      title: "The Future of Book Marketing: AI-Powered Video",
      excerpt: "How AI video technology is revolutionizing the way authors promote their books and connect with readers.",
      category: "Product Updates",
      date: "Oct 19, 2025",
      readTime: "8 min read",
      author: "Sarah Chen",
      tag: "Trending",
    },
    {
      title: "Optimizing Your Trailer for Social Media Platforms",
      excerpt: "Platform-specific tips for Instagram, TikTok, YouTube, and Facebook: aspect ratios, length, and engagement.",
      category: "Marketing Tips",
      date: "Oct 16, 2025",
      readTime: "9 min read",
      author: "Marcus Johnson",
      tag: "Pro Tips",
    },
    {
      title: "Music Selection Guide for Book Trailers",
      excerpt: "How to choose the perfect background music that enhances your story's mood and captivates viewers.",
      category: "Tutorials",
      date: "Oct 13, 2025",
      readTime: "6 min read",
      author: "Jennifer Liu",
      tag: "Creative",
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      {/* eslint-disable-next-line product-quality/no-broken-internal-links */}
      <Header
        logoText="BookTrailer Pro"
        navLinks={[
          { label: "Features", href: "/features" },
          { label: "Pricing", href: "/pricing" },
          { label: "About", href: "/about" },
        ]}
        ctaButton={{
          text: "Try Free",
          href: "/dashboard",
        }}
      />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-dark">
        <Container maxWidth="xl">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-primary rounded-full mb-8 shadow-glow-indigo">
              <RiArticleLine className="w-6 h-6 text-white" />
              <span className="text-sm font-display font-bold text-white tracking-wider">Blog</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight text-white">
              Book Marketing Insights
            </h1>
            <p className="text-xl text-slate-300">
              Tutorials, tips, and strategies to create compelling book trailers that captivate readers
            </p>
          </div>
        </Container>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b border-slate-200">
        <Container maxWidth="xl">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-3 font-semibold rounded-xl transition-all ${
                  index === 0
                    ? "bg-gradient-primary text-white shadow-glow-indigo"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {category.name}
                <span className="ml-2 opacity-75">({category.count})</span>
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Post */}
      <section className="py-16 bg-slate-50">
        <Container maxWidth="xl">
          <div className="mb-6 flex items-center gap-3">
            <RiFireLine className="w-6 h-6 text-amber-500" />
            <h2 className="text-2xl font-display font-bold text-slate-900">Featured Post</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-cinema overflow-hidden">
            <div className="bg-gradient-primary aspect-video flex items-center justify-center">
              <Film className="w-24 h-24 text-white" />
            </div>

            <div className="flex flex-col justify-center p-8">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-violet-100 text-violet-700 text-xs font-semibold rounded-full">
                  {featuredPost.category}
                </span>
              </div>

              <h3 className="text-3xl font-display font-bold mb-4 leading-tight text-slate-900">
                {featuredPost.title}
              </h3>

              <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                {featuredPost.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6">
                <div className="flex items-center gap-2">
                  <RiCalendarLine className="w-4 h-4" />
                  {featuredPost.date}
                </div>
                <div className="flex items-center gap-2">
                  <RiTimeLine className="w-4 h-4" />
                  {featuredPost.readTime}
                </div>
              </div>

              <Button
                size="lg"
                variant="primary"
                className="w-fit gap-2"
              >
                Read Article
                <RiArrowRightLine className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Blog Grid */}
      <section className="py-24">
        <Container maxWidth="xl">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-slate-900">
              Latest Articles
            </h2>
            <p className="text-xl text-slate-600">
              Stay updated with the latest book marketing strategies and video trends
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => {
              const tagIcons: Record<string, React.ComponentType<{ className?: string }>> = {
                Popular: RiFireLine,
                Technical: RiCodeLine,
                Beginner: RiLightbulbLine,
              }

              const TagIcon = tagIcons[post.tag] || RiArticleLine

              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-slate-200 shadow-cinema hover:shadow-cinema-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col"
                >
                  {/* Image Placeholder */}
                  <div className="h-48 bg-gradient-to-br from-violet-500 to-violet-500 flex items-center justify-center">
                    <RiFilmLine className="w-16 h-16 text-white" />
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    {/* Category & Tag */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold uppercase px-3 py-1 bg-slate-100 text-slate-700 rounded-full">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <TagIcon className="w-4 h-4 text-violet-600" />
                        <span className="text-xs font-semibold text-slate-600">
                          {post.tag}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-display font-bold mb-3 leading-tight text-slate-900">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="mb-4 text-sm leading-relaxed flex-1 text-slate-600">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                      <div className="flex items-center gap-1">
                        <RiCalendarLine className="w-4 h-4" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <RiTimeLine className="w-4 h-4" />
                        {post.readTime}
                      </div>
                    </div>

                    {/* Read More */}
                    <button className="w-full py-3 font-semibold text-sm bg-slate-50 text-slate-900 rounded-lg hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
                      Read More
                      <RiArrowRightLine className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Load More */}
          <div className="mt-12 text-center">
            <Button
              size="xl"
              variant="outline"
              className="gap-3"
            >
              Load More Articles
              <RiArrowRightLine className="w-5 h-5" />
            </Button>
          </div>
        </Container>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 bg-gradient-cinema text-white">
        <Container maxWidth="xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Stay Updated
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Get the latest book marketing insights, video tips, and product updates delivered to your inbox
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 font-medium text-lg focus:outline-none focus:ring-2 focus:ring-white/40"
              />
              <Button
                size="lg"
                className="bg-white text-violet-600 hover:bg-slate-50 font-semibold px-8 whitespace-nowrap"
              >
                Subscribe
                <RiArrowRightLine className="w-5 h-5 ml-2" />
              </Button>
            </div>

            <p className="text-sm text-white/70 mt-4">
              No spam. Unsubscribe anytime. Read our{" "}
              {/* eslint-disable-next-line product-quality/no-broken-internal-links */}
              <a href="/privacy" className="text-white underline hover:no-underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  )
}
