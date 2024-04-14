import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';

import { Option } from '@/constants/forms';

interface RadioInputProps {
  name: string;
  label: string;
  value: string;
  onChange: (...event: any[]) => void;
  errorMessage: string | undefined;
  helperText: string | undefined;
  options: Option[];
  disabled: boolean;
}

export const RadioInput = ({
  name,
  label,
  value,
  onChange,
  errorMessage,
  helperText,
  options,
  disabled,
}: RadioInputProps) => {
  return (
    <FormControl>
      <FormLabel id={name}>{label}</FormLabel>
      <RadioGroup
        name={name}
        value={value}
        onChange={onChange}
        row
      >
        {options.map((option) => {
          return (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio size="small" />}
              label={option.label}
              disabled={disabled}
              checked={value === option.value}
            />
          );
        })}
      </RadioGroup>
      <FormHelperText error={Boolean(errorMessage)}>
        {errorMessage || helperText}
      </FormHelperText>
    </FormControl>
  );
};
