import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

// Crea un objeto de tema personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', // Color primario, en este caso, negro
    },
  },
  // Puedes agregar más configuraciones de tema según tus necesidades
});



export default theme;
