// frontend/src/app/layout.tsx
'use client'; // This is a Client Component root layout

import { Inter } from 'next/font/google';
import '../styles/globals.css';

import { QueryClientProvider } from '@tanstack/react-query';
// Import your combined providers component. Adjusted path based on your structure.
import { Providers as CombinedProviders } from '../lib/Providers'; // Renamed Provider.tsx to Provider to match your lib/Provider.tsx
import { queryClient } from '../lib/queryClient';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <CombinedProviders>
            {children}
          </CombinedProviders>
        </QueryClientProvider>
      </body>
    </html>
  );
}