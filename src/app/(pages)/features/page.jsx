import React from 'react'

const FeaturesPage = () => {
  const features = [
    {
      id: 1,
      icon: "🚀",
      title: "Fast Performance",
      description: "Lightning-fast loading times and optimized performance for the best user experience.",
      bgColor: "bg-blue-100 dark:bg-blue-900"
    },
    {
      id: 2,
      icon: "🔒",
      title: "Secure Authentication",
      description: "Enterprise-grade security with Clerk authentication and user management.",
      bgColor: "bg-green-100 dark:bg-green-900"
    },
    {
      id: 3,
      icon: "📱",
      title: "Responsive Design",
      description: "Perfect experience across all devices with our mobile-first responsive design.",
      bgColor: "bg-purple-100 dark:bg-purple-900"
    },
    {
      id: 4,
      icon: "👥",
      title: "Team Collaboration",
      description: "Real-time messaging, group chats, and video calls to bring your team together.",
      bgColor: "bg-yellow-100 dark:bg-yellow-900"
    },
    {
      id: 5,
      icon: "📅",
      title: "Task & Event Management",
      description: "Create, assign, and track tasks or reminders with smart scheduling tools.",
      bgColor: "bg-red-100 dark:bg-red-900"
    },
    {
      id: 6,
      icon: "📂",
      title: "File Sharing & Storage",
      description: "Upload, share, and access files securely — organized and accessible from anywhere.",
      bgColor: "bg-indigo-100 dark:bg-indigo-900"
    },
    {
      id: 7,
      icon: "🎥",
      title: "Meeting Recording",
      description: "Record and archive important meetings with searchable, time-stamped playback.",
      bgColor: "bg-pink-100 dark:bg-pink-900"
    },
    {
      id: 8,
      icon: "🌙",
      title: "Light & Dark Themes",
      description: "Switch easily between light and night modes to suit your environment and comfort.",
      bgColor: "bg-teal-100 dark:bg-teal-900"
    }
  ];

  const shapes = [
    {
      id: '1',
      color: 'bg-gradient-to-r from-blue-500 to-purple-500',
      size: 'w-96 h-96',
      position: 'top-32 left-48',
    },
    {
      id: '2',
      color: 'bg-gradient-to-r from-green-500 to-yellow-500',
      size: 'w-48 h-48',
      position: 'top-[calc(60%+6rem)] left-[calc(10%-6rem)]',
    },
    {
      id: '3',
      color: 'bg-gradient-to-r from-red-500 to-pink-500',
      size: 'w-56 h-56',
      position: 'top-40 left-[calc(75%-8rem)]',
    },
    {
      id: '4',
      color: 'bg-gradient-to-r from-indigo-500 to-purple-600',
      size: 'w-72 h-72',
      position: 'top-[calc(80%+4rem)] left-[calc(20%-8rem)]',
    },
    {
      id: '5',
      color: 'bg-gradient-to-r from-teal-500 to-cyan-500',
      size: 'w-96 h-96',
      position: 'top-[calc(60%+2rem)] left-[calc(85%-6rem)]',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-16 relative overflow-hidden">
      {shapes.map(shape => (
        <div key={shape.id} className={`${shape.color} absolute rounded-full ${shape.size} ${shape.position} blur-3xl animate-pulse cursor-auto z-0`}></div>
      ))}
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 z-20 relative">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Powerful Features
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover what makes UniteUp the perfect platform for your collaboration and productivity needs.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 z-10 relative">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200 dark:border-gray-700"
            >
              <div className={`w-16 h-16 ${feature.bgColor} rounded-xl flex items-center justify-center mb-6 mx-auto`}>
                <span className="text-3xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 z-10 relative">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Join thousands of teams already using UniteUp to collaborate more effectively.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/register" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
              >
                Start Free Trial
              </a>
              <a 
                href="/contact" 
                className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default FeaturesPage