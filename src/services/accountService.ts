import AsyncStorage from '@react-native-async-storage/async-storage';
import { Account } from '../screens/Create';
import { Alert } from 'react-native';

export const loadAccounts = async (): Promise<Account[]> => {
  try {
    const storedAccounts = await AsyncStorage.getItem('accounts');
    return storedAccounts ? JSON.parse(storedAccounts) : [];
  } catch (error) {
    return [];
  }
};

export const saveAccounts = async (accounts: Account[]): Promise<void> => {
  try {
    await AsyncStorage.setItem('accounts', JSON.stringify(accounts));
  } catch (error) {
    console.error('Erro ao salvar contas no AsyncStorage:', error);
  }
};

export const filterAccounts = (accounts: Account[], query: string): Account[] => {
  if (!query) {
    return accounts;
  }

  const lowercasedQuery = query.toLowerCase();
  return accounts.filter(
    (account) =>
      account.code.toLowerCase().includes(lowercasedQuery) ||
      account.name.toLowerCase().includes(lowercasedQuery)
  );
};

export const getNextCode = (parentCode: string, accounts: Account[]): string => {
  const children = accounts.filter(acc => acc.parent === parentCode);

  if (children.length === 0) return `${parentCode}.1`;

  const lastChild = children.reduce((max, acc) => {
    const lastCode = parseInt(acc.code.split('.').pop() || '0', 10);
    const maxCode = parseInt(max.code.split('.').pop() || '0', 10);
    return lastCode > maxCode ? acc : max;
  });

  const lastCode = parseInt(lastChild.code.split('.').pop() || '0', 10);

  if (lastCode === 999) {
    const parentLevel = parentCode.split('.').length;
    if (parentLevel < 3) {
      return `${parentCode.split('.').slice(0, parentLevel - 1).join('.')}.10`;
    } else {
      return `${parentCode.split('.')[0]}.10`;
    }
  }

  return `${parentCode}.${lastCode + 1}`;
};

export const getNextMainCode = (accounts: Account[]): string => {
  const mainCodes = accounts.filter(acc => !acc.parent).map(acc => parseInt(acc.code, 10));
  
  const maxMainCode = Math.max(...mainCodes);
  if (maxMainCode >= 999) {
    return `${Math.floor(maxMainCode / 1000) + 1}.1`;
  }

  return `${maxMainCode + 1}`;
};

export const sortAccounts = (accounts: Account[]): Account[] => {
  return accounts.sort((a, b) => a.code.localeCompare(b.code));
};

export const addAccount = async (
  accounts: Account[],
  setAccounts: React.Dispatch<React.SetStateAction<Account[]>>,
  name: string,
  type: string,
  code: string,
  parent: string,
  acceptsTransactions: boolean,
  resetFields: () => void,
  navigation: any
) => {
  if (!name || !type || !code) {
    return Alert.alert('Erro', 'Informe todos os campos obrigatórios.');
  }

  if (accounts.some(acc => acc.code === code)) {
    return Alert.alert('Erro', 'Já existe uma conta com esse código.');
  }

  const parentAccount = accounts.find(acc => acc.code === parent);
  if (parentAccount && parentAccount.type !== type) {
    return Alert.alert('Erro', 'O tipo da conta filha deve ser o mesmo da conta pai.');
  }

  if (acceptsTransactions && parentAccount?.acceptsTransactions) {
    return Alert.alert('Erro', 'A conta que aceita lançamentos não pode ter filhos.');
  }

  const newAccount: Account = { code, name, parent, type, acceptsTransactions };
  const sortedAccounts = sortAccounts([...accounts, newAccount]);

  await saveAccounts(sortedAccounts);
  setAccounts(sortedAccounts);
  resetFields();
  
  navigation.goBack();
};

interface DeleteAccountHandlers {
  handleConfirmDelete: () => Promise<void>;
  handleCancelDelete: () => void;
}

export const deleteAccount = (
  accounts: Account[],
  setAccounts: React.Dispatch<React.SetStateAction<Account[]>>,
  code: string,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
): DeleteAccountHandlers => {
  const accountToDelete = accounts.find(acc => acc.code === code);
  
  if (!accountToDelete) {
    setShowModal(true);
    return { handleConfirmDelete: async () => {}, handleCancelDelete: () => {} };
  }

  const handleConfirmDelete = async () => {
    const updatedAccounts = accounts.filter(acc => acc.code !== code);
    await saveAccounts(updatedAccounts);
    
    const reloadedAccounts = await loadAccounts();
    setAccounts(reloadedAccounts);

    setShowModal(false);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  setShowModal(true);

  return { handleConfirmDelete, handleCancelDelete };
};
