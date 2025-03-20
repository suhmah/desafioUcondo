import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import styled from 'styled-components/native';
import Text from '../Text';
import { Margin } from '../Margin';

interface Option {
  name: string;
  code: string;
}

interface SelectComponentProps {
  data?: Option[];
  label: string;
  setValue: (value: string) => void;
  title?: string;
  disabled?: boolean
}

const SelectContainer = styled.View`
  width: 100%;
`;

const PickerWrapper = styled.View`
  border-radius: 10px;
  overflow: hidden;
  background-color: white;
  padding: 5px;
`;

const SelectComponent: React.FC<SelectComponentProps> = ({ label, disabled, data = [], setValue, title }) => {
  return (
    <SelectContainer>
      {label && <Text variant='labelInput'>{label}</Text>}
      <Margin mh={5} />
      <PickerWrapper>

        <RNPickerSelect
          disabled={disabled || data.length === 0}
          onValueChange={(value) => setValue(value)}
          items={data?.map((item) => ({ label: item.name, value: item.code })) || []}
          style={pickerSelectStyles}
          placeholder={{ label: title, value: null }}
        />

      </PickerWrapper>
    </SelectContainer>
  );
};

export default SelectComponent;

const pickerSelectStyles = {
  inputIOS: {
    backgroundColor: 'white',
    borderRadius: 10,
    color: 'black',
    paddingHorizontal: 10,
  },
  inputAndroid: {
    backgroundColor: 'white',
    borderRadius: 10,
    color: 'black',
    paddingHorizontal: 10,
  },
};