import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Admin login attempt:', { username, password });
    } catch (err) {
      console.error('Login failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Top Green Accent Bar */}
      <div className="h-1 bg-gradient-to-r from-green-400 via-green-500 to-green-600"></div>

      {/* Header with logo */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3 animate-fade-in">
            {/* Logo */}
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg transform transition-transform hover:scale-110 duration-300">
                <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-600 rounded-sm shadow-inner"></div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent tracking-tight">
              MODERN STATES
            </h1>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left side - Login form */}
          <div className="max-w-lg animate-slide-in-left">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 leading-tight">
              Welcome to Modern States
            </h2>

            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg transform transition-all hover:shadow-md">
              <p className="text-green-700 font-medium">
                First time here?{' '}
                <a href="#" className="underline hover:text-green-800 transition-colors font-semibold">
                  Register for your account here.
                </a>
              </p>
            </div>

            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Log in to view your courses, explore tools and features, and customize your eLearning experience.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <Label
                  htmlFor="username"
                  className={`text-gray-700 font-semibold transition-colors ${focusedField === 'username' ? 'text-blue-600' : ''
                    }`}
                >
                  Username <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setFocusedField('username')}
                  onBlur={() => setFocusedField(null)}
                  className="mt-2 border-2 border-gray-300 rounded h-14 text-base transition-all duration-300 focus:border-blue-500 focus:ring-0 focus:shadow-lg hover:border-gray-400"
                  required
                />
                {focusedField === 'username' && (
                  <div className="absolute -bottom-5 left-0 text-xs text-blue-600 animate-fade-in">
                    Enter your username to continue
                  </div>
                )}
              </div>

              <div className="relative pt-2">
                <Label
                  htmlFor="password"
                  className={`text-gray-700 font-semibold transition-colors ${focusedField === 'password' ? 'text-blue-600' : ''
                    }`}
                >
                  Password <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  className="mt-2 border-2 border-gray-300 rounded h-14 text-base transition-all duration-300 focus:border-blue-500 focus:ring-0 focus:shadow-lg hover:border-gray-400"
                  required
                />
                {focusedField === 'password' && (
                  <div className="absolute -bottom-5 left-0 text-xs text-blue-600 animate-fade-in">
                    Enter your secure password
                  </div>
                )}
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-10 py-3 rounded-md h-14 shadow-md hover:shadow-xl transform transition-all duration-300 hover:scale-105 disabled:transform-none disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Logging in...</span>
                    </div>
                  ) : (
                    'Log In'
                  )}
                </Button>
              </div>

              <div className="pt-2">
                <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors inline-flex items-center group">
                  Forgot your password?
                  <svg className="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </form>
          </div>

          {/* Right side - Branding with enhanced animations */}
          <div className="flex justify-center lg:justify-end animate-slide-in-right">
            <div className="text-center transform transition-transform hover:scale-105 duration-500">
              <div className="mb-8">
                <div className="flex items-center justify-center space-x-4 mb-8">
                  {/* Enhanced Logo */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-yellow-400 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                    <div className="relative w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-2xl transform transition-transform group-hover:rotate-12 duration-500">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-md flex items-center justify-center shadow-lg">
                        <div className="w-5 h-5 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-sm"></div>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                    MODERN STATES
                  </h3>
                </div>
              </div>

              {/* Enhanced Color Blocks */}
              <div className="space-y-0 shadow-2xl rounded-lg overflow-hidden transform transition-all hover:shadow-3xl">
                <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white py-8 px-20 text-3xl font-bold tracking-widest relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
                  <span className="relative z-10">L E A R N</span>
                </div>
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-8 px-20 text-3xl font-bold tracking-widest relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
                  <span className="relative z-10">T E S T</span>
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-8 px-20 text-3xl font-bold tracking-widest relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
                  <span className="relative z-10">E A R N</span>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white py-5 px-20 text-xl font-medium tracking-wide">
                  modernstates.org
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer text with enhanced styling */}
        <div className="mt-20 max-w-4xl animate-fade-in-up">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <p className="text-gray-700 leading-relaxed text-base">
              <span className="font-bold text-gray-900">Modern States Education Alliance™</span> is a non-profit dedicated to making a high quality college education free of cost and accessible to any person who seeks one. Its founding principle is that access to affordable education is fundamental to any philosophy that respects all individuals, and fundamental to the American dream.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}