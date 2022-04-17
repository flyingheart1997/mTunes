import React from 'react';

const Loader = () => {
  return (
    <div className='flex flex-row items-center justify-center w-screen h-screen gap-3 text-4xl text-red-400 sm:text-7xl md:text-6xl'>
      <h6 className='flex flex-row items-center '>Loading </h6>
      <div className='flex-row mt-3'><span className='items-center justify-center text-red-500 animate-pulse'> • </span><span className='items-center text-red-600 animate-pulse'> • </span><span className='items-center text-red-700 animate-pulse'> • </span><span className='items-center text-red-800 animate-pulse'> • </span></div>
    </div>
  );
}

export default Loader;
