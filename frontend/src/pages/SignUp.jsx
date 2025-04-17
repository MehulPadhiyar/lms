import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { User, Mail, Lock, XCircle, Camera } from 'lucide-react';

export default function SignUp() {
  const navigate = useNavigate();

  const [isValid, setIsValid] = useState(true);
  const imgRef = useRef();

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setIsValid(regex.test(email));
  };

  async function signup(formData) {
    try {
      const userData = {
        name: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
        photo: formData.get('profile-image'),
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/users/signup`, userData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      toast.success('Account successfully created!');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <div className="h-full w-full bg-purple-100 flex justify-center items-start pt-5 md:pt-0 md:items-center bg-cover">
      <div className="flex flex-col md:flex-row w-[90%] md:h-auto md:w-[85%] xl:w-[70%] bg-white shadow-xl border-[1px] rounded-3xl overflow-hidden">
        <div className="2xl:px-28 md:px-14 xl:px-28 px-6 py-10 md:py-20 w-full md:w-[50%] md:h-auto bg-white">
          <div className="text-center mb-4 md:mb-4">
            <h2 className="text-center font-semibold text-2xl md:text-4xl">Create an account</h2>
            <p className="text-xs max-w-26 text-gray-600 font-semibold">Create Your Account to Unlock Knowledge!</p>
          </div>
          <form action={signup} className="flex flex-col gap-2 md:gap-3 text-sm font-semibold">
            <div className="flex justify-center">
              <label htmlFor="profile-image">
                <div className="relative">
                  <img
                    ref={imgRef}
                    src="/user/default.jpg"
                    alt="profile photo"
                    className="border-2 border-gray-400 rounded-full size-20 object-cover"
                  />
                  <Camera className="absolute bottom-0 right-0 border border-gray-400 rounded-full bg-gray-300 p-1" />
                </div>
              </label>
              <input
                onChange={(e) => {
                  const [file] = e.target.files;
                  console.log(e.target.src);
                  if (file) {
                    imgRef.current.src = window.URL.createObjectURL(file);
                  }
                }}
                type="file"
                name="profile-image"
                id="profile-image"
                accept="image/*,image/*.jpg,image/*.png"
                required
                className="hidden"
              />
            </div>

            <label htmlFor="username" className="flex flex-col">
              Username
              <div className="flex items-center border-2 border-gray-400 rounded-md px-2 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:border-gray-50">
                <User size={15} className="text-slate-400" />
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-full py-2 pl-2 text-sm font-normal focus:outline-none"
                  placeholder="Enter your name"
                  required
                />
              </div>
            </label>

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

            <div className="flex flex-col mt-2">
              <button
                type="submit"
                className="py-2 bg-primary text-white text-lg rounded-full font-normal hover:opacity-90"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
        <div className="bg-primary w-full md:w-[50%] py-12 md:h-auto rounded-t-[6rem] md:rounded-r-none md:rounded-l-[11rem] flex justify-center items-center">
          <div className="flex flex-col items-center gap-2">
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
