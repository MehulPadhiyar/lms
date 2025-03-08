import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  async function login(formData) {
    try {
      const userData = {
        email: formData.get('email'),
        password: formData.get('password'),
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, userData, {
        withCredentials: true,
      });

      toast.success('Login successful!');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      toast.error(err.message);
    }
  }
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="px-10 py-16 min-w-[30%] border-2 rounded-2xl shadow-2xl backdrop-blur-xl">
        <div className="text-center mb-10">
          <h2 className="text-center font-semibold text-4xl">Login</h2>
        </div>
        <form action={login} className="flex flex-col space-y-6 text-sm font-semibold">
          <label htmlFor="email" className="flex flex-col">
            Email
            <input
              type="email"
              id="email"
              name="email"
              className="py-2 pl-2 border-2 border-gray-400 rounded-md text-sm font-normal"
              placeholder="Enter your email address"
            />
          </label>
          <label htmlFor="password" className="flex flex-col">
            Password
            <input
              minLength={8}
              type="password"
              id="password"
              name="password"
              className="py-2 pl-2 mb-2 border-2 border-gray-400 rounded-md text-sm font-normal"
              placeholder="Enter your password"
            />
          </label>
          <div className="flex flex-col">
            <button
              type="submit"
              className="py-2 bg-black text-white text-lg rounded-full font-normal hover:opacity-90"
            >
              Login
            </button>
            <p className="text-center mt-2 text-gray-500">
              New to Learnify?{' '}
              <Link to="/signup" className="underline text-black">
                Sign up for free
              </Link>
            </p>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
}
