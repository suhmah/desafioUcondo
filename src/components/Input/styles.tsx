import styled from 'styled-components/native';
import { TextInput } from 'react-native';
import { colors } from '../../styles/colors';

export const Main = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const InputContainerSearch = styled.View`
  width:  100%;
  height: 56px;
  flex-direction: row;
  align-items: center;
  padding-left: 16px;
  background-color: white;
  border-radius: 100px;
  elevation: 4;
  shadow-color: black;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
`;


export const StyledTextInputSearch = styled(TextInput)`
  flex: 1;
  font-size: 16px;
  color: black;
`;
export const InputContainer = styled.View`
  width:  100%;
`;
export const StyledTextInput = styled.TextInput`
padding: 17px 17px;

  background-color: ${colors.white};
  color: black;
  border-radius: 10px;
`;