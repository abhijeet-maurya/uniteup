import { SignIn } from '@clerk/nextjs'

const LoginPage = () => {
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
    <div className="flex items-center justify-center w-full h-screen relative overflow-hidden px-4 py-8">
      {shapes.map(shape => (
        <div key={shape.id} className={`${shape.color} absolute rounded-full ${shape.size} ${shape.position} blur-3xl animate-pulse cursor-auto`}></div>
      ))}
      <div className="w-full max-w-sm relative z-10">
        <SignIn 
          appearance={{
            baseTheme: undefined,
            variables: {
              colorPrimary: "#3B82F6",
              colorBackground: "#ffffff",
              colorInputBackground: "#ffffff",
              colorInputText: "#1f2937",
              colorText: "#1f2937",
              colorTextSecondary: "#6b7280",
              colorDanger: "#ef4444",
              borderRadius: "0.5rem",
            },
            elements: {
              formButtonPrimary: 
                "bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium normal-case transition-colors",
              card: "shadow-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg",
              headerTitle: "text-2xl font-bold text-gray-900 dark:text-white mb-2",
              headerSubtitle: "text-gray-600 dark:text-gray-400 text-sm",
              formFieldInput: "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500",
              formFieldLabel: "text-gray-700 dark:text-gray-300 font-medium text-sm",
              identityPreviewText: "text-gray-900 dark:text-white",
              identityPreviewEditButton: "text-blue-600 dark:text-blue-400 hover:text-blue-700",
              formFieldAction: "text-blue-600 dark:text-blue-400 hover:text-blue-700",
              footerActionText: "text-gray-600 dark:text-gray-400",
              footerActionLink: "text-blue-600 dark:text-blue-400 hover:text-blue-700 font-medium",
              dividerLine: "bg-gray-300 dark:bg-gray-600",
              dividerText: "text-gray-500 dark:text-gray-400",
              socialButtonsBlockButton: "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600",
              socialButtonsBlockButtonText: "text-gray-700 dark:text-gray-300 font-medium",
              formFieldWarningText: "text-amber-600 dark:text-amber-400",
              formFieldErrorText: "text-red-600 dark:text-red-400",
              alertText: "text-red-600 dark:text-red-400",
              formFieldSuccessText: "text-green-600 dark:text-green-400"
            }
          }}
        />
      </div>
    </div>
  )
}

export default LoginPage