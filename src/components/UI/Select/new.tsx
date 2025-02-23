import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
interface AutocompleteProps {
  setValue?:any;
  options?:any;
  onChange?:any
  defaultValue?:any // Preload selected defaultValues

}

const SearchableSelect = ({ setValue, options, onChange,defaultValue }:AutocompleteProps) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  
  const handleChange = (selected:any) => {
    setSelectedOptions(selected);
    setValue('roles',selected)
    
    };
    useEffect(() => {
  
      setSelectedOptions(defaultValue)
    }, [defaultValue]);
    




  return (
    <Select
      options={options.map((item:any) => ({
        value: item.id,
        label: item.name
    }))}
      // onChange={onChange}
      isClearable
      isSearchable
      placeholder="Select an option..."
      isMulti
      value={selectedOptions}
      onChange={handleChange}

    />
  );
};

export default SearchableSelect;
