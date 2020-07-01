import React from 'react';
import { SettingsProvider } from './src/context/settings';

export const wrapRootElement = ({ element }) => (
  <SettingsProvider>{element}</SettingsProvider>
);
