import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ email: '', phone: '' });

  const storeUser = (email, phone) => {
    setUser({ email, phone });
    
  };
  const clearUser = () => {
    setUser({ email: '', phone: '' }); 
    
  };
  return (
    <UserContext.Provider value={{ user, storeUser,clearUser }}>
      {children}
    </UserContext.Provider>
  );
};
