import { h, createContext } from 'preact';
import { useEffect, useState, useContext } from 'preact/hooks';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState();
  const [soundEnabled, setSoundEnabled] = useState();
  const [bioLength, setBioLength] = useState();

  return (
    <SettingsContext.Provider
      value={{
        soundEnabled,
        darkMode,
        setDarkMode,
        setSoundEnabled,
        bioLength,
        setBioLength,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const {
    darkMode,
    setDarkMode,
    soundEnabled,
    setSoundEnabled,
    bioLength,
    setBioLength,
  } = useContext(SettingsContext);

  const initializeSetting = ({
    localStorageKey,
    setValue,
    value,
    fallbackValue,
  }) => {
    if (typeof value !== 'undefined') return;

    const userValue = localStorage.getItem(localStorageKey);
    if (userValue !== null) {
      /*
       * For boolean values, we need to run JSON.parse() or else they’ll be
       * treated like strings. However, if we try to JSON.parse() a plain ol’
       * string, it borks. So this tries to parse first, then falls back to
       * using the string value if that doesn’t work.
       */
      let newValue;
      try {
        newValue = JSON.parse(userValue);
      } catch (_) {
        newValue = userValue;
      }

      setValue(newValue);
    } else {
      setValue(fallbackValue);
    }
  };

  useEffect(() => {
    initializeSetting({
      localStorageKey: 'jason.af:sound-enabled',
      setValue: setSoundEnabled,
      value: soundEnabled,
      fallbackValue: true,
    });

    initializeSetting({
      localStorageKey: 'jason.af:dark-mode',
      setValue: setDarkMode,
      value: darkMode,
      fallbackValue: window.matchMedia('(prefers-color-scheme: dark)').matches,
    });

    initializeSetting({
      localStorageKey: 'jason.af:bio-length',
      setValue: setBioLength,
      value: bioLength,
      fallbackValue: 'short',
    });
  }, [
    darkMode,
    setDarkMode,
    soundEnabled,
    setSoundEnabled,
    bioLength,
    setBioLength,
  ]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    localStorage.setItem('jason.af:dark-mode', newMode);
    setDarkMode(newMode);
  };

  const toggleSound = () => {
    const newSetting = !soundEnabled;
    localStorage.setItem('jason.af:sound-enabled', newSetting);
    setSoundEnabled(newSetting);
  };

  const updateBioLength = length => {
    const allowedLengths = [
      'shortest',
      'shorter',
      'short',
      'long',
      'longer',
      'longest',
    ];

    if (allowedLengths.includes(length)) {
      localStorage.setItem('jason.af:bio-length', length);
      setBioLength(length);
    }
  };

  return {
    darkMode,
    toggleDarkMode,
    soundEnabled,
    toggleSound,
    bioLength,
    updateBioLength,
  };
};
