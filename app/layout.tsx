import type { Metadata } from 'next';
import './globals.css';
import { roboto } from './fonts/fonts';
import styles from './page.module.css';
import { MainBackground } from './UI/backgrounds/MainBackground';

export const metadata: Metadata = {
  title: 'OMS LiveStore',
  description: 'Trying out LiveStore',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${roboto.variable} ${styles.app}`}>
        <main>
          <MainBackground>{children}</MainBackground>
        </main>
      </body>
    </html>
  );
}
