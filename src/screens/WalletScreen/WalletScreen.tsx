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
    <View>
      <SegmentedControl selected={active} options={navOptions} onChange={handlePress} />
      {active === 'history' ? <BillingHistoryTab /> : <CreditCardsTab />}
    </View>
  );
};

WalletScreen.navigationOptions = () => ({
  headerTitle: 'Wallet',
});


export default WalletScreen;
