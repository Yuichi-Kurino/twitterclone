
// Update with your config settings.
const mysql = require('mysql');


const SQLConnection = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "gontakun",
  database: "lab4",
};
console.log(process.env.DATABASE_HOST);
module.exports = {

  development: {
    client: 'mysql',
    version: '5.7',
    connection: SQLConnection,
    migrations: {
      directory: './database/migrations',
      tablename: 'knex_migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
    useNullAsDefault: true,
  },

  staging: {
    client: 'mysql',
    connection: SQLConnection,
    migrations: {
      directory: './database/migrations',
      tablename: 'knex_migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
    useNullAsDefault: true,
    pool: {
      min: 2,
      max: 10
    },
  },

  production: {
    client: 'mysql',
    connection: process.env.CLEARDB_DATABASE_URL,
    migrations: {
      directory: './database/migrations',
      tablename: 'knex_migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
    useNullAsDefault: true,
    pool: {
      min: 2,
      max: 10
    },
  }

};