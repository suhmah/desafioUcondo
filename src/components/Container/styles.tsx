import styled from 'styled-components/native';
import { colors } from '../../styles/colors';

export const Main = styled.View`
  flex: 1;
  background-color: ${colors.primary};

`;
export const Content = styled.View`
  flex: 1;
  background-color: ${colors.offWhite};

  padding: 0 24px;

  border-radius: 24px 24px 0 0;
`;
