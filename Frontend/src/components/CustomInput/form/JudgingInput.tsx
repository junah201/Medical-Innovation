import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';

import { Option } from '@/constants/forms';

interface JudgingInputProps {
  name: string;
  label: string;
  value: string;
  onChange: (...event: any[]) => void;
  errorMessage: string | undefined;
  helperText: string | undefined;
  options: Option[];
  disabled: boolean;
}

export const JudgingInput = ({
  name,
  label,
  value,
  onChange,
  errorMessage,
  helperText,
  options,
  disabled,
}: JudgingInputProps) => {
  return (
    <FormControl
      sx={{
        borderColor: 'primary.light',
        borderRadius: '5px',
        border: '1px solid',
        padding: '10px',
      }}
    >
      <FormLabel id={name}>{label}</FormLabel>
      <FormHelperText error={Boolean(errorMessage)}>
        {errorMessage || helperText}
      </FormHelperText>
      <RadioGroup
        name={name}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => {
          return (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio size="small" />}
              label={option.label}
              disabled={disabled}
              checked={value == option.value}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};
