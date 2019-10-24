/* eslint-disable @typescript-eslint/camelcase */
import React, { useState } from 'react';

import stripe, { CardDetails, BankAccountDetails } from '@src/services/stripe';

import useStore from '@src/hooks/useStore';
import { addPayment } from '@src/store/actions/UserAction';

import {
  AmexIcon,
  MaestroIcon,
  MasterCardIcon,
  VisaIcon,
} from '@src/components/icons';

import Modal from '@src/components/Modal';
import View from '@src/components/View';
import KeyboardAwareScrollView from '@src/components/KeyboardAwareScrollView';
import Text from '@src/components/Text';
import Button from '@src/components/Button';
import FormField from '@src/components/FormField';

type CardFields = CardDetails['card']
type BankFields = BankAccountDetails['bank_account']

type CardFieldsProps = {
  fields: CardFields;
  onChangeField: (key: keyof CardFields) => (text: string) => void;
}

const CardFields = ({ fields, onChangeField }: CardFieldsProps) => (
  <>
    <FormField
      placeholder="Card Number"
      value={fields.number}
      maxLength={16}
      onChangeText={onChangeField('number')}
    />
    <FormField
      placeholder="Expiration Month"
      value={fields.exp_month}
      maxLength={2}
      onChangeText={onChangeField('exp_month')}
    />
    <FormField
      placeholder="Expiration Year"
      value={fields.exp_year}
      maxLength={4}
      onChangeText={onChangeField('exp_year')}
    />
    <FormField
      placeholder="CVC"
      value={fields.cvc}
      maxLength={4}
      onChangeText={onChangeField('cvc')}
    />
    <FormField
      placeholder="Name on Card"
      value={fields.name}
      onChangeText={onChangeField('name')}
    />
  </>
);

type BankFieldProps = {
  fields: BankFields;
  onChangeField: (key: keyof BankFields) => (text: string) => void;
}

const BankFields = ({ fields, onChangeField }: BankFieldProps) => (
  <>
    <FormField
      placeholder="Account Name"
      value={fields.account_holder_name}
      onChangeText={onChangeField('account_holder_name')}
    />
    <FormField
      placeholder="Routing Number"
      maxLength={9}
      value={fields.routing_number}
      onChangeText={onChangeField('routing_number')}
    />
    <FormField
      placeholder="Account Number"
      maxLength={12}
      value={fields.account_number}
      onChangeText={onChangeField('account_number')}
    />
  </>
);

const BankCardModal = ({ isVisible, onToggle }) => {
  const { store, dispatch } = useStore();

  const isTherapist = store.user.type === 'PT';

  const [errorString, setErrorString] = useState();

  const [cardFields, setCardFields] = useState<CardFields>({
    number: '',
    exp_month: '',
    exp_year: '',
    cvc: '',
    name: '',
  });

  const [bankFields, setBankFields] = useState<BankFields>({
    country: 'US',
    currency: 'usd',
    account_holder_name: '',
    account_holder_type: 'individual',
    routing_number: '',
    account_number: '',
  });

  const onChangeCardField = (key: keyof CardFields) => (value: string) => setCardFields({
    ...cardFields,
    [key]: value,
  });

  const onChangeBankField = (key: keyof BankFields) => (value: string) => setBankFields({
    ...bankFields,
    [key]: value,
  });

  const onFormSubmit = async () => {
    const tokenInfo = isTherapist
      ? { bank_account: bankFields }
      : { card: cardFields };

    const response = await stripe.createToken(tokenInfo);

    if (response.error) {
      return setErrorString(response.error.message);
    }

    try {
      await dispatch(addPayment(response));
    } catch (e) {
      // console.log(e);
    }

    return onToggle();
  };

  return (
    <Modal
      propagateSwipe
      marginTop={50}
      bgColor="white"
      isVisible={isVisible}
      onToggle={onToggle}
    >
      <View flex={1} width="100%">
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
          <View alignCenter justifyCenter spacing={{ mx: 4 }}><MasterCardIcon /></View>
          <View alignCenter justifyCenter spacing={{ mx: 4 }}><VisaIcon /></View>
          <View alignCenter justifyCenter spacing={{ mx: 4 }}><AmexIcon /></View>
          <View alignCenter justifyCenter spacing={{ mx: 4 }}><MaestroIcon /></View>
        </View>

        <KeyboardAwareScrollView>
          <View flex={2} spacing={{ p: 3 }}>
            {isTherapist ? (
              <BankFields fields={bankFields} onChangeField={onChangeBankField} />
            ) : (
              <CardFields fields={cardFields} onChangeField={onChangeCardField} />
            )}
            {errorString && (
              <Text spacing={{ mt: 3 }} variant="errorSmall" typography={{ align: 'center' }}>
                {errorString}
              </Text>
            )}
          </View>
          <View flex={1} spacing={{ p: 3, pb: 6 }}>
            <Button onPress={onFormSubmit}>
              Add Account
            </Button>
          </View>
        </KeyboardAwareScrollView>
      </View>

    </Modal>
  );
};

export default BankCardModal;
