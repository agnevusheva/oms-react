import { Events, makeSchema, Schema, State } from '@livestore/livestore';

const menuItemSchema = Schema.Struct({
  id: Schema.String,
  name: Schema.String,
  price: Schema.Number,
  quantity: Schema.Int,
});

const draftOrder = Schema.Struct({
  type: Schema.Int,
  items: Schema.Array(menuItemSchema),
  createdAt: Schema.Date,
  id: Schema.String,
});

export const orderSchema = Schema.Struct({
  type: Schema.Int,
  id: Schema.String,
  items: Schema.Array(menuItemSchema),
  createdAt: Schema.Date,
  updatedAt: Schema.Date,
  status: Schema.String,
  omsId: Schema.String,
});

export const draftOrderSchema = Schema.NullOr(draftOrder);

const orderCreated = Events.synced({
  name: 'v1.OrderCreated',
  schema: orderSchema,
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
    status: Schema.optional(Schema.String),
    updatedAt: Schema.optional(Schema.Date),
    items: Schema.optional(Schema.Array(menuItemSchema)),
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
    omsId: State.SQLite.text(),
  },
});

const OMSTable = State.SQLite.table({
  name: 'oms',
  columns: {
    id: State.SQLite.text({ primaryKey: true }),
  },
});

const orderDraft = State.SQLite.clientDocument({
  name: 'orderDraft',
  schema: draftOrderSchema,
  default: { value: null },
});

const tables = { orders: ordersTable, oms: OMSTable, orderDraft };

const materializers = State.SQLite.materializers(events, {
  'v1.OMSCreated': ({ id }) => tables.oms.insert({ id }),
  'v1.OrderCreated': order => tables.orders.insert(order),
  'v1.OrderUpdated': order => tables.orders.update(order),
});

const state = State.SQLite.makeState({ tables, materializers });

export const schema = makeSchema({ events, state });
