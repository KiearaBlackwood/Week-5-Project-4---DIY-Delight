import { pool } from '../config/database.js';

export const getOptions = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM options');
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

export const createCar = async (req, res) => {
    const { name, exterior, interior, roof, wheels, total_price } = req.body;
    try {
        const results = await pool.query(
            'INSERT INTO saved_cars (name, exterior, interior, roof, wheels, total_price) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
            [name, exterior, interior, roof, wheels, total_price]
        );
        res.status(201).json(results.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

export const getSavedCars = async (req, res) => {
    try {
        const query = `
            SELECT s.*, 
            e.name as ext_name, i.name as int_name, r.name as roof_name, w.name as wheel_name
            FROM saved_cars s
            LEFT JOIN options e ON s.exterior = e.id
            LEFT JOIN options i ON s.interior = i.id
            LEFT JOIN options r ON s.roof = r.id
            LEFT JOIN options w ON s.wheels = w.id
        `;
        const results = await pool.query(query);
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

export const updateCar = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { name, exterior, interior, roof, wheels, total_price } = req.body;
        
        const results = await pool.query(
            `UPDATE saved_cars 
             SET name = $1, exterior = $2, interior = $3, roof = $4, wheels = $5, total_price = $6 
             WHERE id = $7 RETURNING *`,
            [name, exterior, interior, roof, wheels, total_price, id]
        );
        
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

export const deleteCar = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await pool.query('DELETE FROM saved_cars WHERE id = $1', [id]);
        res.status(200).json({ message: 'Car deleted successfully' });
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};