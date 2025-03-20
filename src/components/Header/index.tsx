import React, { ReactNode } from 'react';
import { useAnimatedStyle, interpolate, SharedValue } from 'react-native-reanimated';
import { Main } from './styles';
import { Row } from '../Row';
import Text from '../Text';
import Animated from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native';
import GobackIcon from '../../assets/icons/GobackIcon';
import { useNavigation } from '@react-navigation/native';

interface HeaderConfig {
  title?: string | null;
  icon?: ReactNode | null;
  component?: ReactNode | null;
  goback?: boolean;
}

interface HeaderProps {
  headerConfig?: HeaderConfig;
  scrollY?: SharedValue<number>;
}

const Header: React.FC<HeaderProps> = ({ headerConfig, scrollY }) => {
  const { goBack } = useNavigation();

  const animatedHeaderStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(scrollY?.value, [0, 150], [90, 0], 'clamp'),
      opacity: interpolate(scrollY?.value, [0, 150], [1, 0], 'clamp'),
    };
  });

  return (
    <Main>
      <Row justify="space-between" style={{ paddingBottom: 21 }}>
        <Row justify="space-between" align="center">
          {headerConfig?.goback && (
            <TouchableOpacity onPress={goBack} style={{ marginRight: 13 }}>
              <GobackIcon />
            </TouchableOpacity>
          )}
          <Text variant="title">{headerConfig?.title}</Text>
        </Row>
        {headerConfig?.icon}
      </Row>
      {headerConfig?.component && (
        <Animated.View style={[animatedHeaderStyle, { overflow: 'hidden' }]}>
          <Row>{headerConfig.component}</Row>
        </Animated.View>
      )}
    </Main>
  );
};

export default Header;
