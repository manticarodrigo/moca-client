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
    <View row my={3} bgColor="white">
      <View p={3}>
        <PriceRateIcon />
      </View>
      <View flex={1}>
        <View py={3}>
          <Text variant="semiBoldLarge" color="dark">Price Rate</Text>
          {!readonly && (prices.length < 2 || !evaluationTariff.price) && (
            <Text variant="lightSmallest">Evaluation price and one duration price are required.</Text>
          )}
        </View>
        <View row width="100%" justifyBetween variant="borderBottom">
          <View row width="100%" pr={3}>
            {Object.entries(sessions).map(([key, duration], index) => {
              const { price = 0 } = prices.find(
                ({ sessionType }) => sessionType === key,
              ) || {};

              const isLast = index === Object.keys(sessions).length - 1;

              return (
                <View
                  key={key}
                  flex={1}
                  mb={3}
                  variant={!isLast ? 'borderRight' : null}
                >
                  <View alignCenter>
                    <Text variant="regularSmall" color="grey">
                      {duration}
                      min
                    </Text>
                    <View pt={1} onPress={!readonly && onPressPrice(key, price)}>
                      <Text variant="title" size={5} color="secondary">
                        {price ? `$${price}` : status}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
        <View row justifyBetween alignCenter py={3} pr={5}>
          <Text variant="regularSmall" color="grey">First time evaluation price</Text>
          <View
            alignEnd
            onPress={!readonly && onPressPrice('evaluation', evaluationTariff.price)}
          >
            <Text variant="title" size={5} color="secondary">
              {evaluationTariff.price ? `$${evaluationTariff.price}` : status}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfilePriceTableCard;
