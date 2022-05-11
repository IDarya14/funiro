import React, { createContext, useState } from 'react';
import MuiAlert from '@mui/lab/Alert';
import { Snackbar } from '@mui/material';

export const UIContext = createContext();

export const UIContextProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    show: false,
    severity: 'info',
    message: '',
  });
  const handleClose = () =>
    setAlert({
      show: false,
    });

  return (
    <UIContext.Provider value={{ setAlert }}>
      {children}
      <Snackbar open={alert.show} autoHideDuration={4000} onClose={handleClose}>
        <MuiAlert elevation={6} variant="filled" severity={alert.severity}>
          {alert.message}
        </MuiAlert>
      </Snackbar>
    </UIContext.Provider>
  );
};
