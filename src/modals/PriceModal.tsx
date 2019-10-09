import React, { useState } from 'react';

import FormField from '@src/components/FormField';
import View from '@src/components/View';
import Button from '@src/components/Button';
import Text from '@src/components/Text';

import { validatePrice } from '@src/utlities/validations';
import { updateUser } from '@src/store/actions/UserAction';

import useStore from '@src/hooks/useStore';

type PriceModalProps = {
  closePriceModal: () => void;
  priceSelection: string;
};

const PriceModal = (
  { closePriceModal, priceSelection }: PriceModalProps,
) => {
  const { store: { user }, dispatch } = useStore();

  const [price, setPrice] = useState(user[priceSelection] ? user[priceSelection] : '');
  const [isPriceValid, setIsPriceValid] = useState(true);


  const isButtonDisabled = price === '' || !isPriceValid;
  const buttonText = user[priceSelection] ? 'Update' : 'Add';

  const handleButtonPress = () => {
    if (validatePrice(price)) {
      setIsPriceValid(true);
      // api call
      dispatch(updateUser({ [priceSelection]: price }));
      closePriceModal();
    } else { setIsPriceValid(false); }
  };

  return (
    <View alignCenter spacing={{ mx: 3 }}>
      <FormField
        spacing={{ mt: 6 }}
        placeholder="price"
        value={price}
        returnKeyType="done"
        keyboardType="number-pad"
        onChangeText={(text) => {
          setPrice(text);
          setIsPriceValid(true);
        }}
      />
      {!isPriceValid
        && (
        <Text spacing={{ mt: 1 }} variant="errorSmall">
          Please enter a valid price
        </Text>
        )}
      <View row>
        <View flex={1}>
          <Button
            spacing={{ mt: 3 }}
            variant={isButtonDisabled ? 'primaryDisabled' : 'primary'}
            onPress={handleButtonPress}
            disabled={isButtonDisabled}
          >
            {buttonText}
          </Button>
        </View>
      </View>
    </View>
  );
};

PriceModal.navigationOptions = {
  header: null,
};

export default PriceModal;
