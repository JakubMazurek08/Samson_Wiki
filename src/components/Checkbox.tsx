import { useState } from 'react';

export const Checkbox = ({ label, register, name }) => {
    const [isChecked, setIsChecked] = useState(true);

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    return (
        <div className="flex items-center">
            <input
                type="checkbox"
                {...register(name)}
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="hidden"
            />
            <div
                onClick={() => setIsChecked(!isChecked)}
                className={`relative w-7 h-7 ml-4 mt-3 mr-2 flex items-center justify-center border- rounded-lg cursor-pointer transition-colors duration-300 ${
                    isChecked ? 'bg-primary-very-light' : 'bg-white'
                }`}
            >
                {isChecked && (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-white transition-opacity duration-300"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            d="M5 10l3 3L15 7"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                )}
            </div>
            <label className="ml-3 text-white cursor-pointer mt-2.5 text-xl">{label}</label>
        </div>
    );
};