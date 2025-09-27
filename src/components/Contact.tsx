import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="py-20 bg-black border-t border-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-8 leading-none">
            GET IN
            <br />
            TOUCH
          </h2>
          <div className="w-20 h-1 bg-white mb-8" />
          <p className="text-xl text-gray-300 max-w-3xl">
            Ready to collaborate on your next project? We'd love to hear from you and discuss how we can help bring your ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="border border-white p-8">
            <h3 className="text-2xl font-bold mb-6 tracking-wider">SEND MESSAGE</h3>
            <div className="w-20 h-1 bg-white mb-6" />
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-white mb-2 tracking-wider">
                    NAME
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black border border-white text-white placeholder-gray-400 focus:outline-none focus:border-gray-300 transition-colors font-mono"
                    placeholder="YOUR NAME"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-white mb-2 tracking-wider">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black border border-white text-white placeholder-gray-400 focus:outline-none focus:border-gray-300 transition-colors font-mono"
                    placeholder="YOUR@EMAIL.COM"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-bold text-white mb-2 tracking-wider">
                  SUBJECT
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black border border-white text-white placeholder-gray-400 focus:outline-none focus:border-gray-300 transition-colors font-mono"
                  placeholder="WHAT'S THIS ABOUT?"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-bold text-white mb-2 tracking-wider">
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black border border-white text-white placeholder-gray-400 focus:outline-none focus:border-gray-300 transition-colors resize-none font-mono"
                  placeholder="TELL US ABOUT YOUR PROJECT..."
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full px-8 py-4 bg-white text-black font-bold tracking-wider hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 flex items-center justify-center group"
              >
                <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                SEND MESSAGE
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="border border-white p-8">
              <h3 className="text-2xl font-bold mb-6 tracking-wider">CONTACT INFO</h3>
              <div className="w-20 h-1 bg-white mb-6" />
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 border border-white flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold tracking-wider">EMAIL</p>
                    <p className="text-gray-300 font-mono">hainguyen0112358@gmail.com</p>
                  </div>
                </div>
                
                {/* <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 border border-white flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold tracking-wider">PHONE</p>
                    <p className="text-gray-300 font-mono">+84 123 456 789</p>
                  </div>
                </div> */}
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 border border-white flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold tracking-wider">LOCATION</p>
                    <p className="text-gray-300 font-mono">HO CHI MINH CITY, VN</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="border border-white p-8">
              <h3 className="text-xl font-bold mb-6 tracking-wider">FOLLOW US</h3>
              <div className="w-20 h-1 bg-white mb-6" />
              
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-12 h-12 border border-white flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-110"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 border border-white flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-110"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 border border-white flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-110"
                >
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
              
              <p className="text-gray-300 mt-4 text-sm">
                Follow us for the latest updates on our projects, research, and insights into emerging technologies.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-white text-center">
          <p className="text-gray-400 font-mono">
            © 2024 I2FLabs VIETNAM. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;