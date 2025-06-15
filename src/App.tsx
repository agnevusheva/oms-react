import { makePersistedAdapter } from '@livestore/adapter-web';
import LiveStoreSharedWorker from '@livestore/adapter-web/shared-worker?sharedworker';
import { LiveStoreProvider } from '@livestore/react';
import LiveStoreWorker from './livestore.worker?worker';
import type React from 'react';
import { unstable_batchedUpdates as batchUpdates } from 'react-dom';
import { schema } from './lib/liveStore/schema';
import { Outlet } from 'react-router-dom';
import { MainBackground } from './UI/backgrounds/MainBackground';
import './global.css';
import styles from './App.module.css';
import { Main } from './routes/main/Main';
import { Header } from './UI/typography/Header';

const storeId = 'oms-demo';

const adapter = makePersistedAdapter({
  storage: { type: 'opfs' },
  worker: LiveStoreWorker,
  sharedWorker: LiveStoreSharedWorker,
});

export const App: React.FC = () => (
  <LiveStoreProvider
    schema={schema}
    adapter={adapter}
    renderLoading={_ => (
      <MainBackground>
        <Header text="Wait"></Header>
      </MainBackground>
    )}
    batchUpdates={batchUpdates}
    storeId={storeId}
    syncPayload={{ authToken: 'insecure-token' }}
  >
    <section className={styles.app}>
      <MainBackground>
        <Outlet />
      </MainBackground>
    </section>
  </LiveStoreProvider>
);
