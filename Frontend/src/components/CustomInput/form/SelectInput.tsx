import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';

import { Option } from '@/constants/forms';

interface SelectInputProps {
  name: string;
  label: string;
  value: string;
  onChange: (...event: any[]) => void;
  errorMessage: string | undefined;
  helperText: string | undefined;
  options: Option[];
  disabled: boolean;
}

export const SelectInput = ({
  name,
  label,
  value,
  onChange,
  errorMessage,
  helperText,
  options,
  disabled,
}: SelectInputProps) => (
  <FormControl>
    <InputLabel>{label}</InputLabel>
    <Select
      id={name}
      label={label}
      value={value}
      onChange={(e: SelectChangeEvent) => {
        const event = {
          target: {
            name: name,
            value: e.target.value,
          },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }}
      disabled={disabled}
    >
      {options.map((option) => (
        <MenuItem
          key={`option-${option.value}`}
          value={option.value}
          selected={value === option.value}
        >
          {option.label}
        </MenuItem>
      ))}
    </Select>
    <FormHelperText error={Boolean(errorMessage)}>
      {errorMessage || helperText}
    </FormHelperText>
  </FormControl>
);
