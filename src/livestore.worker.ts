/// <reference types="vite/client" />

import { makeWorker } from '@livestore/adapter-web/worker';
import { makeCfSync } from '@livestore/sync-cf';
import { schema } from './lib/liveStore/schema';

makeWorker({
  schema,
  sync: {
    backend: makeCfSync({ url: import.meta.env.VITE_SYNC_URL }),
    initialSyncOptions: { _tag: 'Blocking', timeout: 5000 },
  },
});
