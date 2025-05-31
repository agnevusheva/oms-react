import { Events, makeSchema, Schema, State } from '@livestore/livestore';

const orderCreated = Events.synced({
  name: 'v1.OrderCreated',
  schema: Schema.Struct({
    type: Schema.Int,
    id: Schema.String,
    items: Schema.Array(Schema.String),
    createdAt: Schema.Date,
    updatedAt: Schema.Date,
    status: Schema.String,
  }),
});

const OMSCreated = Events.synced({
  name: 'v1.OMSCreated',
  schema: Schema.Struct({
    id: Schema.String,
  }),
});

const orderUpdated = Events.synced({
  name: 'v1.OrderUpdated',
  schema: Schema.Struct({
    id: Schema.String,
    status: Schema.String,
    updatedAt: Schema.Date,
    items: Schema.Array(Schema.String),
  }),
});

const events = { OMSCreated, orderCreated, orderUpdated };

const ordersTable = State.SQLite.table({
  name: 'orders',
  columns: {
    id: State.SQLite.text({ primaryKey: true }),
    type: State.SQLite.integer({ primaryKey: true }),
    status: State.SQLite.text(),
    items: State.SQLite.json(),

    createdAt: State.SQLite.integer({ schema: Schema.DateFromNumber }),
    updatedAt: State.SQLite.integer({ schema: Schema.DateFromNumber, nullable: true }),
  },
});

const OMSTable = State.SQLite.table({
  name: 'oms',
  columns: {
    id: State.SQLite.text({ primaryKey: true }),
  },
});

const tables = { orders: ordersTable, oms: OMSTable };

const materializers = State.SQLite.materializers(events, {
  'v1.OMSCreated': ({ id }) => [tables.oms.insert({ id })],
  'v1.OrderCreated': order => tables.orders.insert(order),
  'v1.OrderUpdated': order => tables.orders.update(order),
});

const state = State.SQLite.makeState({ tables, materializers });

export const schema = makeSchema({ events, state });
