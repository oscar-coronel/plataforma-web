const { Pool } = require('pg')

const config = {
    host: 'localhost',
    port: '5432',
    database: 'chat',
    user: 'postgres',
    password: 'postgres'
}

const pool = new Pool(config)

module.exports = pool