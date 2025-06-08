import { makePersistedAdapter } from '@livestore/adapter-web';
import LiveStoreSharedWorker from '@livestore/adapter-web/shared-worker?sharedworker';
import { LiveStoreProvider } from '@livestore/react';
import LiveStoreWorker from './livestore.worker?worker';
import type React from 'react';
import { unstable_batchedUpdates as batchUpdates } from 'react-dom';
import { schema } from './lib/liveStore/schema';

const AppBody: React.FC = () => <section className="app-body">yo</section>;

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
    renderLoading={_ => <div>Loading LiveStore ({_.stage})...</div>}
    batchUpdates={batchUpdates}
    storeId={storeId}
    syncPayload={{ authToken: 'insecure-token' }}
  >
    <AppBody />
  </LiveStoreProvider>
);
