import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="ml-2 text-white text-lg font-semibold">
                Task Manager
              </span>
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link
              href="/chat"
              className="text-gray-300 hover:bg-slate-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Chat
            </Link>
            <Link
              href="/tasks"
              className="text-gray-300 hover:bg-slate-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Tasks
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}