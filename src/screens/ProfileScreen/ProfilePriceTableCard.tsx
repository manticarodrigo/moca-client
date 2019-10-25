import React from 'react';

import useStore from '@src/hooks/useStore';

import { PriceRateIcon } from '@src/components/icons';

import View from '@src/components/View';
import Text from '@src/components/Text';
import InputModal from '@src/modals/InputModal';

const sessions = { thirty: '30', fourtyfive: '45', sixty: '60' };

const sessionLabels = {
  thirty: '30min',
  fourtyfive: '45min',
  sixty: '60min',
  evaluation: 'Evaluation',
};

export const PriceModal = ({ visible, type, existingValue = '', onClose, onSubmit }) => (
  <InputModal
    visible={visible}
    title={type && `${sessionLabels[type]} Session Price`}
    placeholder="Price"
    existingValue={existingValue ? existingValue.toString() : ''}
    maxLength={3}
    keyboardType="number-pad"
    validation="number"
    buttonText="Price"
    buttonActionText
    onSubmit={(value) => onSubmit(type, value)}
    onClose={onClose}
  />
);

const ProfilePriceTableCard = ({ readonly, existing, onOpenPriceModal }) => {
  const { store } = useStore();

  const prices = existing || store.user.prices;

  const evaluationTariff = prices.find(
    ({ sessionType }) => sessionType === 'evaluation',
  ) || { price: 0 };

  const status = readonly ? 'N/A' : 'Set';

  const onPressPrice = (key: string, price: number) => () => onOpenPriceModal({
    type: key,
    existingValue: price,
  });

  return (
    <View row spacing={{ my: 3 }} bgColor="white">
      <View spacing={{ p: 3 }}>
        <PriceRateIcon />
      </View>
      <View flex={1}>
        <View row alignCenter spacing={{ py: 3 }}>
          <Text variant="boldDark">Price Rate</Text>
        </View>
        <View row width="100%" justifyBetween variant="borderBottom">
          <View row width="100%" spacing={{ pr: 3 }}>
            {Object.entries(sessions).map(([key, duration], index) => {
              const { price = 0 } = prices.find(
                ({ sessionType }) => sessionType === key,
              ) || {};

              const isLast = index === Object.keys(sessions).length - 1;

              return (
                <View
                  key={key}
                  flex={1}
                  spacing={{ mb: 3 }}
                  variant={!isLast ? 'borderRight' : null}
                >
                  <View alignCenter>
                    <Text variant="regularSmallGrey">
                      {duration}
                      min
                    </Text>
                    <View
                      spacing={{ pt: 1 }}
                      onPress={!readonly && onPressPrice(key, price)}
                    >
                      <Text variant="titleSecondaryLarge">
                        {price ? `$${price}` : status}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
        <View row justifyBetween alignCenter spacing={{ py: 3, pr: 5 }}>
          <Text variant="regularSmallGrey">First time evaluation price</Text>
          <View
            alignEnd
            onPress={!readonly && onPressPrice('evaluation', evaluationTariff.price)}
          >
            <Text variant="titleSecondaryLarge">
              {`$${evaluationTariff.price}` || status}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfilePriceTableCard;
