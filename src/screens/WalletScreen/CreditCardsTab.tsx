import React, { useState } from 'react';
import { FlatList } from 'react-native';

import useStore from '@src/hooks/useStore';

import View from '@src/components/View';
import Card from '@src/components/Card';
import SwipeRow, { BinRow } from '@src/components/SwipeRow';

import BankCardModal from '@src/modals/BankCardModal';

const CreditCardsTab = () => {
  const { store } = useStore();
  const [modalVisibility, setModalVisiblilty] = useState(false);

  const handleCardPress = (key) => {
    // TODO: Edit card primary
  };

  const handleModalVisibility = () => setModalVisiblilty(!modalVisibility);

  // const onDelete = (index: number) =>

  return (
    <View width="100%" height="100%" scroll>
      <FlatList
        data={store.user.payments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const { type, paymentInfo } = item;

          return (
            <View>
              {type === 'card' && (
                <Card
                  large
                  type={paymentInfo.brand}
                  title={`My ${paymentInfo.brand} Card`}
                  details={`**** **** **** **** ${paymentInfo.last4}`}
                  selected // paymentInfo.primary
                />
              )}
              {type === 'bank_account' && (
                <Card
                  large
                  type="bankAccount"
                  title={paymentInfo.bankName}
                  details={paymentInfo.routingNumber}
                  selected // paymentInfo.primary
                />
              )}
            </View>
          );
        }}
      />
      <Card type="addCard" arrow large onPress={handleModalVisibility} />
      <BankCardModal isVisible={modalVisibility} onToggle={handleModalVisibility} />
    </View>
  );
};


export default CreditCardsTab;
