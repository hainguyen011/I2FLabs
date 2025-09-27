import React from 'react';
import { Calendar, Clock, ArrowRight, Brain, Code, Zap } from 'lucide-react';

const Blog = () => {
  const blogPosts = [
    {
      title: "The Future of AI in Software Development",
      excerpt: "Exploring how artificial intelligence is revolutionizing the way we write, test, and deploy software applications.",
      category: "AI & ML",
      readTime: "8 min read",
      date: "March 15, 2024",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=500",
      author: "Alex Nguyen",
      tags: ["AI", "Machine Learning", "Software Development"],
      icon: <Brain className="w-5 h-5" />
    },
    {
      title: "Building Scalable Microservices with Node.js",
      excerpt: "A comprehensive guide to architecting and implementing microservices that can handle millions of requests.",
      category: "Development",
      readTime: "12 min read",
      date: "March 10, 2024",
      image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=500",
      author: "Mai Tran",
      tags: ["Node.js", "Microservices", "Architecture"],
      icon: <Code className="w-5 h-5" />
    },
    {
      title: "Quantum Computing: Beyond Classical Limitations",
      excerpt: "An introduction to quantum computing principles and their potential applications in solving complex problems.",
      category: "Research",
      readTime: "15 min read",
      date: "March 8, 2024",
      image: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=500",
      author: "Minh Vo",
      tags: ["Quantum Computing", "Research", "Physics"],
      icon: <Zap className="w-5 h-5" />
    },
    {
      title: "Deep Learning for Computer Vision Applications",
      excerpt: "Implementing advanced computer vision models using TensorFlow and exploring real-world applications.",
      category: "AI & ML",
      readTime: "10 min read",
      date: "March 5, 2024",
      image: "https://images.pexels.com/photos/8386427/pexels-photo-8386427.jpeg?auto=compress&cs=tinysrgb&w=500",
      author: "Alex Nguyen",
      tags: ["Computer Vision", "TensorFlow", "Deep Learning"],
      icon: <Brain className="w-5 h-5" />
    },
    {
      title: "Modern UI/UX Design Principles for 2024",
      excerpt: "Exploring the latest trends in user interface design and how they enhance user experience in modern applications.",
      category: "Design",
      readTime: "6 min read",
      date: "March 1, 2024",
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=500",
      author: "Linh Pham",
      tags: ["UI/UX", "Design", "User Experience"],
      icon: <Code className="w-5 h-5" />
    },
    {
      title: "DevOps Best Practices for Modern Teams",
      excerpt: "Essential DevOps practices and tools that help teams deliver software faster and more reliably.",
      category: "DevOps",
      readTime: "9 min read",
      date: "February 28, 2024",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=500",
      author: "Duc Le",
      tags: ["DevOps", "CI/CD", "Automation"],
      icon: <Zap className="w-5 h-5" />
    }
  ];

  const featuredPost = blogPosts[0];
  const regularPosts = blogPosts.slice(1);

  return (
    <section id="blog" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Latest Insights
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Stay updated with our latest research, technical insights, and thoughts on emerging technologies.
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 group">
            <div className="lg:flex">
              <div className="lg:w-1/2 relative overflow-hidden">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-64 lg:h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-cyan-500/80 to-blue-500/80 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                    {featuredPost.icon}
                    <span className="ml-2">Featured</span>
                  </span>
                </div>
              </div>
              <div className="lg:w-1/2 p-8 lg:p-12">
                <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {featuredPost.date}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {featuredPost.readTime}
                  </span>
                </div>
                
                <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors">
                  {featuredPost.title}
                </h3>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {featuredPost.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-slate-700/50 text-cyan-400 text-sm rounded-full border border-slate-600/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">By {featuredPost.author}</span>
                  <button className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors group">
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Regular Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {regularPosts.map((post, index) => (
            <article key={index} className="group">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105">
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-2 py-1 bg-slate-900/80 backdrop-blur-sm rounded-full text-cyan-400 text-sm">
                      {post.icon}
                      <span className="ml-2">{post.category}</span>
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {post.date}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold mb-3 text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-gray-300 mb-4 text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 2).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-slate-700/50 text-cyan-400 text-xs rounded-full border border-slate-600/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">By {post.author}</span>
                    <button className="text-cyan-400 hover:text-cyan-300 transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <button className="px-8 py-4 border border-cyan-500/50 rounded-lg text-cyan-400 font-semibold hover:bg-cyan-500/10 transition-all duration-300">
            View All Articles
          </button>
        </div>
      </div>
    </section>
  );
};

export default Blog;