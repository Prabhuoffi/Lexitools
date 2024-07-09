import React from 'react';
import HomeIMG from '../../../assets/home.png';
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
      <div className='flex-1 flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 p-4'>
        <div className='text-center'>
          <img
            src={HomeIMG}
            alt='App Logo'
            className='w-48 h-48 md:w-60 md:h-60 mb-8 rounded-full shadow-lg mx-auto'
          />
          <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4'>
            Welcome to Lexitools
          </h1>
          <p className='text-lg md:text-xl lg:text-2xl text-gray-200 mb-6'>
            Your all-in-one solution for language translation, quotes, and more.
          </p>
          <Link
  to='/homepage'
  className='bg-yellow-400 text-gray-900 px-6 py-3 text-lg font-semibold rounded-full hover:bg-yellow-500 hover:shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2'
>
  Get Started
</Link>

        </div>
      </div>
    </div>
  );
};

export default Home;
