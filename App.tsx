import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/navigation';
import { HeaderProvider } from './src/hooks/HeaderInputContext';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <HeaderProvider>
        <Routes />
      </HeaderProvider>
    </NavigationContainer>
  );
}

export default App;
