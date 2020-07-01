import React, { createContext, useState, useContext } from 'react';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  return (
    <SettingsContext.Provider value={{ soundEnabled, toggleSound }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const { soundEnabled, toggleSound } = useContext(SettingsContext);

  return { soundEnabled, toggleSound };
};
