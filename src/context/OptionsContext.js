import React, { createContext, useState, useContext } from 'react';

const OptionsContext = createContext();

export const useOptionsContext = () => useContext(OptionsContext);

export const OptionsProvider = ({ children }) => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => setShowOptions(!showOptions);
  const hideOptions = () => setShowOptions(false);
  const showOptionsHandler = () => setShowOptions(true);

  return (
    <OptionsContext.Provider value={{ showOptions, toggleOptions, hideOptions, showOptionsHandler }}>
      {children}
    </OptionsContext.Provider>
  );
};
