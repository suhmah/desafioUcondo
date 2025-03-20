import React from 'react';
import { Main } from './styles';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
}

const Card = ({ children, onPress }: CardProps) => {
  return <Main onPress={onPress}>{children}</Main>;
};

export default Card;
