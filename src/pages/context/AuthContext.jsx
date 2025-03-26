import React, { createContext, useState } from "react";


export const AuthContext = createContext({
  user: null,
  setUser: () => {},
  streams: null,
  setStreams: () => {}
})

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [streams, setStreams] = useState(null);
    return (
      <AuthContext.Provider value={{ user, setUser, streams, setStreams }}>
        {children}
      </AuthContext.Provider>
    );
  };