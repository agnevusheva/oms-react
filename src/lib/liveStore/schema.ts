import { Events, makeSchema, Schema, SessionIdSymbol, State } from '@livestore/livestore';

// Scema
const MenuItemSchema = Schema.Struct({
  id: Schema.Int,
  name: Schema.String,
  price: Schema.Number,
  quantity: Schema.Int,
});

const DraftOrderSchema = Schema.Struct({
  type: Schema.String,
  items: Schema.Array(MenuItemSchema),
  createdAt: Schema.Date,
  id: Schema.String,
});

export const OrderSchema = Schema.Struct({
  type: Schema.String,
  id: Schema.String,
  items: Schema.Array(MenuItemSchema),
  createdAt: Schema.Date,
  updatedAt: Schema.Date,
  status: Schema.String,
  omsId: Schema.String,
});

// Events
const orderCreated = Events.synced({
  name: 'v1.OrderCreated',
  schema: OrderSchema,
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
    items: Schema.optional(Schema.Array(MenuItemSchema)),
  }),
});

// Tables
const ordersTable = State.SQLite.table({
  name: 'orders',
  columns: {
    id: State.SQLite.text({ primaryKey: true }),
    type: State.SQLite.text(),
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

// UI state
const orderDraft = State.SQLite.clientDocument({
  name: 'orderDraft',
  schema: DraftOrderSchema,
  default: {
    id: SessionIdSymbol,
    value: {
      type: 'eat-in',
      items: [],
      createdAt: new Date(),
      id: SessionIdSymbol.toString(),
    },
  },
});

export const tables = { orders: ordersTable, oms: OMSTable, orderDraft };

const events = { OMSCreated, orderCreated, orderUpdated, orderDraftSet: tables.orderDraft.set };

const materializers = State.SQLite.materializers(events, {
  'v1.OMSCreated': ({ id }) => tables.oms.insert({ id }),
  'v1.OrderCreated': order => tables.orders.insert(order),
  'v1.OrderUpdated': order => tables.orders.update(order),
});

const state = State.SQLite.makeState({ tables, materializers });

export const schema = makeSchema({ events, state });
