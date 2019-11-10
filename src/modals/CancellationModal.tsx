import React, { useState } from 'react';

import { ArrowDown, ArrowUp } from '@src/components/icons';

import { Checkbox } from '@src/components/Checkbox';
import View from '@src/components/View';
import Text from '@src/components/Text';
import Button from '@src/components/Button';
import Modal from '@src/components/Modal';

const cancellationReasons = {
  standard: {
    title: 'Standard Cancellation Policy',
    details: 'For a full refund, cancel at least 24 hours before your session is scheduled to begin. If cancelling within 24 hours of the scheduled session, you will be charged 50% of the agreed-upon session cost.',
  },
  rescheduling: {
    title: 'Rescheduling',
    details: 'You can reschedule the date or time of your session up to 48 hours before the session is scheduled to start. If you reschedule the session, the cancellation policy is based on the original purchase time and original start date of the experience.',
  },
  weather: {
    title: 'Cancellation Due to Weather',
    details: 'For a full refund, cancel at least 24 hours before your session is scheduled to begin. If cancelling within 24 hours of the scheduled session, you will be charged 50% of the agreed-upon session cost.',
  },
  emergency: {
    title: 'Cancellation Due to an Emergency',
    details: 'For a full refund, cancel at least 24 hours before your session is scheduled to begin. If cancelling within 24 hours of the scheduled session, you will be charged 50% of the agreed-upon session cost.',
  },
};

type CancellactionType = keyof typeof cancellationReasons;

const CancellationModal = ({ visible, onToggle }) => {
  const [opened, setOpened] = useState<{ [key in CancellactionType]: boolean }>({
    standard: false,
    rescheduling: false,
    weather: false,
    emergency: false,
  });

  const [checked, setChecked] = useState<CancellactionType>();


  const onPressAccordion = (key) => setOpened({ ...opened, [key]: !opened[key] });

  const onClickCheckbox = (key) => setChecked(key !== checked ? key : undefined);

  const onSubmit = () => {
    // cancel api
  };

  return (
    <Modal
      isVisible={visible}
      onToggle={onToggle}
      propagateSwipe
    >
      <View
        alignCenter
        p={4}
        variant="borderBottom"
        width="100%"
        bgColor="white"
      >
        <Text variant="title" color="dark">Choose your reason</Text>
        <Text variant="title" color="dark">for cancellation.</Text>
      </View>
      <View scroll width="100%" flex={0} p={4}>
        <View>
          {Object.entries(cancellationReasons).map(([key, reason]) => (
            <View
              key={reason.title}
              my={1}
              p={3}
              variant="roundedBorderGrey"
              onPress={() => onPressAccordion(key)}
            >
              <View row>
                <View row alignCenter>
                  <Checkbox
                    checked={checked === key}
                    onChange={() => onClickCheckbox(key)}
                  />
                </View>
                <View justifyCenter flex={1} px={3}>
                  <Text numberOfLines={2} variant="semiBoldLarge" color="dark">
                    {reason.title}
                  </Text>
                </View>
                <View justifyCenter>
                  {opened[key] ? <ArrowUp /> : <ArrowDown />}
                </View>

              </View>
              {opened[key] && (
                <Text variant="light" color="dark" mt={2}>{reason.details}</Text>
              )}
            </View>
          ))}
        </View>
        <View py={4} pb={6}>
          <Button
            variant={checked ? 'primary' : 'primaryDisabled'}
            disabled={!!checked}
            onPress={onSubmit}
          >
            Continue
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default CancellationModal;
