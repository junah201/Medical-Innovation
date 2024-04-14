import { InputAdornment, TextField, Tooltip } from '@mui/material';

interface NumberInputProps {
  name: string;
  label: string;
  value: string;
  onChange: (...event: any[]) => void;
  placeholader: string;
  errorMessage: string | undefined;
  helperText: string | undefined;
  disabled: boolean;
}

export const NumberInput = ({
  name,
  label,
  value,
  onChange,
  placeholader,
  errorMessage,
  helperText,
  disabled,
}: NumberInputProps) => {
  return (
    <Tooltip
      title="숫자만 입력 가능합니다."
      placement="top-start"
    >
      <TextField
        id={name}
        label={label}
        value={value}
        onChange={onChange}
        placeholder={placeholader}
        fullWidth
        type="number"
        disabled={disabled}
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
    </Tooltip>
  );
};
