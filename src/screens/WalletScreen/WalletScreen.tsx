import React, { useState } from 'react';

import View from '@src/components/View';
import SegmentedControl from '@src/components/SegmentedControl';

import CreditCardsTab from './CreditCardsTab';
import BillingHistoryTab from './BillingHistoryTab';

const navOptions = [
  { value: 'accounts', label: 'Accounts' },
  { value: 'history', label: 'Billing History' },
];

const WalletScreen = () => {
  const [active, setActive] = useState('accounts');

  const handlePress = (value: string) => setActive(value);

  return (
    <View safeArea flex={1}>
      <SegmentedControl selected={active} options={navOptions} onChange={handlePress} />
      <BillingHistoryTab visible={active === 'history'} />
      <CreditCardsTab visible={active === 'accounts'} />
    </View>
  );
};

WalletScreen.navigationOptions = () => ({
  headerTitle: 'Wallet',
});


export default WalletScreen;
