import React, { createContext, useState, useContext } from 'react';

const DeviceContext = createContext();

export const useDeviceContext = () => useContext(DeviceContext);

export const DeviceProvider = ({ children }) => {
  const [selectedDevice, setSelectedDevice] = useState({});

  const updateSelectedDevice = (deviceDetails) => {
    setSelectedDevice(deviceDetails);
  };

  return (
    <DeviceContext.Provider value={{ selectedDevice, updateSelectedDevice }}>
      {children}
    </DeviceContext.Provider>
  );
};
