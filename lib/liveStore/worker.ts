import { makeWorker } from '@livestore/adapter-web/worker';
import { schema } from './schema';

makeWorker({ schema });

export const liveStoreWorkerFactory = (relativePath: string) => {
  return (opts: { name: string }): Worker => {
    return new Worker(new URL(relativePath, import.meta.url), {
      type: 'module',
      name: opts.name,
    });
  };
};
