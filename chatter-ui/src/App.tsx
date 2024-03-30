import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import router from './components/auth/Routes';
import { RouterProvider } from 'react-router-dom';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container>
        <RouterProvider router={router} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
