import React, { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { Mail, Lock, XCircle } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(true);

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setIsValid(regex.test(email));
  };

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
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <div className="h-dvh w-full bg-purple-100 flex justify-center items-center">
      <div className="flex flex-col md:flex-row w-[90%] md:h-auto md:w-[85%] xl:w-[70%] bg-white shadow-xl border-[1px] rounded-3xl overflow-hidden">
        <div className="bg-primary w-full md:w-[50%] md:h-auto py-10 rounded-b-[6rem] md:rounded-bl-none md:rounded-e-[11rem] flex justify-center items-center">
          <div className="flex flex-col items-center gap-2">
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
          <form action={login} className="flex flex-col space-y-4 md:space-y-4 text-sm font-semibold">
            <label htmlFor="email" className="flex flex-col gap-1">
              Email
              <div
                className={`flex items-center border-2 ${
                  isValid ? 'border-gray-400' : 'border-red-700'
                } rounded-md px-2 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:border-gray-50 ${
                  !isValid && 'text-red-700 focus-within:ring-red-700'
                }`}
              >
                <Mail size={15} className={`${isValid ? 'text-slate-400' : 'text-red-700'}`} />
                <input
                  onChange={(e) => validateEmail(e.target.value)}
                  type="email"
                  id="email"
                  name="email"
                  className="w-full py-2 pl-2 text-sm font-normal focus:outline-none"
                  placeholder="Enter your email"
                  required
                />
                {!isValid && <XCircle fill="red" size={18} className="text-white" />}
              </div>
              {!isValid && <span className="text-red-700">Please enter valid email address.</span>}
            </label>
            <label htmlFor="password" className="flex flex-col gap-1">
              Password
              <div className="flex items-center border-2 border-gray-400 rounded-md px-2 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:border-gray-50">
                <Lock size={15} className="text-slate-400" />
                <input
                  minLength={8}
                  type="password"
                  id="password"
                  name="password"
                  className="w-full py-2 pl-2 text-sm font-normal focus:outline-none"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </label>
            <div className="flex flex-col">
              <button
                disabled={!isValid}
                type="submit"
                className="py-2 bg-primary text-white text-lg rounded-full font-normal hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
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
