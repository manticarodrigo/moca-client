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

  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountPassword, setAccountPassword] = useState('');

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

  const handleAccountNameChange = (text) => setAccountName(text);
  const handleAccountNumberChange = (text) => setAccountNumber(text);
  const handleAccountPasswordChange = (text) => setAccountPassword(text);

  const onFormSubmit = () => {
    // api call
    handleModalVisibility();
  };

  return (
    <View height="100%" scroll spacing={{ pt: 5 }}>
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
              type={card.type}
              title={card.bankName}
              details={card.cardNumber}
              large
              onPress={() => handleCardPress(card.cardNumber)}
              selected={selectedId === card.cardNumber}
            />
          </Swipeable>
        ))}
      </>
      <Card type="addCard" arrow large onPress={handleModalVisibility} />
      <ModalView
        bgColor="white"
        height={400}
        isVisible={modalVisibility}
        handleArrowClick={handleModalVisibility}
        onBackdropPress={handleModalVisibility}
      >
        <View width="100%">
          <View
            variant="borderBottom"
            alignCenter
            justifyCenter
            height={50}
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
          <View>
            <FormField
              placeholder="Account Name"
              value={accountName}
              onChangeText={(text) => handleAccountNameChange(text)}
            />
            <FormField
              placeholder="Account Number"
              value={accountNumber}
              onChangeText={handleAccountNumberChange}
            />
            <FormField
              placeholder="Password"
              value={accountPassword}
              onChangeText={handleAccountPasswordChange}
            />
            <Button spacing={{ mt: 2 }} onPress={onFormSubmit}>Add Account</Button>
          </View>
        </View>

      </ModalView>
    </View>
  );
};


export default CreditCardsTab;
