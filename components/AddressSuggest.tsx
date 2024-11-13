"use client";

import React, { forwardRef, useState } from "react";
import { UseControllerProps, useController } from "react-hook-form";
import { Input } from "./ui/input";
import { Command, CommandEmpty, CommandItem, CommandList } from "./ui/command";
import { useDebouncedCallback } from "use-debounce";

const AddressSuggest = forwardRef<HTMLInputElement, UseControllerProps>(
  ({ name, control }, ref) => {
    const { field } = useController({ name, control });
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState(field.value || "");

    const yandexGeosuggestAPIKey =
      process.env.NEXT_PUBLIC_YANDEX_GEOSUGGEST_KEY;

    const fetchSuggestions = useDebouncedCallback(async (query: string) => {
      if (query.length === 0) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await fetch(
          `https://suggest-maps.yandex.ru/v1/suggest?apikey=${yandexGeosuggestAPIKey}&text=${query}&lang=ru&results=5&types=country,province,locality,street,house,&attrs=uri`,
        );
        const data = await response.json();

        const suggestion =
          data.results?.map((result: any) =>
            result.subtitle
              ? result.subtitle.text + ", " + result.title.text
              : result.title.text,
          ) ?? [];

        setSuggestions(suggestion); // Assuming the API returns an array of suggestions under 'results'
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    }, 300);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setInputValue(value);
      fetchSuggestions(value);
      field.onChange(value); // Update the form value
    };

    const handleSuggestionClick = (suggestion: string) => {
      setInputValue(suggestion);
      setSuggestions([]);
      field.onChange(suggestion); // Update the form value
    };

    return (
      <div>
        <Input
          ref={ref}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Введите адрес..."
        />
        <Command>
          {suggestions.length > 0 && (
            <CommandList>
              <CommandEmpty>Нет результатов.</CommandEmpty>
              {suggestions.map((suggestion, index) => (
                <CommandItem key={index}>
                  <span className='w-full' onClick={() => handleSuggestionClick(suggestion)}>
                    {suggestion}
                  </span>
                </CommandItem>
              ))}
            </CommandList>
          )}
        </Command>
      </div>
    );
  },
);

AddressSuggest.displayName = "AddressSuggest";

export default AddressSuggest;
