import React from "react";
import { ClassNamesConfig } from "react-select";
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
  placeholder?: string;
  isCreatable?: boolean;
  onChange?: (selectedValue: string | null) => void;
  onCreateOption?: (newOption: string) => void;
  createOptionPosition?: "first" | "last";
};

const classNamesStyled: ClassNamesConfig<StyledSelectOption, false, any> = {
  control: () =>
    "h-8 !rounded-md  border-red-300 !border-neutral-200 !focused:border-neutral-500 !focused:ring-neutral-500 dark:bg-neutral-900 dark:!text-neutral-50 dark:!border-neutral-600",
  input: () => "text-base sm:text-base dark:text-neutral-200",
  singleValue: () => "dark:text-neutral-50",
  placeholder: () => "dark:text-neutral-500",
  menu: () => "dark:text-neutral-50 dark:!bg-neutral-800",
  option: (state) =>
    state.isFocused
      ? "dark:text-neutral-50 !bg-neutral-200 dark:!bg-neutral-600 !text-black"
      : state.isSelected
        ? "!bg-neutral-500 hover:!bg-neutral-600"
        : "dark:!bg-neutral-800",
  menuPortal: () => "dark:text-neutral-50 dark:!bg-neutral-800",
};

const StyledSelect: React.FC<StyledSelectProps> = ({
  options,
  value,
  placeholder = "Выбрать...",
  isCreatable = true,
  onChange,
  onCreateOption,
  createOptionPosition = "last",
  ...rest
}) => {
  return (
    <CreatableSelect
      options={options}
      value={options.find((option) => option.value === value?.value) || null}
      isSearchable
      isClearable={isCreatable}
      placeholder={placeholder}
      onChange={(selectedOption) => onChange?.(selectedOption?.value || null)}
      onCreateOption={onCreateOption}
      styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
      classNames={classNamesStyled}
      formatCreateLabel={(value) => `Создать '${value}'`}
      createOptionPosition={createOptionPosition}
      blurInputOnSelect
      menuPlacement="auto"
      // styles={{
      //   control: (base) => ({ ...base, zIndex: 90 }),
      //   menuPortal: (base) => ({ ...base, zIndex: 100 }),

      //   menu: (base) => ({ ...base, zIndex: 9999 }),
      // }}
      // menuPortalTarget={document.body}
      // menuPosition="fixed"
      // menuShouldScrollIntoView={false}
      // captureMenuScroll
      {...rest}
    />
  );
};

export default StyledSelect;
