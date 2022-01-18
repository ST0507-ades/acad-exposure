require('dotenv').config();
const pg = require('pg');

const databaseConfig = {
    connectionString: process.env.DATABASE_URL,
    max: 5,
};

const pool = new pg.Pool(databaseConfig);

module.exports = {
    query: (sql, params, silent = false) => {
        if (!silent) console.log(`SQL QUERY | `, sql, params);
        return pool.query(sql, params);
    },
    end: () => pool.end(),
};
