import { pool } from './database.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import optionData from '../data/options.js'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config({ path: path.resolve(__dirname, '../.env') });

const createTablesQuery = `
    DROP TABLE IF EXISTS saved_cars;
    DROP TABLE IF EXISTS options;

    CREATE TABLE IF NOT EXISTS options (
        id SERIAL PRIMARY KEY,
        type VARCHAR(50) NOT NULL,
        name VARCHAR(100) NOT NULL,
        price INTEGER NOT NULL,
        image_url TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS saved_cars (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        exterior INTEGER REFERENCES options(id),
        interior INTEGER REFERENCES options(id),
        roof INTEGER REFERENCES options(id),
        wheels INTEGER REFERENCES options(id),
        total_price INTEGER NOT NULL
    );
`;

const seedOptions = async () => {
    try {
        for (const option of optionData) {
            const query = {
                text: 'INSERT INTO options (type, name, price, image_url) VALUES ($1, $2, $3, $4)',
                values: [option.type, option.name, option.price, option.image_url]
            };
            await pool.query(query);
        }
        console.log('All options from data/options.js seeded successfully!');
    } catch (err) {
        console.error('Error seeding options:', err);
        throw err; 
    }
};

const resetDatabase = async () => {
    try {
        //Create the tables
        await pool.query(createTablesQuery);
        console.log('Successfully created tables.');

        // Seed the data 
        await seedOptions();
        
        console.log('Successfully reset database and seeded options!');
    } catch (err) {
        console.error('Error resetting database:', err);
    } finally {
        await pool.end();
    }
};

resetDatabase();