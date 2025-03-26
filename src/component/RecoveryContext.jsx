import React, { createContext, useState } from "react";

export const RecoveryContext = createContext();
export default RecoveryContext;
export const RecoveryProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [page, setPage] = useState('');
  const [otp, setOTP] = useState('');

  return (
    <RecoveryContext.Provider value={{ email, setEmail, page, setPage, otp, setOTP }}>
      {children}
    </RecoveryContext.Provider>
  );
};