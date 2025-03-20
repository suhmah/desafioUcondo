import React from 'react';
import { Main, InputContainerSearch, StyledTextInput, InputContainer, StyledTextInputSearch } from './styles';
import { useHeaderManager } from '../../hooks/HeaderInputContext';
import Search from '../../assets/icons/Search';
import { Margin } from '../Margin';
import Text from '../Text';

interface InputProps {
  id?: string;
  placeholder?: string;
  storeInContext?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  search?: boolean;
  label?: string;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({ disabled, label, search, id, placeholder = 'Pesquisar...', storeInContext = false, value, onChange }) => {
  const { values, setValue } = useHeaderManager();

  const handleChange = (text: string) => {
    if (storeInContext && id) {
      setValue(id, text);
    } else {
      onChange?.(text);
    }
  };

  return (
    <Main>
      {search ? (
        <InputContainerSearch>
          <Search />
          <StyledTextInputSearch
            placeholder={placeholder}
            placeholderTextColor="#A0A0A0"
            value={storeInContext && id ? values[id] || '' : value}
            onChangeText={handleChange}
          />
        </InputContainerSearch>
      ) : (
        <InputContainer>
          <Text variant='labelInput'>{label}</Text>
          <Margin mh={5}></Margin>
          <StyledTextInput
            editable={!disabled}
            placeholder={placeholder}
            placeholderTextColor="#A0A0A0"
            value={value}
            onChangeText={handleChange}
          />
        </InputContainer>
      )}

    </Main>
  );
};

export default Input;
