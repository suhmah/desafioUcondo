import React, { useEffect, useState } from 'react';
import { TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import Container from '../../components/Container';
import SelectComponent from '../../components/SelectComponent';
import Input from '../../components/Input';
import { Margin } from '../../components/Margin';
import CheckIcon from '../../assets/icons/CheckIcon';
import { getNextCode, getNextMainCode, loadAccounts, addAccount } from '../../services/accountService';

export interface Account {
  code: string;
  name: string;
  parent: string;
  type: string;
  acceptsTransactions?: boolean;
}

interface IParams {
  item: Account;
}

const CreateScreen: React.FC = () => {
  const navigation = useNavigation();
  const { params } = useRoute();

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [parent, setParent] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [acceptsTransactions, setAcceptsTransactions] = useState<boolean | null>();
  const [code, setCode] = useState('');
  const [paramsData, setParamsData] = useState<IParams>();

  useEffect(() => {
    const loadAccountsData = async () => {
      const storedAccounts = await loadAccounts();
      setAccounts(storedAccounts);
    };
    loadAccountsData();
  }, []);

  useEffect(() => {
    if (params) {
      const { item } = params as IParams;
      setParamsData({ item });
    } else {
      const isCode = parent ? getNextCode(parent, accounts) : getNextMainCode(accounts);
      setCode(isCode === '-Infinity' ? '1' : isCode);
    }
  }, [parent, accounts]);

  const resetFields = () => {
    setName('');
    setParent('');
    setType('');
    setAcceptsTransactions(null);
    setCode('');
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Container
          headerConfig={{
            title: 'Inserir Conta',
            goback: true,
            icon: (
              <TouchableOpacity
                onPress={() =>
                  addAccount(accounts, setAccounts, name, type, code, parent, acceptsTransactions, resetFields, navigation)
                }
                disabled={!name || !type}
              >
                <CheckIcon />
              </TouchableOpacity>
            ),
          }}
        >
          <Margin mh={20} />
          <SelectComponent setValue={setParent} label="Conta pai" disabled={!!paramsData?.item.code} title={paramsData?.item.parent || 'Selecione uma conta pai'} data={accounts} />
          <Margin mh={10} />
          <Input label="Código" placeholder="Código" disabled={!!paramsData?.item.code} value={paramsData?.item.code || code} onChange={setCode} />
          <Margin mh={10} />
          <Input label="Nome" placeholder="Nome da conta" disabled={!!paramsData?.item.code} value={paramsData?.item.name || name} onChange={setName} />
          <Margin mh={10} />
          <SelectComponent
            disabled={!!paramsData?.item.code}
            title={paramsData?.item.type || 'Tipo'}
            label="Selecione o tipo da conta"
            setValue={setType}
            data={[
              { name: 'Receitas', code: 'receitas' },
              { name: 'Despesas', code: 'despesas' },
            ]}
          />
          <Margin mh={10} />
          <SelectComponent
            disabled={!!paramsData?.item.code}
            title={paramsData?.item.acceptsTransactions ? 'Sim' : 'Não'}
            label="Aceita Lançamentos?"
            setValue={(value) => setAcceptsTransactions(value?.code === 'sim')}
            data={[
              { name: 'Sim', code: 'sim' },
              { name: 'Não', code: 'nao' },
            ]}
          />
          <Margin mh={10} />
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateScreen;
