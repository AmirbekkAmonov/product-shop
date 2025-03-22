"use client";

import React from 'react';
import { Inter } from 'next/font/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/header';
import '@/styles/globals.scss';

const inter = Inter({ 
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,     
      gcTime: 1000 * 60 * 30, 
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <CartProvider>
            <Header />
            <main>{children}</main>
          </CartProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
} 