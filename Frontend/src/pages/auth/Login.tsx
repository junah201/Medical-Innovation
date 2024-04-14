import {
  Box,
  Button,
  Grid,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

import { login } from '@/api/auth';
import LoginForm from '@/components/forms/LoginForm';
import { ROUTE, COOKIE } from '@/constants';
import { RegisterField } from '@/constants/forms';
import { setCookie } from '@/libs/Cookie';
import { useCustomMutation } from '@/libs/Query';

export const Login = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterField, any>();

  const { mutate, isLoading } = useCustomMutation(login, {
    SuccessMessage: '로그인에 성공하였습니다.',
    onSuccess: (res) => {
      setCookie(
        COOKIE.KEY.ACCESS_TOKEN,
        res.data.access_token,
        {
          expires: new Date(
            Date.now() + COOKIE.EXPIRE.ACCESS_TOKEN
          ),
        }
      );
      navigate(ROUTE.HOME);
    },
    ErrorMessage: '로그인에 실패하였습니다.',
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
          로그인
        </Typography>
        <form
          onSubmit={handleSubmit(
            (userInput: RegisterField) => mutate(userInput)
          )}
        >
          <Grid container spacing={2}>
            <LoginForm control={control} />
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
            로그인
          </Button>
          <Hr />
          <Typography textAlign="center">
            계정이 없으신가요? &nbsp;
            <Link to={ROUTE.SIGN_UP}>회원가입</Link>
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
