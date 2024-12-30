const knex = require('knex');
const { log } = require('../util/log');
const { Model } = require('objection');

let client = null;

/**
 * Initializes the database connection.
 * @returns {Promise<void>} A promise that resolves when the connection is initialized.
 */
const init = async () => {
  client = knex({
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
  });
  Model.knex(client);
  await createSchema();
  log.info('DB connection initialized');
};

const createSchema = async () => {
  if (!(await client.schema.hasTable('container'))) {
    await client.schema.createTable('container', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table
        .integer('container_id')
        .unsigned()
        .references('id')
        .inTable('container')
        .onDelete('CASCADE');
    });
    log.info('Table "container" created');
  }

  if (!(await client.schema.hasTable('item'))) {
    await client.schema.createTable('item', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table
        .integer('container_id')
        .unsigned()
        .references('id')
        .inTable('container')
        .onDelete('CASCADE');
    });
    log.info('Table "item" created');
  }

  if (!(await client.schema.hasTable('image'))) {
    await client.schema.createTable('image', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table
        .integer('item_id')
        .unsigned()
        .references('id')
        .inTable('item')
        .onDelete('CASCADE');
    });
    log.info('Table "image" created');
  }
};

/**
 * @template T
 * @param {string} tableName - The name of the table.
 * @returns {import('objection').QueryBuilder<T>} - A query builder for the specified table.
 */
const table = (name) => {
  return client(name);
};

/**
 * Shuts down the database connection.
 * @returns {Promise<void>} A promise that resolves when the connection is closed.
 */
const shutdown = async () => {
  if (client) {
    await client.destroy();
    client = null;
    log.info('DB connection closed');
  }
};

module.exports = {
  init,
  shutdown,
  table,
};
