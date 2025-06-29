import { Events, makeSchema, Schema, SessionIdSymbol, State } from '@livestore/livestore';
import { OrderStatus, OrderType } from '../../routes/orders/types';

// Scema
const MenuItemSchema = Schema.Struct({
  id: Schema.Int,
  name: Schema.String,
  price: Schema.Number,
  quantity: Schema.Int,
});

export const DraftOrderSchema = Schema.Struct({
  items: Schema.Array(MenuItemSchema),
});

export const OrderSchema = Schema.Struct({
  type: Schema.Enums(OrderType),
  id: Schema.String,
  items: Schema.Array(MenuItemSchema),
  createdAt: Schema.Date,
  updatedAt: Schema.Date,
  status: Schema.Enums(OrderStatus),
  omsId: Schema.String,
  accountId: Schema.Int,
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
    createdAt: State.SQLite.datetime(),
    updatedAt: State.SQLite.datetime(),
    omsId: State.SQLite.text(),
    accountId: State.SQLite.integer(),
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
      items: [],
    },
  },
});

export const tables = { orders: ordersTable, oms: OMSTable, orderDraft };

export const events = {
  OMSCreated,
  orderCreated,
  orderUpdated,
  orderDraftSet: tables.orderDraft.set,
};

const materializers = State.SQLite.materializers(events, {
  'v1.OMSCreated': ({ id }) => tables.oms.insert({ id }),
  'v1.OrderCreated': order => tables.orders.insert(order),
  'v1.OrderUpdated': order => tables.orders.update(order),
});

const state = State.SQLite.makeState({ tables, materializers });

export const schema = makeSchema({ events, state });
