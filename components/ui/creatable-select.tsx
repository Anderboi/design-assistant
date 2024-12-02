import React from "react";
import CreatableSelect, { CreatableProps } from "react-select/creatable";

interface StyledSelectOption {
  label: string;
  value: string;
}

type StyledSelectProps = Omit<
  CreatableProps<StyledSelectOption, false, any>,
  "onChange" | "value" | "options"
> & {
  options: StyledSelectOption[];
  value?: StyledSelectOption | null;
  onChange?: (selectedValue: string | null) => void;
  onCreateOption?: (newOption: string) => void;
};

const StyledSelect: React.FC<StyledSelectProps> = ({
  options,
  value,
  onChange,
  onCreateOption,
  ...rest
}) => {
  return (
    <CreatableSelect
      options={options}
      value={value}
      isSearchable
      placeholder="Выбрать..."
      onChange={(selectedOption) => onChange?.(selectedOption?.value || null)}
      onCreateOption={onCreateOption}
      classNames={{
        control: (state) =>
          `h-8 !rounded-md border-red-300 !border-neutral-200 !focused:border-neutral-500
           !focused:ring-neutral-500 dark:bg-neutral-900 
           dark:!text-neutral-50 dark:!border-neutral-600`,
        input: () => "text-base sm:text-base dark:text-neutral-200",
        singleValue: () => " dark:text-neutral-50",
        placeholder: () => " dark:text-neutral-500",
        menu: () => " dark:text-neutral-50 dark:!bg-neutral-800",
        option: (state) =>
          state.isFocused
            ? " dark:text-neutral-50 !bg-neutral-200 dark:!bg-neutral-600 !text-black"
            : state.isSelected
              ? "!bg-neutral-500 hover:!bg-neutral-600"
              : "dark:!bg-neutral-800",
        menuPortal: () => " dark:text-neutral-50 dark:!bg-neutral-800",
      }}
      formatCreateLabel={(value) => `Создать '${value}'`}
      createOptionPosition="last"
      blurInputOnSelect
      {...rest}
    />
  );
};

export default StyledSelect;
