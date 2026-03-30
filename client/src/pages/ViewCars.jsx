import React, { useState, useEffect } from 'react'
import { fetchSavedCars } from '../services/CarsAPI'
import '../App.css'

const ViewCars = () => {
    const [cars, setCars] = useState([])

    useEffect(() => {
        const getCars = async () => {
            const data = await fetchSavedCars()
            setCars(data)
        }
        getCars()
    }, [])

    return (
        <div className="view-cars-container">
            <h2>My Cars</h2>
            <div className="cars-grid">
                {cars.length > 0 ? cars.map(car => (
                    <div key={car.id} className="car-card">
                        <h3>{car.name}</h3>
                        <p>Total: ${car.total_price}</p>
                        <div className="card-actions">
                            <a href={`/customcars/${car.id}`}>Details</a>
                            <a href={`/edit/${car.id}`}>Edit</a>
                        </div>
                    </div>
                )) : <p>No cars created yet. Go build one!</p>}
            </div>
        </div>
    )
}

export default ViewCars