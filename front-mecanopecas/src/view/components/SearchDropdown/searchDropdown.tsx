import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const SearchDropdown = ({ placeholder, searchHook, onSelect, initialValue }: { placeholder: string, searchHook: (query: string) => any, onSelect: (selected: any) => void, initialValue: string }) => {
    const [inputValue, setInputValue] = useState('');
    const [selectedOption, setSelectedOption] = useState<{ value: string, label: string } | null>(null);
    const { data, isLoading } = searchHook(inputValue);

    useEffect(() => {
        if (initialValue) {
            setSelectedOption({ value: initialValue, label: initialValue });
        }
    }, [initialValue]);

    const options = data?.data.map((item: any) => ({
        value: item,
        label: item,
    })) || [];

    return (
        <Select
            placeholder={placeholder}
            inputValue={inputValue}
            onInputChange={(value: string) => setInputValue(value)}
            options={options}
            isLoading={isLoading}
            noOptionsMessage={() => inputValue.length < 3 ? 'Digite ao menos 3 caracteres' : 'Nenhuma opção encontrada'}
            onChange={(selectedOption: any) => {
                setSelectedOption(selectedOption);
                onSelect(selectedOption.value);
            }}
            value={selectedOption}
        />
    );
};

export default SearchDropdown;
