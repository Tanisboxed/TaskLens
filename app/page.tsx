import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-8 flex items-center justify-center">
      {/* Decorative Gradient Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-72 h-72 bg-purple-500 rounded-full opacity-30 blur-3xl top-16 left-10 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-blue-500 rounded-full opacity-20 blur-3xl bottom-20 right-20 animate-pulse"></div>
      </div>

      {/* Content */}
      <div className="z-10 text-center max-w-md">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent animate-text">
          Welcome to TaskLens
        </h1>
        <p className="text-lg mt-4 text-gray-300">
          Manage your tasks efficiently and stay productive.
        </p>
        <div className="flex gap-4 mt-8 justify-center">
          <Link
            href="/tasks"
            className="btn px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold shadow-lg hover:shadow-purple-700/50 hover:scale-105 transition transform"
          >
            Go to Tasks
          </Link>
          <Link
            href="/chat"
            className="btn px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold shadow-lg hover:shadow-pink-700/50 hover:scale-105 transition transform"
          >
            Go to Chat
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 text-sm text-gray-500 z-10">
        &copy; {new Date().getFullYear()} Tasklebs. All rights reserved.
      </footer>
    </div>
  );
}
