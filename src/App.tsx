import React from 'react';

import { NativeBaseProvider } from 'native-base';

import Home from './pages/Home';

export default function App() {
  return (
    <NativeBaseProvider>
      <Home />
    </NativeBaseProvider>
  );
}
