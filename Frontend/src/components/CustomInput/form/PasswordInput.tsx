import { InputAdornment, TextField } from '@mui/material';

interface PasswordInputProps {
  name: string;
  label: string;
  value: string;
  onChange: (...event: any[]) => void;
  placeholder: string;
  errorMessage: string | undefined;
  helperText: string | undefined;
  disabled: boolean;
}

export const PasswordInput = ({
  name,
  label,
  value,
  onChange,
  placeholder,
  errorMessage,
  helperText,
  disabled,
}: PasswordInputProps) => {
  return (
    <TextField
      id={name}
      label={label}
      type="password"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      fullWidth
      error={Boolean(errorMessage)}
      helperText={errorMessage || helperText}
      variant="outlined"
      size="medium"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start"></InputAdornment>
        ),
      }}
    />
  );
};
