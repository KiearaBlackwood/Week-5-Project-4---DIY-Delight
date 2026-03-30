import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchOptions, fetchSavedCars, updateCar } from '../services/CarsAPI'
import { calculateTotal, validateSelection } from '../utilities/calcPrice'
import '../App.css'

const EditCar = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [options, setOptions] = useState([])
    const [selected, setSelected] = useState(null)

    useEffect(() => {
        const loadData = async () => {
            const optData = await fetchOptions()
            const allCars = await fetchSavedCars()
            const currentCar = allCars.find(c => c.id === parseInt(id))
            setOptions(optData)
            setSelected(currentCar)
        }
        loadData()
    }, [id])

    const getSelectedOption = (type) => options.find(opt => opt.id === parseInt(selected[type]))

    const handleChange = (e) => {
        const { name, value } = e.target
        setSelected(prev => ({ ...prev, [name]: name === 'name' ? value : parseInt(value) }))
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        const error = validateSelection(selected, options)
        if (error) {
            alert(error)
            return
        }
        const totalPrice = calculateTotal(selected, options)
        await updateCar(id, { ...selected, total_price: totalPrice })
        navigate(`/customcars/${id}`)
    }

    const getCarColor = () => {
        const name = getSelectedOption('exterior')?.name
        if (name === 'Midnight Blue') return '#191970'
        if (name === 'Silver Metallic') return '#C0C0C0'
        if (name === 'Black') return '#222222'
        return '#F0F8FF'
    }

    if (!selected) return <div className="loading"><p>Loading car data...</p></div>

    return (
        <div className="create-car-container">
            <h2>Update Your Creation: {selected.name}</h2>
            <div className="customizer-main">
                <section className="preview-section">
                    <div className="car-visual-wrapper">
                        <svg viewBox="0 0 600 300" className="car-svg">
                            <path 
                                d="M50,200 C50,150 150,100 300,100 C450,100 550,150 550,200 L550,240 L50,240 Z" 
                                fill={getCarColor()} 
                                stroke="#111" 
                                strokeWidth="4"
                            />
                            <circle cx="150" cy="240" r="45" fill="#333" stroke="#eee" strokeWidth="2" />
                            <circle cx="450" cy="240" r="45" fill="#333" stroke="#eee" strokeWidth="2" />
                            <rect x="300" y="115" width="100" height="40" fill="#add8e6" opacity="0.6" />
                        </svg>
                    </div>
                </section>

                <form onSubmit={handleUpdate} className="options-form">
                    <div className="input-section">
                        <label>Project Name</label>
                        <input type="text" name="name" value={selected.name} onChange={handleChange} required />
                    </div>
                    {['exterior', 'roof', 'wheels', 'interior'].map(type => (
                        <div key={type} className="option-group">
                            <label>{type.toUpperCase()}</label>
                            <select name={type} value={selected[type]} onChange={handleChange}>
                                {options.filter(opt => opt.type === type).map(opt => (
                                    <option key={opt.id} value={opt.id}>{opt.name}</option>
                                ))}
                            </select>
                        </div>
                    ))}
                    <div className="price-display">
                        <h3>New Total Price: ${calculateTotal(selected, options)}</h3>
                    </div>
                    <div className="button-group">
                        <button type="submit" className="save-btn">Update Car</button>
                        <button type="button" className="cancel-btn" onClick={() => navigate(-1)}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditCar