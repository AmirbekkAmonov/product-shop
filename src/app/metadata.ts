import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OnlineDokon - Online do\'kon',
  description: 'Eng sifatli mahsulotlar online do\'koni',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'OnlineDokon - Online do\'kon',
    description: 'Eng sifatli mahsulotlar online do\'koni',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'OnlineDokon',
      },
    ],
  },
}; 