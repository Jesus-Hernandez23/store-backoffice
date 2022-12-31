import React from 'react';

//control
import { Link } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

//mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

//Icons
import LoginIcon from '@mui/icons-material/Login';
import LockIcon from '@mui/icons-material/LockTwoTone';
import EmailIcon from '@mui/icons-material/EmailOutlined';

//owned
import useLogin from './useLogin';
import apiAuth from '@/api/tasks/ApiIdentity';
import { Input, Password, CheckBox } from '@/common/control';
import loginSchema, { ILoginValues } from '@/utils/validator/login';
import { postApiIdentityAdminSignIn, postApiIdentityClientSignIn } from '@/api/v2/api';
import { useMutation } from '@tanstack/react-query';

const CustomizedCardHeader = styled(CardHeader)`
  flex-direction: row-reverse;
  .MuiCardHeader-avatar {
    margin-right: 0;
  }
  .MuiCardHeader-title {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
`;

const Login = ({ isExpired = false }) => {
  //control form
  const methods = useForm<ILoginValues>({
    resolver: yupResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: ILoginValues) => {
      return postApiIdentityAdminSignIn({
        Email: data.email,
        Password: data.password,
      });
    },
  });

  const { isLoading, mutate } = apiAuth.Authenticate();
  const { handleLogin } = useLogin();

  const enviarForm = (data: ILoginValues) => {
    postApiIdentityAdminSignIn({
      Email: data.email,
      Password: data.password,
    }).then((res) => {
      console.log('🚀 ~ file: index.tsx ~ line 53 ~ postApiIdentityAdminSignIn ~ res', res);
      //handleLogin(res);
    });

    /*mutate(
      { ...data },
      {
        onSuccess: ({ data }) => {
          handleLogin(data);
        },
      },
    );*/
  };

  return (
    <Box width='25rem'>
      <Card>
        <CustomizedCardHeader
          title='Inicia sesión'
          titleTypographyProps={{
            variant: 'h1',
            fontSize: '2rem',
          }}
          sx={{ p: 5, pb: 0 }}
          subheader='Para mantenernos en contacto.'
          avatar={
            <Box display='flex' flexDirection='column' alignItems='center'>
              <img src='/img/tienda.png' width={35} />
              <Typography variant='caption' color='GrayText'>
                Tienda San Jose
              </Typography>
            </Box>
          }
        />
        <CardContent sx={{ p: 5, pt: 1 }}>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(enviarForm)}>
              <Stack direction='column' spacing={3} pt={2}>
                <Input
                  required
                  type='text'
                  name='email'
                  label='Correo electrónico'
                  startAdornment={<EmailIcon fontSize='small' color='secondary' />}
                />

                <Password
                  required
                  type='password'
                  name='password'
                  label='Contraseña'
                  startAdornment={<LockIcon fontSize='small' color='secondary' />}
                />

                <Box display='flex' alignItems='center' justifyContent='space-between'>
                  <CheckBox name='remember' label='Recordarme' />
                  <Typography
                    component={Link}
                    to='/auth/reset-password'
                    variant='subtitle2'
                    color='initial'
                    textAlign='end'>
                    ¿Olvido su contraseña?
                  </Typography>
                </Box>

                <LoadingButton
                  type='submit'
                  size='large'
                  loading={isLoading}
                  loadingPosition='start'
                  startIcon={<LoginIcon />}
                  variant='contained'
                  fullWidth>
                  Ingresar
                </LoadingButton>
              </Stack>
            </form>
          </FormProvider>
          <Divider sx={{ my: 2 }} />
          <Typography variant='subtitle2' component='span' color='initial'>
            <Link to='/auth/sign-up'>Crear nueva cuenta</Link>.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
