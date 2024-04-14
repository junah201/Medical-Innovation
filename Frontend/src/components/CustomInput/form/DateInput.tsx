import { TextField, InputAdornment } from '@mui/material';

interface DateInputProps {
  name: string;
  label: string;
  value: string;
  onChange: (...event: any[]) => void;
  errorMessage: string | undefined;
  helperText: string | undefined;
  disabled: boolean;
}

export const DateInput = ({
  name,
  label,
  value,
  onChange,
  errorMessage,
  helperText,
  disabled,
}: DateInputProps) => {
  return (
    <TextField
      id={name}
      label={label}
      type="date"
      value={value}
      disabled={disabled}
      onChange={onChange}
      fullWidth
      error={Boolean(errorMessage)}
      helperText={errorMessage || helperText}
      variant="outlined"
      size="medium"
      inputProps={{ max: '9999-12-31' }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start"></InputAdornment>
        ),
      }}
    />
  );
};
