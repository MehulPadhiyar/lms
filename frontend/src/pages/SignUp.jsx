import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

export default function SignUp() {
  const navigate = useNavigate();
  async function signup(formData) {
    try {
      const userData = {
        name: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
      };

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/signup`, userData, {
        withCredentials: true,
      });

      toast.success('Account successfully created!');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      toast.error(err.message);
    }
  }
  return (
    <div className="h-full w-full flex justify-center items-center bg-cover">
      <div className="px-10 py-20 min-w-[30%] border-2 rounded-2xl shadow-2xl">
        <div className="text-center mb-10">
          <h2 className="text-center font-semibold text-4xl">Create an account</h2>
          <p className="text-xs max-w-26 text-gray-600 font-semibold">Create Your Account to Unlock Knowledge!</p>
        </div>
        <form action={signup} className="flex flex-col space-y-6 text-sm font-semibold">
          <label htmlFor="username" className="flex flex-col">
            Username
            <input
              type="text"
              id="username"
              name="username"
              className="py-2 pl-2 border-2 border-gray-400 rounded-md text-sm font-normal"
              placeholder="Enter your name"
            />
          </label>
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
              Sign up
            </button>
            <p className="text-center mt-2 text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="underline text-black">
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
}
