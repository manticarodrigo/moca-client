import React, { useState } from 'react';

import Swipeable from 'react-native-swipeable-row';

import {
  AmexIcon,
  MaestroIcon,
  MasterCardIcon,
  VisaIcon,
  BinIcon,
} from '@src/components/icons';

import Text from '@src/components/Text';
import View from '@src/components/View';
import Card from '@src/components/Card';
import Button from '@src/components/Button';
import FormField from '@src/components/FormField';
import ModalView from '@src/components/ModalView';

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
  const [selectedId, setSelectedId] = useState('512***************80');
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
    // pending linter review
    <View height="100%" scroll spacing={{ pt: 5 }}>
      {accountsList.map((card) => (
        !card.deleted ? (
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
              type={card.type}
              title={card.bankName}
              details={card.cardNumber}
              large
              onPress={() => handleCardPress(card.cardNumber)}
              selected={selectedId === card.cardNumber}
            />
          </Swipeable>
        ) : null
      ))}
      <Card type="addCard" arrow large onPress={handleModalVisibility} />
      <ModalView
        bgColor="white"
        height={400}
        isVisible={modalVisibility}
        handleArrowClick={handleModalVisibility}
        onBackdropPress={handleModalVisibility}
      >
        <View
          variant="borderBottom"
          alignCenter
          justifyCenter
          height={50}
          width="100%"
        >
          <Text variant="titleSmallDark">Add New Card</Text>
        </View>
        <View
          variant="borderBottom"
          row
          alignCenter
          justifyCenter
          height={60}
          width="100%"
        >
          <View alignCenter justifyCenter spacing={{ mx: 4 }}>
            <MasterCardIcon />
          </View>
          <View alignCenter justifyCenter spacing={{ mx: 4 }}>
            <VisaIcon />
          </View>
          <View alignCenter justifyCenter spacing={{ mx: 4 }}>
            <AmexIcon />
          </View>
          <View alignCenter justifyCenter spacing={{ mx: 4 }}>
            <MaestroIcon />
          </View>
        </View>
        <View spacing={{ p: 3 }}>
          <FormField placeholder="Account Name" value="" onChangeText={} />
          <FormField placeholder="Account Number" value="" />
          <FormField placeholder="Password" value="" />
          <Button spacing={{ m: 4 }} onPress={handleModalVisibility}>Add Account</Button>
        </View>
      </ModalView>
    </View>
  );
};


export default CreditCardsTab;
