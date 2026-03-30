export const calculateTotal = (selectedOptions, allOptions) => {
    const basePrice = 40000;
    
    // Sum up the prices  
    const additionalPrice = Object.values(selectedOptions).reduce((acc, optionId) => {
        const option = allOptions.find(opt => opt.id === parseInt(optionId));
        return acc + (option ? option.price : 0);
    }, 0);
    
    return basePrice + additionalPrice;
};

export const validateSelection = (selected, allOptions) => {
    //finds the name of a selected option by its ID
    const getOptionName = (type) => {
        const option = allOptions.find(opt => opt.id === parseInt(selected[type]));
        return option ? option.name : '';
    };

    const currentRoof = getOptionName('roof');
    const currentWheels = getOptionName('wheels');

    if (currentRoof === 'Carbon Fiber' && currentWheels !== 'Visible Carbon') {
        return "The Carbon Fiber roof can only be paired with Visible Carbon wheels.";
    }

    const currentExterior = getOptionName('exterior');
    const currentInterior = getOptionName('interior');
    
    if (currentExterior === 'Midnight Blue' && currentInterior === 'Red') {
        return "The Red interior is not available with the Midnight Blue exterior color scheme.";
    }

    return null; // Return null if no impossible combinations are found 
};