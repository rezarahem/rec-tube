import NavMenu from '@/components/NavMenu';
import './globals.css';
import type { Metadata } from 'next';
import AuthProvider from '@/components/auth/AuthProvider';
import localFont from 'next/font/local';

export const metadata: Metadata = {
  title: 'رکورد اپ',
  description: 'رکورد اپ',
};

// const myFont = localFont({
//   src: '../fonts/DanaVF.woff2',
//   variable: '--font-dana',
//   display: 'swap',
// });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html
        dir='rtl'
        lang='fa'
        // className={`${myFont.variable} font-sans`}
      >
        <body>
          <NavMenu />
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
