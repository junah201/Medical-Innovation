import { InputAdornment, FormControl } from '@mui/material';
import { DateField } from '@mui/x-date-pickers/DateField';
import dayjs from 'dayjs';

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
    <FormControl>
      <DateField
        id={name}
        label={label}
        value={dayjs(value)}
        disabled={disabled}
        onChange={(newValue) =>
          onChange(newValue?.format('YYYY-MM-DD'))
        }
        fullWidth
        helperText={errorMessage || helperText}
        variant="outlined"
        size="medium"
        format="YYYY-MM-DD"
        inputProps={{ max: '9999-12-31' }}
        InputProps={{
          error: Boolean(errorMessage),
          startAdornment: (
            <InputAdornment position="start"></InputAdornment>
          ),
        }}
      />
    </FormControl>
  );
};
