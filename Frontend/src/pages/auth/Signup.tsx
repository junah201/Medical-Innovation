import {
  Box,
  Button,
  Grid,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

import { signup } from '@/api/auth';
import SignupForm from '@/components/forms/SignupForm';
import { ROUTE } from '@/constants';
import { RegisterField } from '@/constants/forms';
import { useCustomMutation } from '@/libs/Query';
export const Signup = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterField, any>();

  const { mutate, isLoading } = useCustomMutation(signup, {
    onSuccess: () => {
      navigate(ROUTE.LOGIN);
    },
    SuccessMessage: '회원가입에 성공하였습니다.',
    ErrorMessage: '회원가입에 실패하였습니다.',
  });

  return (
    <Box>
      <Box
        sx={{ backgroundColor: '#ffffff', padding: '30px' }}
        flexDirection={'column'}
        width="410px"
      >
        <Typography
          variant="h1"
          fontWeight="bold"
          textAlign="center"
        >
          회원가입
        </Typography>
        <form
          onSubmit={handleSubmit(
            (userInput: RegisterField) => mutate(userInput)
          )}
        >
          <Grid container spacing={2}>
            <SignupForm control={control} />
          </Grid>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isSubmitting || isLoading}
            color={
              !Object.keys(errors)[0]
                ? 'primary'
                : 'secondary'
            }
            sx={{
              color: '#ffffff',
              marginTop: '10px',
              borderRadius: '5px',
              fontSize: '20px',
            }}
          >
            회원가입
          </Button>
          <Hr />
          <Typography textAlign="center">
            이미 계정이 있으신가요? &nbsp;
            <Link to={ROUTE.LOGIN}>로그인</Link>
          </Typography>
        </form>
      </Box>
    </Box>
  );
};

const Hr = styled.div`
  border-bottom: solid 1px rgba(122, 122, 122, 0.5);
  margin: 25px 0 15px 0;
  width: 100%;
`;
