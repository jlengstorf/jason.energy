import React, { createContext, useState, useContext } from 'react';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [sound, setSoundEnabled] = useState(true);

  const toggleSound = () => {
    setSoundEnabled(!sound);
  };

  return (
    <SettingsContext.Provider value={{ sound, toggleSound }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const { sound, toggleSound } = useContext(SettingsContext);

  return { sound, toggleSound };
};
