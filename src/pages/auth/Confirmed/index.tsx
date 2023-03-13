import { useState, useEffect } from 'react';

//control
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { usePostApiIdentityConfirmEmail } from '@/api/task/identity/identity';
import { triggerError } from '@/utils/tools/message';

interface IConfirmedProps {}

type EmailStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

const StatusMessage = {
  idle: 'Verificando correo...',
  loading: 'Verificando correo...',
  succeeded: '¡Tu correo ha sido verificado!',
  failed: 'Error al verificar correo',
};

const Confirmed: React.FC<IConfirmedProps> = ({}) => {
  //get the token  and email from the url
  const [searchParams] = useSearchParams();
  const Email = searchParams.get('email');
  const Token = searchParams.get('token');

  const mutation = usePostApiIdentityConfirmEmail();

  const [emailStatus, setEmailStatus] = useState<EmailStatusType>('idle');

  const confirmEmail = async () => {
    try {
      setEmailStatus('loading');
      const data = await mutation.mutateAsync({ data: { Email, Token } });
      console.log('🚀 ~ file: index.tsx:34 ~ confirmEmail ~ data:', data);
      setEmailStatus('succeeded');
    } catch (error: any) {
      triggerError(error?.response?.data?.error?.message || 'Error al verificar correo');
    }
  };

  useEffect(() => {
    confirmEmail();
  }, [Email, Token]);

  return (
    <Box width={350}>
      <Card>
        <CardContent sx={{ p: 6 }}>
          <Stack spacing={2}>
            <Stack spacing={2} alignItems='center'>
              <Box display='flex' flexDirection='column' alignItems='center'>
                <img src='/img/tienda.png' width={55} />
                <Typography variant='caption' color='GrayText'>
                  Tienda San Jose
                </Typography>
              </Box>
              <Typography variant='h4' my={8}>
                {StatusMessage[emailStatus]}
              </Typography>
            </Stack>

            <Button LinkComponent={Link} href='/auth' variant='contained' fullWidth>
              Iniciar sesión
            </Button>
          </Stack>
          <Divider sx={{ my: 2 }} />
          <Typography variant='subtitle2' component='span' color='initial'>
            <Link to='/auth/sign-up'>Crear nueva cuenta</Link>.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Confirmed;
