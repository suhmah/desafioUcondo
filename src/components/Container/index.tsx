import React, { ReactNode } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Content, Main } from './styles';
import { StatusBar } from 'react-native';
import { colors } from '../../styles/colors';
import Header from '../Header';
import { SharedValue } from 'react-native-reanimated';

interface HeaderConfig {
  title?: string | null;
  icon?: ReactNode | null;
  component?: ReactNode | null;
  goback?: boolean;
}

interface ContainerProps {
  children: ReactNode;
  headerConfig?: HeaderConfig;
  scrollY?: SharedValue<number>;
}

const Container: React.FC<ContainerProps> = ({ children, headerConfig, scrollY }) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }} edges={['top']}>
        <StatusBar barStyle="light-content" />
        <Main>
          <Header headerConfig={headerConfig} scrollY={scrollY} />
          <Content>{children}</Content>
        </Main>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Container;
