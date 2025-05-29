import localFont from 'next/font/local';

export const roboto = localFont({
  src: [
    { path: './Roboto-Regular.ttf', weight: '400', style: 'normal' },
    { path: './Roboto-Italic.ttf', weight: '400', style: 'italic' },
    { path: './Roboto-Medium.ttf', weight: '500', style: 'normal' },
    { path: './Roboto-MediumItalic.ttf', weight: '500', style: 'italic' },
    { path: './Roboto-Bold.ttf', weight: '700', style: 'normal' },
    { path: './Roboto-BoldItalic.ttf', weight: '700', style: 'italic' },
  ],
  display: 'swap',
  variable: '--font-roboto',
  preload: true,
  fallback: ['sans-serif'],
});
