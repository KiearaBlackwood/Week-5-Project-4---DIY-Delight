import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom' 
import { fetchOptions, saveCar } from '../services/CarsAPI'
import { calculateTotal, validateSelection } from '../utilities/calcPrice'
import '../App.css'

const CreateCar = () => {
    const navigate = useNavigate()
    const [options, setOptions] = useState([])
    const [selected, setSelected] = useState({
        name: '',
        exterior: '',
        interior: '',
        roof: '',
        wheels: ''
    })

    useEffect(() => {
        const getOptionsData = async () => {
            const data = await fetchOptions()
            setOptions(data)
            if (data.length > 0) {
                setSelected(prev => ({
                    ...prev,
                    exterior: data.find(opt => opt.type === 'exterior')?.id || '',
                    interior: data.find(opt => opt.type === 'interior')?.id || '',
                    roof: data.find(opt => opt.type === 'roof')?.id || '',
                    wheels: data.find(opt => opt.type === 'wheels')?.id || ''
                }))
            }
        }
        getOptionsData()
    }, [])

    const getSelectedOption = (type) => options.find(opt => opt.id === selected[type])

    const handleChange = (e) => {
        const { name, value } = e.target
        setSelected(prev => ({ ...prev, [name]: parseInt(value) }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const error = validateSelection(selected, options)
        if (error) {
            alert(error)
            return
        }
        const totalPrice = calculateTotal(selected, options)
        await saveCar({ ...selected, total_price: totalPrice })
        navigate('/customcars') 
    }

    // gets color based on selection
    const getCarColor = () => {
        const name = getSelectedOption('exterior')?.name
        if (name === 'Midnight Blue') return '#191970'
        if (name === 'Silver Metallic') return '#C0C0C0'
        if (name === 'Black') return '#222222'
        return '#F0F8FF' 
    }

    return (
        <div className="create-car-container">
            <h2>Customize Your Ride</h2>
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

                <form onSubmit={handleSubmit} className="options-form">
                    <div className="input-section">
                        <label>Project Name</label>
                        <input 
                            type="text" 
                            placeholder="My Dream Car"
                            value={selected.name} 
                            onChange={(e) => setSelected({...selected, name: e.target.value})} 
                            required 
                        />
                    </div>
                    {['exterior', 'roof', 'wheels', 'interior'].map(type => (
                        <div key={type} className="option-group">
                            <label>{type.toUpperCase()}</label>
                            <select name={type} value={selected[type]} onChange={handleChange}>
                                {options.filter(opt => opt.type === type).map(opt => (
                                    <option key={opt.id} value={opt.id}>
                                        {opt.name} (+${opt.price})
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}
                    <div className="price-display">
                        <h3>Total Price: ${calculateTotal(selected, options)}</h3>
                    </div>
                    <button type="submit" className="save-btn">Save Selection</button>
                </form>
            </div>
        </div>
    )
}

export default CreateCar