import React, { useState } from 'react';

import Swipeable from 'react-native-swipeable-row';

import { BinIcon } from '@src/components/icons';

import View from '@src/components/View';
import Card from '@src/components/Card';

import BankCardModal from '@src/modals/BankCardModal';

const CreditCardsTab = () => {
  const previewList = [
    {
      type: 'amex',
      bankName: 'Bank of America',
      cardNumber: '512***************80',
      deleted: false,
    },
    {
      type: 'maestro',
      bankName: 'ING',
      cardNumber: '**** **** **** **** **54',
      deleted: false,

    },
    {
      type: 'masterCard',
      bankName: 'BBVA',
      cardNumber: '**** **** **** **** *324',
      deleted: false,

    },
    {
      type: 'visa',
      bankName: 'Wells Fargo',
      cardNumber: '439***************23',
      deleted: false,
    },
  ];

  const [accountsList, setAccountsList] = useState(previewList);
  const [selectedId, setSelectedId] = useState('****************4580');
  const [modalVisibility, setModalVisiblilty] = useState(false);

  const handleCardPress = (key) => {
    setSelectedId(key);
  };

  const handleModalVisibility = () => setModalVisiblilty(!modalVisibility);

  const onDelete = (key) => {
    const newAccountsList = [...accountsList];
    const index = newAccountsList.findIndex((card) => card.cardNumber === key);
    newAccountsList[index].deleted = true;
    setAccountsList(newAccountsList);
  };

  return (
    <View width="100%" height="100%" scroll spacing={{ pt: 5 }}>
      <>
        {accountsList.filter((card) => !card.deleted).map((card) => (
          <Swipeable
            key={card.cardNumber}
            rightButtons={[
              <View
                key={1}
                spacing={{ pl: 4 }}
                justifyCenter
                bgColor="error"
                height={80}
                onPress={() => onDelete(card.cardNumber)}
              >
                <BinIcon />
              </View>,
            ]}
          >
            <Card
              large
              type={card.type}
              title={card.bankName}
              details={card.cardNumber}
              onPress={() => handleCardPress(card.cardNumber)}
              selected={selectedId === card.cardNumber}
            />
          </Swipeable>
        ))}
      </>
      <Card type="addCard" arrow large onPress={handleModalVisibility} />
      <BankCardModal isVisible={modalVisibility} onToggle={handleModalVisibility} />
    </View>
  );
};


export default CreditCardsTab;
