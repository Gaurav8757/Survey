import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
function Home() {
  const [text, setText] = useState('');
  const message = "Welcome to Survey App";

  useEffect(() => {
    let currentIndex = 0;

    const intervalId = setInterval(() => {
      if (currentIndex <= message.length) {
        setText(message.slice(0, currentIndex));
        currentIndex += 1;
      } else {
        clearInterval(intervalId);
      }
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <img src="/survey.png" alt="bg_img" className="bg-contain w-full bg-cover h-screen" />
      {/* Positioned text overlay */}
      <div className="absolute top-32 left-1/2 transform -translate-x-1/2 -translate-y-1/4 text-white text-4xl font-bold">
        {text}
        
      </div>
      <div className="absolute top-56 left-1/2 transform -translate-x-1/2 -translate-y-1/4 text-white text-4xl font-bold">
      <NavLink to = "/surveyform" className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-1 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
Fill Survey Form
</span>
</NavLink> </div>

    </>
  );
}

export default Home;
