import React, { createContext, useState } from 'react';
import Snackbar, { SnackbarType } from '../components/snackbar';

type SnackbarContextType = {
  displaySnackbar: (message: string, type?: SnackbarType) => void;
};

export const SnackbarContext = createContext<SnackbarContextType>({
  displaySnackbar: () => { }
});

interface Snack {
  message: string;
  type: SnackbarType;
}

const SnackbarContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [snack, setSnack] = useState<Snack>();

  const displaySnackbar = (message: string, type: SnackbarType = 'success') => {
    setSnack({ message, type });
  };

  return (
    <SnackbarContext.Provider value={{ displaySnackbar }}>
      {snack && <Snackbar message={snack.message} type={snack.type} handleClose={() => setSnack(undefined)} />}
      {children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarContextProvider;
