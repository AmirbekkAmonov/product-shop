"use client";

import React from 'react';
import { Geist } from 'next/font/google';
import { Geist_Mono } from 'next/font/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/header';
import '@/styles/globals.scss';

const geist = Geist({ subsets: ['latin'] });
const geistMono = Geist_Mono({ subsets: ['latin'] });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
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
      <body className={`${geist.className} ${geistMono.className}`}>
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