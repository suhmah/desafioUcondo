import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/Home';
import { HeaderProvider } from './src/hooks/HeaderInputContext';
import CreateScreen from './src/screens/Create';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer> 
      <HeaderProvider> 
        <Stack.Navigator initialRouteName="HomeScreen">
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreateScreen"
            component={CreateScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </HeaderProvider>
    </NavigationContainer>
  );
}

export default App;


/* import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';

const App = () => {
  const [accounts, setAccounts] = useState([]);
  const [parent, setParent] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState(''); // Tipo da conta (Receita ou Despesa)
  const [acceptsTransactions, setAcceptsTransactions] = useState(false); // Se aceita lançamentos
  const [code, setCode] = useState(''); // Código sugerido para a conta

  useEffect(() => {
    loadAccounts();
  }, []);

  useEffect(() => {
    if (parent) {
      const suggestedCode = getNextCode(parent);
      setCode(suggestedCode);
    } else {
      setCode(getNextMainCode()); // Sugerir código para contas principais
    }
  }, [parent]);

  const loadAccounts = async () => {
    const storedAccounts = await AsyncStorage.getItem('accounts');
    if (storedAccounts) {
      setAccounts(JSON.parse(storedAccounts));
    } else {
      setAccounts([]); // Inicializa com um array vazio
    }
  };

  const saveAccounts = async (newAccounts) => {
    setAccounts(newAccounts);
    await AsyncStorage.setItem('accounts', JSON.stringify(newAccounts));
  };

  // Função para obter o próximo código de conta
  const getNextCode = (parentCode) => {
    // Filtra as contas que têm o mesmo código pai
    const children = accounts.filter(acc => acc.parent === parentCode);

    // Se não houver filhos, o próximo código será "1" ou o primeiro disponível
    if (children.length === 0) {
      return parentCode ? `${parentCode}.1` : getNextMainCode(); // Se for a raiz, começa do "1"
    }

    // Encontra o maior código dos filhos, baseado na versão final do código
    const lastChild = children.reduce((max, acc) => {
      const lastCode = parseInt(acc.code.split('.').pop(), 10);  // Pega a última versão do código
      const maxCode = parseInt(max.code.split('.').pop(), 10);   // Pega a versão máxima do código
      return lastCode > maxCode ? acc : max;
    }, children[0]);

    // Obtém a última versão do código e gera o próximo número
    const lastCode = parseInt(lastChild.code.split('.').pop(), 10);

    // Se o código atingir 999, sobe um nível
    if (lastCode === 999) {
      const parentParts = parentCode.split('.');
      parentParts[parentParts.length - 1] = (parseInt(parentParts[parentParts.length - 1], 10) + 1).toString();
      return `${parentParts.join('.')}.1`;
    }

    return `${parentCode}.${lastCode + 1}`;
  };

  // Função para obter o próximo código principal (sem pai)
  const getNextMainCode = () => {
    const mainCodes = accounts
      .filter(acc => !acc.parent) // Conta os itens sem pai
      .map(acc => parseInt(acc.code, 10)); // Pega os códigos principais (1, 2, 3, etc.)

    const nextCode = mainCodes.length === 0 ? 1 : Math.max(...mainCodes) + 1;
    return `${nextCode}`;
  };

  // Função para ordenar as contas de acordo com a hierarquia dos códigos
  const sortAccounts = (accounts) => {
    return accounts.sort((a, b) => {
      const codeA = a.code.split('.').map(num => parseInt(num, 10));
      const codeB = b.code.split('.').map(num => parseInt(num, 10));

      // Comparando as partes do código (1, 1.1, 1.2, etc.)
      for (let i = 0; i < Math.min(codeA.length, codeB.length); i++) {
        if (codeA[i] !== codeB[i]) {
          return codeA[i] - codeB[i];
        }
      }

      // Se os códigos forem iguais até o ponto, o menor número vem primeiro
      return codeA.length - codeB.length;
    });
  };

  const addAccount = () => {
    if (!name || !type || !code) {
      return Alert.alert('Erro', 'Informe todos os campos obrigatórios.');
    }

    // Verifica se o código informado já existe
    if (accounts.some(acc => acc.code === code)) {
      return Alert.alert('Erro', 'Já existe uma conta com esse código.');
    }

    // Verifica se o tipo da conta está de acordo com o tipo do pai
    const parentAccount = accounts.find(acc => acc.code === parent);
    if (parentAccount && parentAccount.type !== type) {
      return Alert.alert('Erro', 'O tipo da conta filha deve ser o mesmo da conta pai.');
    }

    // Verifica se o tipo da conta aceita ou não lançamentos
    if (acceptsTransactions && parentAccount && parentAccount.acceptsTransactions) {
      return Alert.alert('Erro', 'A conta que aceita lançamentos não pode ter filhos.');
    }

    // Cria a nova conta com os dados preenchidos
    const newAccount = { code, name, parent, type, acceptsTransactions };
    const newAccounts = [...accounts, newAccount];
    const sortedAccounts = sortAccounts(newAccounts); // Ordena as contas após a adição
    saveAccounts(sortedAccounts);
    setName('');
    setParent('');
    setType('');
    setAcceptsTransactions(false);
    setCode(''); // Mantém o código editável
  };

  const removeAccount = (code) => {
    const filteredAccounts = accounts.filter(acc => acc.code !== code);
    const sortedAccounts = sortAccounts(filteredAccounts); // Ordena as contas após a remoção
    saveAccounts(sortedAccounts);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Plano de Contas</Text>

      <RNPickerSelect
        onValueChange={(value) => setParent(value)}
        items={accounts.map(acc => ({ label: acc.name, value: acc.code }))}
        placeholder={{ label: "Selecione uma conta pai", value: null }}
      />
      <TextInput
        style={styles.input}
        placeholder='Código'
        value={code}
        onChangeText={setCode}
      />
      <TextInput
        style={styles.input}
        placeholder='Nome da conta'
        value={name}
        onChangeText={setName}
      />
      <RNPickerSelect
        onValueChange={(value) => setType(value)}
        items={[
          { label: 'Receitas', value: 'receitas' },
          { label: 'Despesas', value: 'despesas' }
        ]}
        placeholder={{ label: "Selecione o tipo da conta", value: null }}
      />
      <View style={styles.checkboxContainer}>
        <Text>Aceita Lançamentos?</Text>
        <Button title={acceptsTransactions ? "Sim" : "Não"} onPress={() => setAcceptsTransactions(!acceptsTransactions)} />
      </View>

      <Button title='Adicionar' onPress={addAccount} disabled={!name || !type} />

      <FlatList
        data={accounts}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <View style={[styles.item, { backgroundColor: item.type === 'receitas' ? '#d4edda' : '#f8d7da' }]}>
            <Text style={styles.itemText}>{item.code} - {item.name} ({item.type})</Text>
            <Button title='Remover' onPress={() => removeAccount(item.code)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, padding: 8, marginBottom: 10, borderRadius: 5 },
  item: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1 },
  checkboxContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }
});

export default App;
 */