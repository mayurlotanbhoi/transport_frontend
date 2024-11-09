import React, { useState, useEffect } from 'react';
import InputField from './InputField'; // Import your InputField component
import { GiModernCity } from 'react-icons/gi';

const SelectInput = ({ apiUrl, onSelect, option, setKey, className, searchingKey, label, optionIcon, icon, ...props }) => {
    const [query, setQuery] = useState(''); // Query typed by the user
    const [options, setOptions] = useState(option || []); // Available options
    const [filteredOptions, setFilteredOptions] = useState(option || []); // Filtered options to show in the dropdown
    const [selectedOption, setSelectedOption] = useState(null); // Selected value
    const [isDropdownOpen, setDropdownOpen] = useState(false); // Dropdown open state

    // Initialize options from props
    useEffect(() => {
        if (option && option.length > 0) {
            setOptions(option);
            setFilteredOptions(option); // Show all options initially
        }
    }, [option]);

    // Function to handle selecting an option from the dropdown
    const handleSelect = (option) => {
        setSelectedOption(option);
        setQuery(''); // Clear query when selected
        setFilteredOptions([]); // Clear dropdown after selection
        setDropdownOpen(false); // Close dropdown after selecting
        onSelect(setKey, option); // Trigger the callback on selection
    };

    // Function to handle search typing
    const handleSearch = (e) => {
        const searchQuery = e.target.value;
        setQuery(searchQuery);
        setSelectedOption(''); // Clear selected option if typing starts

        // Filter options based on the search query (case-insensitive)
        const filtered = options.filter((opt) =>
            opt.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setFilteredOptions(filtered); // Update the filtered options list
        // setDropdownOpen(false);
    };

    // Open dropdown on focus
    const handleFocus = () => {
        setDropdownOpen(true);
    };

    // Close dropdown on blur (when input loses focus)
    const handleBlur = () => {
        setTimeout(() => {
            setDropdownOpen(false);
        }, 150); // Small delay to allow click event to register before closing
    };

    return (
        <div className="col-span-1">
            <div className="relative">
                <InputField
                    value={selectedOption ? selectedOption : query} // Show selected or typed value
                    onChange={(e) => handleSearch(e)}
                    placeholder="Search..."
                    className={`w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus-visible:shadow-none 
                 ${query ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500 " : " border-stroke focus:border-green-500 dark:focus:border-green-500 "} 
                   dark:border-form-strokedark dark:bg-form-input dark:text-white `}
                    label={label}
                    icon={icon}
                    onFocus={handleFocus} // Open dropdown on focus
                    // onBlur={handleBlur} // Close dropdown on blur
                    errorSms={!selectedOption && <p className="text-red-500 text-xs mt-1 ">Select the {label}</p>}
                    {...props}
                />

                {isDropdownOpen && filteredOptions.length > 0 && (
                    <ul className="absolute z-10 w-full mt-2 max-h-[500px] overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg">
                        {filteredOptions.map((option) => (
                            <li
                                key={option}
                                className="flex p-2 cursor-pointer text-black hover:bg-black hover:text-white"
                                onClick={() => handleSelect(option)}
                            >
                                {optionIcon} {option}
                            </li>
                        ))}
                    </ul>
                )}

                {selectedOption && (
                    <div className="mt-2 text-gray-600">
                        Selected: {selectedOption}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SelectInput;
