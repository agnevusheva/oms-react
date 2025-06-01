import { makeWorker } from '@livestore/adapter-web/worker';
import { schema } from './schema';
makeWorker({ schema });

export const liveStoreSharedWorkerFactory = (relativePath: string) => {
  return (opts: { name: string }): SharedWorker => {
    return new SharedWorker(new URL(relativePath, import.meta.url), {
      type: 'module',
      name: opts.name,
    });
  };
};
