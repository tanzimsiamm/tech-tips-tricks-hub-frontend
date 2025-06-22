// frontend/src/app/(common)/about/page.tsx
import React from 'react';

export default function AboutPage() {
  return (
    <div className="container mx-auto p-4 py-12 text-center bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold mb-6 text-blue-700">About Tech Tips & Tricks Hub</h1>
      <p className="text-lg text-gray-700 mb-4 max-w-2xl mx-auto">
        Welcome to your go-to platform for mastering the ever-evolving world of technology!
        We believe in sharing knowledge, personal experiences, and expert advice to help tech enthusiasts,
        from beginners to seasoned pros, navigate their digital lives.
      </p>
      <p className="text-lg text-gray-700 max-w-2xl mx-auto">
        Our mission is to provide practical solutions, insightful tutorials, honest reviews, and valuable
        recommendations that enhance your digital experience. Join our community, share your tips, and
        grow your tech skills!
      </p>
      {/* Add more content, team info, mission/vision */}
    </div>
  );
}