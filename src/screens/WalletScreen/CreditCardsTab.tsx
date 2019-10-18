import React, { useState } from 'react';
import { FlatList } from 'react-native';

import View from '@src/components/View';
import Card from '@src/components/Card';
import SwipeRow, { BinRow } from '@src/components/SwipeRow';

import BankCardModal from '@src/modals/BankCardModal';

const CreditCardsTab = () => {
  const previewList = [
    {
      type: 'amex',
      bankName: 'Bank of America',
      cardNumber: '512***************80',
    },
    {
      type: 'maestro',
      bankName: 'ING',
      cardNumber: '**** **** **** **** **54',

    },
    {
      type: 'masterCard',
      bankName: 'BBVA',
      cardNumber: '**** **** **** **** *324',

    },
    {
      type: 'visa',
      bankName: 'Wells Fargo',
      cardNumber: '439***************23',
    },
  ];

  const [accountsList, setAccountsList] = useState(previewList);
  const [selectedId, setSelectedId] = useState('****************4580');
  const [modalVisibility, setModalVisiblilty] = useState(false);

  const handleCardPress = (key) => {
    setSelectedId(key);
  };

  const handleModalVisibility = () => setModalVisiblilty(!modalVisibility);

  const onDelete = (index: number) => {
    const newAccountsList = [...accountsList];
    newAccountsList.splice(index, 1);

    setAccountsList(newAccountsList);
  };

  return (
    <View width="100%" height="100%" scroll>
      <FlatList
        data={accountsList}
        keyExtractor={(item) => item.cardNumber}
        renderItem={({ item, index }) => (
          <SwipeRow
            disabled={accountsList.length === 1}
            onPress={() => handleCardPress(item.cardNumber)}
          >
            <BinRow onPress={() => onDelete(index)} />
            <Card
              large
              type={item.type}
              title={item.bankName}
              details={item.cardNumber}
              selected={selectedId === item.cardNumber}
            />
          </SwipeRow>
        )}
      />
      <Card type="addCard" arrow large onPress={handleModalVisibility} />
      <BankCardModal isVisible={modalVisibility} onToggle={handleModalVisibility} />
    </View>
  );
};


export default CreditCardsTab;
