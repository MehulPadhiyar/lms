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
    <div className="h-full w-full bg-purple-100 flex justify-center items-center">
      <div className="flex flex-col md:flex-row w-[70%] h-[90%] md:h-auto md:w-[85%] xl:w-[70%] bg-white shadow-xl border-[1px] rounded-3xl overflow-hidden">
        <div className="bg-primary w-full md:w-[50%] min-h-[40%] md:h-auto rounded-b-[6rem] md:rounded-bl-none md:rounded-e-[11rem] flex justify-center items-center">
          <div className="flex flex-col items-center">
            <h2 className="text-white text-3xl md:text-[2.80rem] font-extrabold">Welcome Back!</h2>
            <p className="text-white text-sm md:text-lg">Don't have an account?</p>
            <Link className="text-white border-2 px-4 py-1 md:px-16 md:py-2 rounded-lg mt-4" to="/signup">
              Register
            </Link>
          </div>
        </div>
        <div className="xl:px-32 md:px-14 px-6 py-10 md:py-36 w-full md:w-[50%] min-h-[60%] md:h-auto bg-white">
          <div className="text-center mb-4">
            <h2 className="text-center font-semibold text-4xl">Login</h2>
          </div>
          <form action={login} className="flex flex-col space-y-4 md:space-y-6 text-sm font-semibold">
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
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
