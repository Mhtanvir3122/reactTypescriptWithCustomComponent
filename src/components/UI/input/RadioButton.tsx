import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface RadioButtonComponentProps {
    register: UseFormRegister<any>; // Register function from react-hook-form
    name: string; // Name of the radio group (this will group the radio buttons)
    value: string; // The value of this particular radio button
    label: string; // The label to display next to the radio button
}

const RadioButtonComponent: React.FC<RadioButtonComponentProps> = ({ register, name, value, label }) => {
    return (
        <div>
            <label className='d-flex gap-2 align-items-center'>
                <input
                    type="radio"
                    value={value}
                    {...register(name)} // Register the radio button with react-hook-form
                />
                {label}
            </label>
        </div>
    );
};

export default RadioButtonComponent;
