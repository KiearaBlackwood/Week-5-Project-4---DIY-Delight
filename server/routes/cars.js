import express from 'express';
import { getOptions, createCar, getSavedCars, deleteCar, updateCar } from '../controllers/cars.js';

const router = express.Router();

router.get('/options', getOptions);
router.get('/saved', getSavedCars);
router.post('/saved', createCar);
router.patch('/saved/:id', updateCar); 
router.delete('/saved/:id', deleteCar);

export default router;