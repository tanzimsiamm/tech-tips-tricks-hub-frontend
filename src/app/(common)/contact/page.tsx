// frontend/src/app/(common)/contact/page.tsx
'use client';
import React, { useState } from 'react';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { Textarea } from '@heroui/input';
import { toast } from 'sonner';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(null);
    try {
      // Simulate API call to send contact form
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      // In a real application, you would make an Axios POST request here:
      // await api.post('/contact', formData);
      setSubmitSuccess(true);
      toast.success('Thank you for your message! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
    } catch (error) {
      console.error('Contact form submission failed:', error);
      setSubmitSuccess(false);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl bg-white shadow-lg rounded-lg my-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-700 text-center">Contact Us</h1>
      <p className="text-lg text-gray-700 mb-6 text-center">
        Have questions, feedback, or need support? Reach out to us using the form below.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          label="Your Name"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
          fullWidth
        />
        <Input
          type="email"
          label="Your Email"
          name="email"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={handleChange}
          required
          fullWidth
        />
        <Input
          type="text"
          label="Subject"
          name="subject"
          placeholder="Subject of your message"
          value={formData.subject}
          onChange={handleChange}
          required
          fullWidth
        />
        <Textarea
          label="Your Message"
          name="message"
          placeholder="Write your message here..."
          value={formData.message}
          onChange={handleChange}
          required
          minRows={6}
          fullWidth
        />
        <Button
          type="submit"
          color="primary"
          className="w-full px-6 py-3 text-white rounded-lg shadow-md"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending Message...' : 'Send Message'}
        </Button>
      </form>

      {submitSuccess !== null && (
        <div className={`mt-4 text-center p-3 rounded-md ${submitSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {submitSuccess ? 'Message sent successfully!' : 'Failed to send message.'}
        </div>
      )}
    </div>
  );
}