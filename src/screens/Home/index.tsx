import React, { useCallback, useState, useEffect } from 'react';
import { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { TouchableOpacity, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import Container from '../../components/Container';
import Input from '../../components/Input';
import MoreIcon from '../../assets/icons/MoreIcon';
import { Margin } from '../../components/Margin';
import Animated from 'react-native-reanimated';
import RenderComponentItem from './renderItem';
import RenderComponentHeader from './renderHeader';

import { loadAccounts, filterAccounts } from '../../services/accountService';
import { Account } from '../Create';

const HomeScreen: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [filteredAccounts, setFilteredAccounts] = useState<Account[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const scrollY = useSharedValue(0);
  const { navigate }:any = useNavigation();

  const fetchAccounts = useCallback(async () => {
    const loadedAccounts = await loadAccounts();
    setAccounts(loadedAccounts);
    setFilteredAccounts(loadedAccounts);
  }, []);

  useEffect(() => {
    setFilteredAccounts(filterAccounts(accounts, searchQuery));
  }, [accounts, searchQuery]);

  useFocusEffect(
    useCallback(() => {
      fetchAccounts();
    }, [fetchAccounts])
  );

  const renderItem = useCallback(({ item }: { item: Account }) => (
    <View key={item.code}>
      <RenderComponentItem accounts={accounts} setAccounts={setAccounts} item={item} />
    </View>
  ), [accounts, setAccounts]);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const renderHeader = useCallback(() => <RenderComponentHeader total={filteredAccounts.length} />, [filteredAccounts]);

  return (
    <Container headerConfig={{
      component: (
        <Input
          search
          id="search"
          onChange={(query) => setSearchQuery(query)}
        />
      ),
      icon: (
        <TouchableOpacity
          hitSlop={{ top: 10, bottom: 10, left: 20, right: 20 }}
          onPress={() => navigate('CreateScreen')}
        >
          <MoreIcon />
        </TouchableOpacity>
      ),
      title: 'Plano de Contas',
    }} scrollY={scrollY}>
      <Animated.FlatList
        data={filteredAccounts}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        ItemSeparatorComponent={() => <Margin mh={13} />}
        keyExtractor={(item) => item.code}
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      />
    </Container>
  );
};

export default HomeScreen;
