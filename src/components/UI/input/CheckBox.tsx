import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface CheckboxComponentProps {
    register: UseFormRegister<any>; // Register function from react-hook-form
    name: string; // Name of the checkbox field
    initialChecked?: boolean; // Optional initial checked state
    lebel?:any
}

const CheckboxComponent: React.FC<CheckboxComponentProps> = ({ register, name, initialChecked = false ,lebel}) => {
    return (
        <div  style={{marginLeft:20}}>
            <label className='d-flex gap-2 align-items-center'>
                <input
                    style={{ height: 17, width: 17 }} type="checkbox"
                    {...register(name)} // Register the checkbox with react-hook-form
                    defaultChecked={initialChecked} // Set the initial checked state
                />
                {lebel||"Check"}
            </label>
        </div>
    );
};

export default CheckboxComponent;
