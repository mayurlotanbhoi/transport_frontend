import React, { useState, useEffect } from 'react';
import InputField from './InputField'; // Import your InputField component
import { json } from 'react-router-dom';
import { GiModernCity } from 'react-icons/gi';

const SearchDropdown = ({ apiUrl, onSelect, setKey, className, searchingKey, label, optionIcon, icon, ...props }) => {
    const [query, setQuery] = useState('');
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(true);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        // Define a delay for the debounce (e.g., 300 ms)
        const delayDebounceFn = setTimeout(() => {
            if (query.length > 2) {
                const fetchOptions = async () => {
                    try {
                        setLoading(true);
                        const response = await fetch(`${apiUrl}?query=${query}`, {
                            method: "GET",
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        });

                        const data = await response.json();
                        setOptions(data?.data);
                    } catch (error) {
                        console.error('Error fetching options:', error);
                    } finally {
                        setLoading(false);
                    }
                };

                fetchOptions();
            } else {
                setOptions([]);
            }
        }, 300); // Delay in ms

        // Cleanup function to clear the timeout if query changes before the delay
        return () => clearTimeout(delayDebounceFn);


    }, [query]);

    const handleSelect = (option) => {
        setSelectedOption(option);
        setQuery('');
        setOptions([]);
        onSelect(setKey, option);
    };
    const handleSearch = (e) => {
        setQuery(e.target.value)
        setSelectedOption("");
    }

    return (
        <div className='col-span-1'>
            <div className="relative">
                <InputField
                    value={selectedOption?.[searchingKey] ? selectedOption?.[searchingKey] : query}
                    onChange={(e) => handleSearch(e)}
                    placeholder="Search..."
                    className={`w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus-visible:shadow-none 
  ${!selectedOption ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500 " : " border-stroke focus:border-green-500 dark:focus:border-green-500 "} 
  dark:border-form-strokedark dark:bg-form-input dark:text-white `}
                    label={label}
                    icon={icon}
                    {...props}
                    errorSms={!selectedOption && <p className="text-red-500 text-xs mt-1 ">Select the {label}</p>}

                />
                {isLoading &&
                    <ul className="absolute z-10 w-full mt-2 mx-h-[500px] overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg">
                        <li className="p-2 cursor-pointer text-black hover:bg-black hover:text-white">
                            Loading Citys...
                        </li>
                    </ul>}
                {options?.length > 0 && (
                    <ul className="absolute z-10 w-full mt-2 mx-h-[500px] overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg">
                        {options.map((option) => (
                            <li
                                key={option.id}
                                className="flex p-2 cursor-pointer text-black hover:bg-black hover:text-white"
                                onClick={() => handleSelect(option)}
                            >
                                {optionIcon}    {option?.[searchingKey]}
                            </li>
                        ))}
                    </ul>
                )}
                {selectedOption && (
                    <div className="mt-2  text-gray-600">
                        Selected: {selectedOption?.[searchingKey]}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchDropdown;
