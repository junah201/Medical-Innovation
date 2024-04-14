import { SafetyOutlined } from '@ant-design/icons';
import { TextField, InputAdornment } from '@mui/material';

interface PhoneInputProps {
  id: RegisterTypes;
  register: RegisterForm;
  errorMessage: string | undefined | any;
  placeholder: string;
}

export const PasswordInput = ({
  id,
  register,
  errorMessage,
  placeholder,
}: PhoneInputProps) => {
  return (
    <TextField
      id={id}
      label="비밀번호"
      type="password"
      {...register(id)}
      placeholder={placeholder}
      disabled={false}
      fullWidth
      error={Boolean(errorMessage)}
      helperText={errorMessage || ''}
      variant="outlined"
      size="medium"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SafetyOutlined />
          </InputAdornment>
        ),
      }}
    />
  );
};
