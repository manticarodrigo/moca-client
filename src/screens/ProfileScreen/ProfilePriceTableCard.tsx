import React from 'react';

import useStore from '@src/hooks/useStore';

import { Colors } from '@src/styles';

import { PriceRateIcon } from '@src/components/icons';

import View from '@src/components/View';
import Text from '@src/components/Text';
import InputModal from '@src/modals/InputModal';

import { validatePrice } from '@src/utlities/validations';

const sessions = { thirty: '30', fortyfive: '45', sixty: '60' };

export const PriceModal = ({ visible, type, existingValue = '', onClose, onSubmit }) => (
  <InputModal
    visible={visible}
    title={`${sessions[type]} Minute Session Price`}
    placeholder="Price"
    existingValue={existingValue}
    maxLength={3}
    keyboardType="number-pad"
    validate={validatePrice}
    error="Please enter a valid price"
    buttonText="Price"
    buttonActionText
    onSubmit={(value) => onSubmit(type, value)}
    onClose={onClose}
  />
);

const ProfilePriceTableCard = ({ readonly, onOpenPriceModal }) => {
  const { store } = useStore();

  const evaluationTariff = store.user.tariffs.find(
    ({ sessionType }) => sessionType === 'evaluation',
  ) || { price: 0 };

  const status = readonly ? 'N/A' : 'Set';

  const onPressPrice = (key: string, price: number) => () => onOpenPriceModal({
    type: key,
    existingValue: price,
  });

  return (
    <View spacing={{ my: 3 }} bgColor="white">
      <View row>
        <View spacing={{ p: 3 }}>
          <PriceRateIcon />
        </View>
        <View column flex={1}>
          <View row alignCenter spacing={{ py: 3 }}>
            <Text variant="boldDark">Price Rate</Text>
          </View>
          <View
            row
            width="100%"
            spacing={{ pr: 3, pb: 3 }}
            style={{ borderBottomWidth: 1, borderColor: Colors.secondaryLightest }}
          >
            <>
              {Object.entries(sessions).map(([key, duration]) => {
                const { price = 0 } = store.user.tariffs.find(
                  ({ sessionType }) => sessionType === key,
                ) || {};

                return (
                  <View
                    key={key}
                    flex={1}
                    column
                    alignCenter
                    style={{ borderRightWidth: 1, borderColor: Colors.secondaryLightest }}
                  >
                    <View>
                      <Text variant="regularSmallGrey">
                        {duration}
                        min
                      </Text>
                    </View>
                    <View
                      spacing={{ pt: 2 }}
                      onPress={!readonly && onPressPrice(key, price)}
                    >
                      <Text variant="titleSecondaryLarge">
                        {price ? `$${price}` : status}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </>
          </View>
          <View row alignCenter height={65}>
            <View flex={2}>
              <Text variant="regularSmallGrey">First time evaluation price</Text>
            </View>
            <View
              flex={1}
              onPress={!readonly && onPressPrice('evaluation', evaluationTariff.price)}
            >
              <Text variant="titleSecondaryLarge">
                {evaluationTariff.price || status}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfilePriceTableCard;
