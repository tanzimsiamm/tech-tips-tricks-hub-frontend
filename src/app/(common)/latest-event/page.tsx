// frontend/src/app/(common)/latest-event/page.tsx
'use client';
import React from 'react';
import { Button } from '@heroui/button';
import Link from 'next/link';

export default function LatestEventPage() {
  const event = {
    title: "AI & Future of Tech Summit 2025",
    date: "July 15, 2025",
    location: "Online & Dhaka, Bangladesh",
    description: "Join us for the most anticipated tech event of the year! Explore cutting-edge AI advancements, discover emerging technologies, and network with industry leaders. Featuring keynote speeches, workshops, and panel discussions on the future of software engineering, cybersecurity, and data science.",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af036?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    registrationLink: "https://example.com/event-registration", // Placeholder
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl bg-white shadow-lg rounded-lg my-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-700 text-center">Latest Event</h1>
      <div className="text-center mb-6">
        {event.imageUrl && (
          <img src={event.imageUrl} alt={event.title} className="w-full h-auto rounded-lg shadow-md mb-4" />
        )}
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">{event.title}</h2>
        <p className="text-md text-gray-600 mb-2">
          <span className="font-medium">Date:</span> {event.date}
        </p>
        <p className="text-md text-gray-600 mb-4">
          <span className="font-medium">Location:</span> {event.location}
        </p>
        <p className="text-gray-700 text-left mb-6">{event.description}</p>
        {event.registrationLink && (
          <Link href={event.registrationLink} passHref target="_blank" rel="noopener noreferrer">
            <Button color="primary" size="lg" className="px-8 py-3 text-white rounded-lg shadow-md">
              Register Now
            </Button>
          </Link>
        )}
      </div>
      {/* Add more event details or a list of past events */}
    </div>
  );
}