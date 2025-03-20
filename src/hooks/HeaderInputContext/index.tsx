import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SharedValue, useSharedValue } from 'react-native-reanimated';

type ScreenNames = 'HomeScreen' | 'CreateScreen';

interface HeaderContextProps {
  headerConfig?: {
    title?: string | null;
    icon?: ReactNode | null;
    component?: ReactNode | null;
    goback?: boolean;
  };
  setHeaderConfig?: (config?: HeaderContextProps['headerConfig']) => void | null;
  setValue: (id: string, value: string) => void;
  values: Record<string, string>;
  scrollY: SharedValue<number>; 
}

const HeaderContext = createContext<HeaderContextProps | undefined>(undefined);

export const HeaderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [headerConfig, setHeaderConfig] = useState<HeaderContextProps['headerConfig']>({
    title: '',
    icon: null,
    component: null,
    goback: false
  });

  const [values, setValues] = useState<Record<string, string>>({});
  const { navigate }: any = useNavigation();
  const scrollY = useSharedValue(0);

  const setValue = (id: string, value: string) => {
    setValues((prevValues) => ({ ...prevValues, [id]: value }));
  };

  return (
    <HeaderContext.Provider
      value={{
        headerConfig,
        setHeaderConfig,
        setValue,
        values,
        scrollY, 
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeaderManager = () => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error('useHeaderManager deve ser usado dentro de um HeaderProvider');
  }
  return context;
};
