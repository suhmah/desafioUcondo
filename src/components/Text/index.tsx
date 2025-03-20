import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../../styles/colors';

type VariantType = 'title' | 'label' | 'subTitle'| 'buttonModal' | 'labelInput';

type VariantStyles = {
  fontSize: string;
  fontWeight: string;
  color: string;
};

const variants: Record<VariantType, VariantStyles> = {
  title: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#FFFFFF',
  },
  label: {
    fontSize: '15px',
    fontWeight: '400',
    color: '#A0A0B2',
  },
  labelInput: {
    fontSize: '15px',
    fontWeight: '500',
    color: colors.grayDark,
  },
  subTitle: {
    fontSize: '20px',
    fontWeight: '400',
    color: '#3D3D4C',
  },
  buttonModal: {
    fontSize: '15px',
    fontWeight: '700',
    color: colors.grayDark,
  },
};

const getVariantStyles = (variant: VariantType): VariantStyles => {
  return variants[variant] || variants.label;
};

interface StyledTextProps {
  variant: VariantType;
  customColor?: string;
}

const StyledText = styled.Text<StyledTextProps>`
  ${({ variant, customColor }: StyledTextProps) => {
    const styles = getVariantStyles(variant);
    return `
      font-size: ${styles.fontSize};
      font-weight: ${styles.fontWeight};
      color: ${customColor ||styles.color};
    `;
  }}
`;

interface TextProps {
  variant?: VariantType;
  color?: string;
  children: React.ReactNode;
}

const Text: React.FC<TextProps> = ({ variant = 'label', children, color, ...rest }) => {
  return <StyledText variant={variant} customColor={color} {...rest}>{children}</StyledText>;
};

export default Text;
