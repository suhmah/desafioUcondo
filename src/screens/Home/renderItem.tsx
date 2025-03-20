import React, { useState, useEffect } from 'react';
import Text from '../../components/Text';
import Card from '../../components/Card';
import { Row } from '../../components/Row';
import { colors } from '../../styles/colors';
import Trash from '../../assets/icons/Trash';
import { Account } from '../Create';
import { deleteAccount } from '../../services/accountService';
import { TouchableOpacity } from 'react-native';
import CustomAlert from '../../components/CustomAlert';
import { useNavigation } from '@react-navigation/native';

interface IProps {
  item: Account;
  accounts: Account[];
  setAccounts: React.Dispatch<React.SetStateAction<Account[]>>;
}

const RenderComponentItem = ({ item, accounts, setAccounts }: IProps) => {
  const [showModal, setShowModal] = useState(false); 
  const {navigate}: any = useNavigation()
  
  const [handlers, setHandlers] = useState<{
    handleConfirmDelete: () => void;
    handleCancelDelete: () => void;
  } | undefined>(undefined); 

  useEffect(() => {
    if (showModal) {
      const { handleConfirmDelete, handleCancelDelete } = deleteAccount(
        accounts,
        setAccounts,
        item.code,
        setShowModal
      );

      setHandlers({ handleConfirmDelete, handleCancelDelete });
    }
  }, [showModal, accounts, item.code, setAccounts]); 

  const handleDelete = () => {
    setShowModal(true); 
  };

  const handleAccountPress = () => {
    navigate('CreateScreen', { item });
  };

  return (
    <Card onPress={handleAccountPress}>
      <Row justify="space-between" style={{ width: "100%" }}>
        <Text color={item.type === "despesas"? colors.warning : colors.success} variant="label">
          {item.code} - {item.name}
        </Text>
        <TouchableOpacity onPress={handleDelete}>
          <Trash />
        </TouchableOpacity>
      </Row>

      <CustomAlert
        visible={showModal}
        message={item.code}
        onCancel={handlers?.handleCancelDelete}
      />
    </Card>
  );
};

export default RenderComponentItem;
