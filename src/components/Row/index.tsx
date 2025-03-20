import styled from 'styled-components/native';
import { ViewProps } from 'react-native';

interface RowProps extends ViewProps {
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
}

export const Row = styled.View<RowProps>`
  flex-direction: row;
  justify-content: ${({ justify = 'flex-start' }) => justify};
  align-items: ${({ align = 'center' }) => align};
`;
