// const { Client, Pool } = require('pg');
// const fs = require('fs');
// const path = require('path');

// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'musicapp',
//     password: 'root',
//     port: 5432,
//   });

// module.exports.pool = pool;

// async function runSQLFile(filePath) {
//     const sql = fs.readFileSync(filePath, 'utf8');
//     await pool.query(sql);
// }

// async function createTables() {
//     try {

//         const files = [
//             'create_artists_table.sql',
//             'create_albums_table.sql',
//             'create_songs_table.sql',
            
//             'create_users_table.sql'
//         ];

//         for (const file of files) {
//             const filePath = path.join(__dirname, 'schemas', file);
//             console.log(`Running ${filePath}...`);
//             await runSQLFile(filePath);
//             console.log(`Successfully created tables from ${filePath}`);
//         }
//     } catch (err) {
//         console.error('Error creating tables:', err);
//     }
// }

// async function main() {
//     try {
//         await pool.connect(); // Connect to the database
//         console.log('Connected to PostgreSQL');

//         await createTables(); // Create tables
//     } catch (err) {
//         console.error('Error connecting to the database or creating tables:', err);
//     } finally {
//         // Ensure pool is closed if there’s an error
//         await pool.end();
//     }
// }

// main();

const { Client, Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'musicapp',
    password: 'root',
    port: 5432,
  });

module.exports.pool = pool;

async function runSQLFile(filePath) {
    const sql = fs.readFileSync(filePath, 'utf8');
    await pool.query(sql);
}

async function createTables() {
    try {

        const files = [
            'create_artists_table.sql',
            'create_albums_table.sql',
            'create_songs_table.sql',
            
            'create_users_table.sql'
        ];

        for (const file of files) {
            const filePath = path.join(__dirname, 'schemas', file);
            console.log(`Running ${filePath}...`);
            await runSQLFile(filePath);
            console.log(`Successfully created tables from ${filePath}`);
        }
    } catch (err) {
        console.error('Error creating tables:', err);
    }
}