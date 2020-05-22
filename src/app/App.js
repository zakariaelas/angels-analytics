import React from 'react';
import './App.css';
import {
  createMuiTheme,
  MuiThemeProvider,
  CssBaseline,
  Container,
  Box,
} from '@material-ui/core';
import Navbar from '../components/Navbar';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import Dashboard from '../domain/Dashboard/Dashboard';
import { Provider } from 'react-redux';
import configureStore from './configureStore';

// Configuring the store:
// Used to apply redux-thunk middleware, as well as create the initial store
// The goal is to abstract away all the configuration away in a function, and simply call it from here
const store = configureStore();

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1a9be6',
    },
  },
  typography: {
    fontFamily: ['"Baloo Chettan 2"', 'Arial', 'sans-serif'],
    useNextVariants: true,
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      {/* CssBaseline is used to reset some styles (padding, margins, etc.) across different browsers.  */}
      <CssBaseline />
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Provider store={store}>
          <Navbar />
          <Box my={4}>
            <Container maxWidth="lg">
              <Dashboard />
            </Container>
          </Box>
        </Provider>
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  );
}

export default App;
