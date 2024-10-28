import React, { useState } from 'react';

const TripCostCalculator = () => {
    const [distance, setDistance] = useState('');
    const [fuelCostPerUnit, setFuelCostPerUnit] = useState('');
    const [vehicleEfficiency, setVehicleEfficiency] = useState('');
    const [tolls, setTolls] = useState('');
    const [serviceFees, setServiceFees] = useState('');
    const [totalCost, setTotalCost] = useState(null);

    const handleCalculate = () => {
        const parsedDistance = parseFloat(distance) || 0;
        const parsedFuelCostPerUnit = parseFloat(fuelCostPerUnit) || 0;
        const parsedVehicleEfficiency = parseFloat(vehicleEfficiency) || 0;
        const parsedTolls = parseFloat(tolls) || 0;
        const parsedServiceFees = parseFloat(serviceFees) || 0;

        if (parsedDistance > 0 && parsedFuelCostPerUnit > 0 && parsedVehicleEfficiency > 0) {
            const fuelCost = (parsedDistance / parsedVehicleEfficiency) * parsedFuelCostPerUnit;
            const cost = fuelCost + parsedTolls + parsedServiceFees;
            setTotalCost(cost.toFixed(2));
        } else {
            setTotalCost("Please enter valid positive numbers.");
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Trip Cost Calculator</h2>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Distance (km):</label>
                    <input
                        type="number"
                        value={distance}
                        onChange={(e) => setDistance(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Enter distance in kilometers"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Cost per Unit (₹):</label>
                    <input
                        type="number"
                        value={fuelCostPerUnit}
                        onChange={(e) => setFuelCostPerUnit(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Enter fuel cost per liter"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Efficiency (km per liter):</label>
                    <input
                        type="number"
                        value={vehicleEfficiency}
                        onChange={(e) => setVehicleEfficiency(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Enter vehicle efficiency"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tolls (₹):</label>
                    <input
                        type="number"
                        value={tolls}
                        onChange={(e) => setTolls(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Enter toll charges"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Fees (₹):</label>
                    <input
                        type="number"
                        value={serviceFees}
                        onChange={(e) => setServiceFees(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Enter service fees"
                    />
                </div>

                <button
                    onClick={handleCalculate}
                    className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700"
                >
                    Calculate Total Cost
                </button>

                {totalCost !== null && (
                    <div className="mt-4 text-lg font-semibold text-center text-green-700">
                        {typeof totalCost === 'string' ? totalCost : `Total Trip Cost: ₹${totalCost}`}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TripCostCalculator;
