import React from 'react';
import { Modal, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../../styles/colors';
import TrashBig from '../../assets/icons/TrashBig';
import Text from '../Text';
import { Margin } from '../Margin';

interface CustomAlertProps {
  visible: boolean;
  message: string;
  onCancel?: () => void;
  onConfirm?: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ visible, message, onCancel, onConfirm }) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade" onRequestClose={onCancel}>
      <Overlay>
        <Container>
          <TrashBig />
          <Margin mh={18} />
          
          <Text color={colors.grayDark} variant="label">Deseja excluir a conta</Text>
          <Margin mh={8} />
          
          <Text variant="buttonModal">{message} - Taxa condominial?</Text>
          
          <Margin mh={36} />
          
          <ButtonsContainer>
            <TouchableOpacity style={cancelButton} onPress={onCancel}>
              <Text variant="label" color={colors.red}>Não!</Text>
            </TouchableOpacity>
            <Margin mv={15} />
            <TouchableOpacity style={confirmButton} onPress={onConfirm}>
              <Text color="white">Com certeza</Text>
            </TouchableOpacity>
          </ButtonsContainer>
        </Container>
      </Overlay>
    </Modal>
  );
};

const Overlay = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Container = styled.View`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  align-items: center;
`;

const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal: 32px;
`;

const cancelButton = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'flex-end',
};

const confirmButton = {
  paddingHorizontal: 24,
  paddingVertical: 11,
  backgroundColor: colors.red,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 100,
};

export default CustomAlert;
