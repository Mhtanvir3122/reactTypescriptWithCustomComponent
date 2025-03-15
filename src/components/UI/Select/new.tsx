// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import Select from "react-select";
// interface AutocompleteProps {
//   setValue?:any;
//   options?:any;
//   onChange?:any
//    defaultValue?:any // Preload selected defaultValues
//    isMulti?:boolean

// }

// const SearchableSelect = ({ setValue, options, onChange,defaultValue ,isMulti}:AutocompleteProps) => {
//   const [selectedOptions, setSelectedOptions] = useState([]);

  
//   const handleChange = (selected:any) => {
//     onChange(selected )
//     setSelectedOptions(selected);
//     setValue('roles',selected)
    
//     };
//     useEffect(() => {
  
//       setSelectedOptions(defaultValue)
//     }, [defaultValue]);
    




//   return (
//     <Select
//       options={options.map((item:any) => ({
//         value: item.id,
//         label: item.name
//     }))}
//       // onChange={onChange}
//       isClearable
//       isSearchable
//       placeholder="Select an option..."
//       isMulti={isMulti||false}
//       value={selectedOptions}
//       onChange={handleChange}

//     />
//   );
// };

// export default SearchableSelect;



import { on } from "node:stream";
import React, { useState, useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";
import Select from "react-select";


interface OptionType {
  value: string | number;
  label: string;
}

interface AutocompleteProps {
  setValue: UseFormSetValue<any>;
  options: { id: number | string; name: string }[];
  onChange?: (selected: any) => void;
  defaultValue?: any; // Preload selected default values
  isMulti?: boolean;
  fieldName: string; // Dynamic field name
  isReq?:boolean
  register?:any
  errors?:any
  label?:any
}

const SearchableSelect: React.FC<AutocompleteProps> = ({ 
  setValue, 
  options, 
  onChange, 
  defaultValue, 
  isMulti = false, 
  fieldName ,isReq,register,errors,label
}) => {
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);

  // Format the options correctly for react-select
  const formattedOptions = options.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  // Handle selection change
  const handleChange = (selected: any) => {
    setSelectedOptions(selected);
    setValue(fieldName, selected);
    if(onChange){
    onChange(selected);}
  };

  // Effect to update selected options when defaultValue changes
  useEffect(() => {
    if (defaultValue) {
      const formattedDefault = Array.isArray(defaultValue)
        ? defaultValue.map((item) => ({
            value: item.id || item.value, 
            label: item.name || item.label,
          }))
        : { value: defaultValue.id || defaultValue.value, label: defaultValue.name || defaultValue.label };

      setSelectedOptions(formattedDefault as OptionType[]);
    }
  }, [defaultValue]);

  return (<>

    <input
        type="hidden"
        {...(register && isReq? register(fieldName, { required: "This field is required" }) : {})}
      />
      <div >

      {label && (
        <h3 style={{ marginBottom: 12, color: "#36BA98" }}>
          {(label)} {isReq ? <span className="text-danger">*</span> : null}
        </h3>
      )}
      <Select
      options={formattedOptions}
      isClearable
      isSearchable
      placeholder="Select an option..."
      isMulti={isMulti}
      value={selectedOptions}
      onChange={handleChange}
    />
    {errors?.[fieldName] && <p style={{ color: "red", marginTop: 4 }}>{errors[fieldName]?.message}</p>}
    </div>

    </>
  );
};

export default SearchableSelect;

