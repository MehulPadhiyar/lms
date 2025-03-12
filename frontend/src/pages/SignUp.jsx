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
    <div className="h-full w-full bg-purple-100 flex justify-center items-center bg-cover">
      <div className="flex flex-col md:flex-row w-[70%] h-[95%] md:h-auto md:w-[85%] xl:w-[70%] bg-white shadow-xl border-[1px] rounded-3xl overflow-hidden">
        <div className="2xl:px-28 md:px-14 px-6 py-6 md:py-20 w-full md:w-[50%] min-h-[65%] md:h-auto bg-white">
          <div className="text-center mb-4 md:mb-10">
            <h2 className="text-center font-semibold text-2xl md:text-4xl">Create an account</h2>
            <p className="text-xs max-w-26 text-gray-600 font-semibold">Create Your Account to Unlock Knowledge!</p>
          </div>
          <form action={signup} className="flex flex-col space-y-2 md:space-y-6 text-sm font-semibold">
            <label htmlFor="username" className="flex flex-col">
              Username
              <input
                type="text"
                id="username"
                name="username"
                className="py-2 pl-2 border-2 border-gray-400 rounded-md text-sm font-normal"
                placeholder="Enter your name"
                required
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
                required
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
                required
              />
            </label>
            <div className="flex flex-col">
              <button
                type="submit"
                className="py-2 bg-primary text-white text-lg rounded-full font-normal hover:opacity-90"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
        <div className="bg-primary w-full md:w-[50%] min-h-[40%] md:h-auto rounded-t-[6rem] md:rounded-r-none md:rounded-l-[11rem] flex justify-center items-center">
          <div className="flex flex-col items-center">
            <h2 className="text-white text-3xl md:text-[2.80rem] font-extrabold">Join Us Today!</h2>
            <p className="text-white text-sm md:text-lg">Already have an account?</p>
            <Link className="text-white border-2 px-4 py-1 md:px-16 md:py-2 rounded-lg mt-4" to="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
