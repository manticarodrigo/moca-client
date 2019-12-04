import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { withNavigationFocus } from 'react-navigation';

import api from '@src/services/api';

import useStore from '@src/hooks/useStore';

import { Colors } from '@src/styles';

import View from '@src/components/View';
import SegmentedControl from '@src/components/SegmentedControl';

import CreditCardsTab from './CreditCardsTab';
import BillingHistoryTab from './BillingHistoryTab';

const navOptions = [
  { value: 'accounts', label: 'Accounts' },
  { value: 'history', label: 'Billing History' },
];

const WalletScreen = ({ isFocused }) => {
  const { store } = useStore();
  const [active, setActive] = useState('accounts');
  const [webSource, setWebSource] = useState();

  const isTherapist = store.user.type === 'PT';

  useEffect(() => {
    const getDashboardUrl = async () => {
      const { data } = await api.instance.get(`${api.basePath}/payment/connect/login/`);

      setWebSource(data);
    };

    if (isFocused && isTherapist) {
      getDashboardUrl();
    }
  }, [isFocused, isTherapist]);

  const handlePress = (value: string) => setActive(value);

  return (
    <View safeArea flex={1}>
      {isTherapist ? (
        <View flex={1} justifyCenter bgColor="lightGrey">
          {webSource ? (
            <WebView source={{ uri: webSource }} />
          ) : (
            <ActivityIndicator size="large" color={Colors.primary} />
          )}
        </View>
      ) : (
        <>
          <SegmentedControl selected={active} options={navOptions} onChange={handlePress} />
          <BillingHistoryTab visible={active === 'history'} />
          <CreditCardsTab visible={active === 'accounts'} />
        </>
      )}
    </View>
  );
};

WalletScreen.navigationOptions = () => ({
  headerTitle: 'Wallet',
});


export default withNavigationFocus(WalletScreen);
