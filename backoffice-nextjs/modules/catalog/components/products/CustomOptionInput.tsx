import { ProductVariation } from "@/modules/catalog/models/ProductVariation";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

type CustomInputProps = {
  defaultValue?: string;
  onChange?: (value: string[]) => void;
  productVariations?: ProductVariation[];
};

const CustomOptionInput: React.FC<CustomInputProps> = ({
  defaultValue,
  onChange,
  productVariations,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ";") {
      event.preventDefault();
      if (inputValue.trim()) {
        const newOptions = [...selectedOptions, inputValue.trim()];
        setSelectedOptions(newOptions);
        setInputValue("");

        if (onChange) {
          onChange(newOptions);
        }
      }
    }
  };

  const handleRemoveOption = (option: string) => {
    const optionExists = productVariations?.some((variation) =>
      Object.values(variation.optionValuesByOptionId).includes(option)
    );


    if (optionExists) {
      return toast.warning(`The option: ${option} is in use`);
    }

    const newOptions = selectedOptions.filter((item) => item !== option);
    setSelectedOptions(newOptions);

    if (onChange) {
      onChange(newOptions);
    }
  };

  useEffect(() => {
    if (defaultValue) {
      const parsedOptions = defaultValue
        .split(",")
        .map((option) => option.trim());
      setSelectedOptions(parsedOptions);
    }
  }, [defaultValue]);

  return (
    <div className="w-full border border-gray-300 rounded p-1 flex flex-wrap items-center">
      {selectedOptions.map((option) => (
        <Badge
          key={option}
          className="inline-flex items-center mr-1.5 p-1.5 cursor-default bg-green-600 h-8"
        >
          <span className="mr-2">{option}</span>
          <Badge
            className="cursor-pointer ml-1.5 p-1 bg-white text-black"
            onClick={() => handleRemoveOption(option)}
          >
            &times;
          </Badge>
        </Badge>
      ))}
      <Input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type and press ';' for select option value"
        className="flex-1 min-w-[150px] h-9"
        style={{
          border: "none",
          boxShadow: "none",
        }}
      />
    </div>
  );
};

export default CustomOptionInput;
