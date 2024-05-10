import React, { createContext, useState, useContext } from 'react';

const EllipsisOptionsContext = createContext();

export const useEllipsisOptions = () => useContext(EllipsisOptionsContext);

export const EllipsisOptionsProvider = ({ children }) => {
  const [showEllipsisOptions, setShowEllipsisOptions] = useState(false);

  const toggleEllipsisOptions = () => {
    setShowEllipsisOptions(!showEllipsisOptions);
  };

  const hideEllipsisOptions = () => {
    setShowEllipsisOptions(false);
  };

  return (
    <EllipsisOptionsContext.Provider value={{ showEllipsisOptions, toggleEllipsisOptions, hideEllipsisOptions }}>
      {children}
    </EllipsisOptionsContext.Provider>
  );
};
