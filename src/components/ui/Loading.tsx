// frontend/src/components/UI/Loading.tsx
import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen fixed inset-0 bg-gray-50 bg-opacity-75 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      <p className="ml-4 text-lg text-gray-700">Loading...</p>
    </div>
  );
};

export default Loading;