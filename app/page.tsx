"use client"
import Image from "next/image";
import { useAuth } from "./_contexts/AuthContext";

export default function Home() {
  const auth = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100">
      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="min-h-64 flex flex-col items-center gap-3 w-full max-w-lg bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 p-10 transition-all duration-300 hover:shadow-xl">
          <div className="w-fit">
            <div className="flex items-center gap-2 bg-white/50 backdrop-blur p-2 rounded-xl shadow-md">
              <button
                onClick={() => auth.handleServiceChange('firebase')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  auth.serviceType === 'Firebase' 
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Firebase
              </button>
              <button
                onClick={() => auth.handleServiceChange('nextauth')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  auth.serviceType === 'NextAuth'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg transform scale-105' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                NextAuth
              </button>
            </div>
          </div>
          <div className="text-xs text-gray-400 text-center mb-4">
            Switching authentication providers will automatically sign out
          </div>

          {auth.user ? (
            <div className="space-y-8 animate-fadeIn transition-all duration-500 ease-in-out">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative animate-scaleIn">
                  <Image
                    src={auth.user.image || ''}
                    alt="User Profile"
                    width={80}
                    height={80}
                    className="rounded-full ring-4 ring-indigo-500/30 p-1 shadow-lg transition-transform duration-300 ease-in-out hover:scale-110"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-green-500 w-4 h-4 rounded-full border-2 border-white animate-pulse"></div>
                </div>
                <div className="text-center sm:text-left animate-slideInRight">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                    Welcome back!
                  </h1>
                  <p className="text-xl font-medium text-gray-700 mt-1">{auth.user.name}</p>
                  <p className="text-gray-500">{auth.user.email}</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium transition-all duration-300 hover:bg-indigo-200">
                    {auth.serviceType}
                  </span>
                </div>
              </div>
              <button
                onClick={() => auth.signOut()}
                className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl px-6 py-3 font-semibold hover:from-red-600 hover:to-pink-600 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg animate-slideInUp"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="space-y-8 animate-fadeIn transition-all duration-500 ease-in-out">
              <div className="text-center animate-slideInDown">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                  Welcome to NextJS Auth Demo
                </h2>
                <p className="text-gray-600 mt-3 text-lg">
                  Sign in with <b>{auth.serviceType}</b> to get started
                </p>
              </div>
              <div className="space-y-4 animate-slideInUp">
                <button
                  onClick={() => auth.signIn('google')}
                  className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 rounded-xl px-6 py-3 hover:bg-gray-50 hover:scale-[1.02] active:scale-[0.98] font-medium text-gray-700 shadow-md"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Continue with Google
                </button>
                <button
                  onClick={() => auth.signIn('github')}
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl px-6 py-3 hover:from-gray-900 hover:to-black hover:scale-[1.02] active:scale-[0.98] font-medium shadow-md"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  Continue with GitHub
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
