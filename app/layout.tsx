import type { Metadata } from 'next';
import './globals.css';
import { roboto } from '../fonts/fonts';
import styles from './page.module.css';
import { MainBackground } from '../UI/backgrounds/MainBackground';
import { LiveStoreProvider } from '@livestore/react';
import { schema } from '../lib/liveStore/schema';
import { unstable_batchedUpdates as batchUpdates } from 'react-dom';
import { makePersistedAdapter } from '@livestore/adapter-web';
import { liveStoreSharedWorkerFactory } from '../lib/liveStore/sharedWorker';
import { liveStoreWorkerFactory } from '../lib/liveStore/worker';

export const metadata: Metadata = {
  title: 'OMS LiveStore',
  description: 'Trying out LiveStore',
};

const adapter = makePersistedAdapter({
  storage: { type: 'opfs' },
  worker: liveStoreWorkerFactory('./lib/liveStore/worker.ts'),
  sharedWorker: liveStoreSharedWorkerFactory('./lib/liveStore/sharedWorker.ts'),
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} ${styles.app}`}>
        <LiveStoreProvider schema={schema} adapter={adapter} batchUpdates={batchUpdates}>
          <main>
            <MainBackground>{children}</MainBackground>
          </main>
        </LiveStoreProvider>
      </body>
    </html>
  );
}
