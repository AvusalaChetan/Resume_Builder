import React from 'react';

const Loading = ({ message = "Loading...", size = "medium" }) => {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8", 
    large: "w-12 h-12"
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div 
        className={`${sizeClasses[size]} border-4 border-gray-200 border-t-black rounded-full animate-spin`}
        role="status"
        aria-label="Loading"
      ></div>
      
      <p className="mt-2 text-gray-600 text-sm font-medium">
        {message}
      </p>
    </div>
  );
};

export const DotsLoading = ({ message = "Loading" }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 backdrop-blur-3xl border">
      <div className="flex space-x-1 ">
        <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
        <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
      </div>
      <p className="mt-2 text-gray-600 text-sm font-medium">{message}...</p>
    </div>
  );
};

export const FullPageLoading = ({ message = "Please wait..." }) => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <Loading message={message} size="large" />
      </div>
    </div>
  );
};

export default Loading;