import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

const Login = () => {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // for signup
  const [error, setError] = useState('');
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'signin') {
    if (email === 'sysadmin' && password === 'test3') {
      navigate('/home');
    } else {
      setError('Invalid credentials');
      }
    } else {
      // Sign up: just switch to sign in
      setActiveTab('signin');
      setEmail('');
      setPassword('');
      setUsername('');
      setError('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 flex flex-col items-center">
        {/* Logo and App Name */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold mb-2">S</div>
          <div className="font-semibold text-lg text-gray-900">sureflow</div>
        </div>
        {/* Tabs */}
        <div className="flex w-full mb-6">
          <button
            className={`flex-1 py-2 rounded-l-lg font-medium text-sm transition-colors ${activeTab === 'signin' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setActiveTab('signin')}
          >
            Sign In
          </button>
          <button
            className={`flex-1 py-2 rounded-r-lg font-medium text-sm transition-colors ${activeTab === 'signup' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </button>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full">
          {activeTab === 'signup' && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-1 text-sm">Username</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                placeholder="Enter your username"
                autoComplete="username"
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1 text-sm">Email Address</label>
            <input
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              placeholder="Enter your email address"
              autoComplete="email"
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 mb-1 text-sm">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              placeholder="Enter your password"
              autoComplete={activeTab === 'signin' ? 'current-password' : 'new-password'}
            />
          </div>
          {activeTab === 'signin' && (
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center text-sm text-gray-700">
              <input
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
                className="mr-2 rounded border-gray-300"
              />
              Remember me
            </label>
              <button
                type="button"
                className="text-xs text-blue-600 hover:underline font-medium"
                onClick={() => navigate('/reset-password')}
              >
                Forgot password?
              </button>
          </div>
          )}
          {error && <div className="text-red-500 text-sm mb-3">{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition-colors mb-4 text-sm"
          >
            {activeTab === 'signin' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>
        {/* Divider */}
        <div className="flex items-center w-full my-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="mx-2 text-xs text-gray-400">Or continue with</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        {/* Social Buttons */}
        <div className="flex flex-col w-full gap-2 mb-4">
          <button className="flex items-center justify-center gap-2 border border-gray-300 rounded py-2 w-full hover:bg-gray-50 transition text-sm font-medium">
            <FcGoogle className="w-5 h-5" /> Continue with Google
          </button>
          <button className="flex items-center justify-center gap-2 border border-gray-300 rounded py-2 w-full hover:bg-gray-50 transition text-sm font-medium">
            <FaGithub className="w-5 h-5" /> Continue with GitHub
          </button>
        </div>
        {/* Terms and Privacy */}
        <div className="text-xs text-gray-400 text-center mt-2">
          By signing in, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};

export default Login; 