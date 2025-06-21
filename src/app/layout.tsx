'use client'; // This component needs to be a Client Component to use QueryClientProvider

import { Inter } from 'next/font/google';
import "@/src/styles/globals.css"

// Import QueryClientProvider and your configured queryClient
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../lib/queryClient'; // Ensure correct path to your queryClient

const inter = Inter({ subsets: ['latin'] });

// You can define metadata in a separate server layout or page,
// or keep a static metadata object in a non-'use client' file.
// For simplicity here, we omit the direct export in this client component.
// In App Router, metadata exports are typically in server components.
// export const metadata = {
//   title: 'Tech Tips & Tricks Hub',
//   description: 'Your go-to platform for tech tips and tricks!',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}