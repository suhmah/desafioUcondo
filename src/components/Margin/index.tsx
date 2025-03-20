import styled from 'styled-components/native';

interface MarginProps {
  mh?: number;
  mv?: number;
}

export const Margin = styled.View<MarginProps>`
  height: ${({ mh = 0 }) => `${mh}px`};
  width: ${({ mv = 0 }) => `${mv}px`};
`;
