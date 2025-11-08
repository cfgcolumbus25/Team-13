import React from 'react';
import styles from './loginForm.module.css';
import { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Admin login attempt:', { email, password, rememberMe });
  };

  return (
    <div className="w-full max-w-md shadow-xl p-6 bg-white rounded-lg">
      <h2 className="text-center text-2xl font-bold">Administrator Login</h2>
      <p className= "">
        Secure access for college administrators
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">Administrator Email</label>
          <input
            id="email"
            type="email"
            placeholder="admin@institution.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border rounded-md p-2"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your secure password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border rounded-md p-2"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <input
              id="remember"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4"
            />
            <label htmlFor="remember" className="text-sm cursor-pointer">Keep me signed in</label>
          </div>
          <a href="#" className="text-sm text-blue-600 hover:underline">Reset password</a>
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2"
        >
          Sign In to Admin Portal
        </button>
      </form>
      <div className="flex flex-col space-y-4 mt-4">
        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">Or sign in with SSO</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 w-full">
          <button className="border rounded-md p-2">Microsoft 365</button>
          <button className="border rounded-md p-2">Google Workspace</button>
        </div>

        <div className="pt-4 border-t w-full">
          <p className="text-center text-sm text-gray-500">
            Need access?{' '}
            <a href="#" className="text-blue-600 hover:underline">Contact IT Support</a>
          </p>
          <p className="text-center text-xs text-gray-500 mt-2">
            Protected by two-factor authentication
          </p>
        </div>
      </div>
    </div>
  );
}