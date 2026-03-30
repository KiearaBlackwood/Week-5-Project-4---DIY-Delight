import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchSavedCars, deleteCar } from '../services/CarsAPI'
import '../App.css'

const CarDetails = () => {
    const { id } = useParams()
    const [car, setCar] = useState(null)

    useEffect(() => {
        const getCar = async () => {
            const allCars = await fetchSavedCars()
            const foundCar = allCars.find(c => c.id === parseInt(id))
            setCar(foundCar)
        }
        getCar()
    }, [id])

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this car?")) {
            await deleteCar(id)
            window.location = '/customcars'
        }
    }

    if (!car) return <p>Loading car details...</p>

    return (
        <div className="details-container">
            <h2>{car.name}</h2>
            <div className="details-content">
                <ul>
                    <li><strong>Exterior:</strong> {car.ext_name}</li>
                    <li><strong>Interior:</strong> {car.int_name}</li>
                    <li><strong>Roof:</strong> {car.roof_name}</li>
                    <li><strong>Wheels:</strong> {car.wheel_name}</li>
                    <li><strong>Total Price:</strong> ${car.total_price}</li>
                </ul>
                <button onClick={handleDelete} className="delete-btn">Delete Car</button>
            </div>
        </div>
    )
}

export default CarDetails