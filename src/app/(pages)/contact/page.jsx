'use client';
import React, { useState, useEffect } from 'react'
import { Mail, Phone, MapPin, Send, MessageCircle, Bug, Lightbulb, AlertCircle, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitMessage, setSubmitMessage] = useState('');
  const [contactId, setContactId] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration mismatch by ensuring client-side rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const categories = [
    { value: 'general', label: 'General Inquiry', icon: MessageCircle },
    { value: 'support', label: 'Technical Support', icon: Bug },
    { value: 'feature', label: 'Feature Request', icon: Lightbulb },
    { value: 'billing', label: 'Billing Issue', icon: Mail }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    } else if (formData.name.trim().length > 50) {
      newErrors.name = 'Name cannot exceed 50 characters';
    }

    // Email validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters long';
    } else if (formData.subject.trim().length > 100) {
      newErrors.subject = 'Subject cannot exceed 100 characters';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = 'Message cannot exceed 1000 characters';
    }

    // Category validation
    const validCategories = ['general', 'support', 'feature', 'billing'];
    if (!validCategories.includes(formData.category)) {
      newErrors.category = 'Please select a valid category';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous messages
    setSubmitMessage('');
    setErrors({});

    // Validate form
    if (!validateForm()) {
      toast.error('Please fix the errors below and try again.');
      return;
    }

    setIsSubmitting(true);

    // Show loading toast
    const loadingToast = toast.loading('Sending your message...');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      if (result.success) {
        setSubmitted(true);
        setContactId(result.contactId);
        setSubmitMessage(result.message);
        
        // Show success toast
        toast.success(
          `Message sent successfully! Reference ID: ${result.contactId}`,
          {
            duration: 6000,
            icon: '✅',
          }
        );
        
        setFormData({
          name: '',
          email: '',
          subject: '',
          category: 'general',
          message: ''
        });
      } else {
        if (result.errors) {
          setErrors(result.errors);
        }
        setSubmitMessage(result.message || 'An error occurred. Please try again.');
        
        // Show specific error toasts based on type
        if (result.type === 'duplicate') {
          toast.error('Duplicate message detected!', {
            duration: 5000,
            icon: '⚠️',
          });
        } else if (result.type === 'rate_limit') {
          toast.error('Please wait before sending another message.', {
            duration: 4000,
            icon: '⏱️',
          });
        } else {
          toast.error(result.message || 'Something went wrong. Please try again.', {
            duration: 4000,
          });
        }
      }
    } catch (error) {
      // Dismiss loading toast
      toast.dismiss(loadingToast);
      
      console.error('Form submission error:', error);
      setSubmitMessage('Network error. Please check your connection and try again.');
      
      toast.error('Network error. Please check your connection and try again.', {
        duration: 5000,
        icon: '🌐',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const shapes = [
    {
      id: '1',
      color: 'bg-gradient-to-r from-blue-500 to-purple-500',
      size: 'w-72 h-72',
      position: 'top-20 right-20',
    },
    {
      id: '2',
      color: 'bg-gradient-to-r from-green-500 to-teal-500',
      size: 'w-96 h-96',
      position: 'bottom-20 left-20',
    },
    {
      id: '3',
      color: 'bg-gradient-to-r from-pink-500 to-rose-500',
      size: 'w-48 h-48',
      position: 'top-1/2 left-1/2',
    },
  ];

  if (!isMounted) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-16 relative overflow-hidden">
        <div className="min-h-full flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-12 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 text-center max-w-lg z-10 relative">
            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="w-10 h-10 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Loading...
            </h2>
          </div>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-16 relative overflow-hidden">
        {shapes.map(shape => (
          <div key={shape.id} className={`${shape.color} absolute rounded-full ${shape.size} ${shape.position} blur-3xl animate-pulse z-0`}></div>
        ))}
        <div className="min-h-full flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-12 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 text-center max-w-lg z-10 relative">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Message Sent Successfully!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Thank you for reaching out. We'll get back to you within 24 hours.
            </p>
            {contactId && (
              <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  <strong>Reference ID:</strong> {contactId}
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                  Please save this ID for future reference
                </p>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => setSubmitted(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
              >
                Send Another Message
              </button>
              <a 
                href="/" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 text-center"
              >
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-16 relative overflow-hidden">
      {shapes.map(shape => (
        <div key={shape.id} className={`${shape.color} absolute rounded-full ${shape.size} ${shape.position} blur-3xl animate-pulse z-0`}></div>
      ))}
      
      <div className="relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 z-20 relative">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Have a question or need help? We're here for you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto z-10 relative">
          
          {/* Contact Form - First on mobile/tablet, Second on desktop */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 order-1 lg:order-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Send us a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Info Message */}
              <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <MessageCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-800 dark:text-blue-300">
                    <p className="font-medium mb-1">Submission Guidelines:</p>
                    <ul className="text-xs space-y-1 text-blue-700 dark:text-blue-400">
                      <li>• You can submit multiple forms with different messages</li>
                      <li>• Identical messages will be rejected to prevent duplicates</li>
                      <li>• Please wait 1 minute between submissions</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Error/Success Message */}
              {submitMessage && (
                <div className={`p-4 rounded-lg border ${
                  submitted 
                    ? 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700' 
                    : 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700'
                }`}>
                  <div className="flex items-center gap-2">
                    {submitted ? (
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    )}
                    <p className={`text-sm font-medium ${
                      submitted 
                        ? 'text-green-800 dark:text-green-300' 
                        : 'text-red-800 dark:text-red-300'
                    }`}>
                      {submitMessage}
                    </p>
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    suppressHydrationWarning={true}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200 ${
                      errors.name 
                        ? 'border-red-500 dark:border-red-400' 
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.name}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    suppressHydrationWarning={true}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200 ${
                      errors.email 
                        ? 'border-red-500 dark:border-red-400' 
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  suppressHydrationWarning={true}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200 ${
                    errors.category 
                      ? 'border-red-500 dark:border-red-400' 
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.category}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  suppressHydrationWarning={true}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200 ${
                    errors.subject 
                      ? 'border-red-500 dark:border-red-400' 
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="Brief description of your inquiry"
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.subject}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message * 
                  <span className={`text-xs ml-2 ${
                    formData.message.length > 1000 
                      ? 'text-red-500 dark:text-red-400' 
                      : formData.message.length > 800 
                        ? 'text-yellow-500 dark:text-yellow-400' 
                        : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    ({formData.message.length}/1000)
                  </span>
                  {formData.message.length < 10 && formData.message.length > 0 && (
                    <span className="text-xs text-orange-500 dark:text-orange-400 ml-2">
                      (Minimum 10 characters)
                    </span>
                  )}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  suppressHydrationWarning={true}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none transition-colors duration-200 ${
                    errors.message 
                      ? 'border-red-500 dark:border-red-400' 
                      : formData.message.length > 1000
                        ? 'border-red-500 dark:border-red-400'
                        : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="Please provide details about your inquiry..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.message}
                  </p>
                )}
                {formData.message.length > 1000 && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    Message exceeds maximum length of 1000 characters
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                suppressHydrationWarning={true}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-[1.02] disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information - Second on mobile/tablet, First on desktop */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Get in Touch
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Email</h3>
                    <p className="text-gray-600 dark:text-gray-300">support@uniteup.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Phone</h3>
                    <p className="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Address</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      123 Business St<br />
                      San Francisco, CA 94105
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Section */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Find Us</h3>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7013.036770753004!2d77.08568709244237!3d28.49404740296223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19382985d7d1%3A0xb03bedc65fe6f2b2!2sDLF%20Cyber%20City%2C%20DLF%20Phase%202%2C%20Sector%2024%2C%20Gurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1754685835266!5m2!1sen!2sin"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-[300px] rounded-2xl"
                ></iframe>
              </div>
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://maps.app.goo.gl/AbQsh6v6Q6r5akzM7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-xl font-semibold transition-colors duration-300 text-center flex items-center justify-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  Get Directions
                </a>
              </div>
            </div>
          </div>

        </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
