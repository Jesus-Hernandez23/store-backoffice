import React, { useEffect } from 'react';

import { ThemeProvider } from '@mui/material/styles';

import Routes from '@/Routes';
import theme from '@/services/themes/themes';
import axios from 'axios';

//redux
import { useAppSelector } from './hooks/redux.hook';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const App = () => {
  const setting = useAppSelector((state) => state.app.setting);

  useEffect(() => {
    if (setting.darkMode) {
      document.body.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.body.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
  }, [setting.darkMode]);

  return (
    <ThemeProvider theme={theme(setting)}>
      <Routes />
    </ThemeProvider>
  );
};

export default App;
