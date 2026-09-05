import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import ThemeRegistry from '@/components/common/ThemeRegistry';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'HAVEN | Premier Luxury Real Estate & Residences',
  description:
    'Discover extraordinary penthouses, luxury apartments, and boutique garden villas in prime Indian metropolitan locations with verified credentials and direct concierge advisory.',
  keywords: [
    'Real Estate',
    'Luxury Apartments',
    'Penthouse for Sale',
    'BHK Flats',
    'Rental Residences',
    'Mumbai Real Estate',
    'Bengaluru Villas',
    'Gurugram High Rise',
  ],
  authors: [{ name: 'HAVEN Luxury Portal' }],
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-icon.svg', type: 'image/svg+xml' },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
