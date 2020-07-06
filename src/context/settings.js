import React, { createContext, useEffect, useState, useContext } from 'react';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState();
  const [soundEnabled, setSoundEnabled] = useState();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('jason.af:dark-mode', !darkMode);
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    localStorage.setItem('jason.af:sound-enabled', !soundEnabled);
  };

  useEffect(() => {
    // get the user settings
    const userDarkMode = localStorage.getItem('jason.af:dark-mode');
    const userSoundEnabled = localStorage.getItem('jason.af:sound-enabled');

    if (userDarkMode !== null) {
      setDarkMode(JSON.parse(userDarkMode));
    } else {
      setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }

    if (userSoundEnabled !== null) {
      setSoundEnabled(JSON.parse(userSoundEnabled));
    }
  }, []);

  return (
    <SettingsContext.Provider
      value={{ soundEnabled, darkMode, toggleDarkMode, toggleSound }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const { darkMode, toggleDarkMode, soundEnabled, toggleSound } = useContext(
    SettingsContext,
  );

  return { darkMode, toggleDarkMode, soundEnabled, toggleSound };
};
