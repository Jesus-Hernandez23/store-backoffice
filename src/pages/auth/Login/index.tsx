//control
import { Link } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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
import { Input, Password, CheckBox } from '@/shareds/control';
import LoginSchema, { LoginSchemaType } from '@/utils/validator/login';
import { usePostApiIdentityAdminSignIn } from '@/api/task/identity/identity';
import { triggerError } from '@/utils/tools/message';

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
  const methods = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const { handleLogin } = useLogin();
  const { isLoading, mutateAsync } = usePostApiIdentityAdminSignIn();

  const enviarForm = async (data: LoginSchemaType) => {
    try {
      const result = await mutateAsync({ data });
      console.log('🚀 ~ file: index.tsx:52 ~ enviarForm ~ result:', result);
      handleLogin(result.data);
    } catch (error: any) {
      triggerError(error?.response?.data?.error?.message || 'Error al iniciar sesión');
    }
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
                  name='Email'
                  label='Correo electrónico'
                  startAdornment={<EmailIcon fontSize='small' color='secondary' />}
                />

                <Password
                  required
                  type='password'
                  name='Password'
                  label='Contraseña'
                  startAdornment={<LockIcon fontSize='small' color='secondary' />}
                />

                <Box display='flex' alignItems='center' justifyContent='space-between'>
                  <CheckBox name='Remember' label='Recordarme' />
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
