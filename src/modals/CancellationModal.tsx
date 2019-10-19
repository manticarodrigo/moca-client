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
    console.log('SUBMIT CANCELLATION');
  };

  return (
    <Modal
      isVisible={visible}
      onToggle={onToggle}
      propagateSwipe
    >
      <View
        alignCenter
        spacing={{ p: 4 }}
        variant="borderBottom"
        width="100%"
        bgColor="white"
      >
        <Text variant="titleDark">Choose your reason</Text>
        <Text variant="titleDark">for cancellation.</Text>
      </View>
      <View scroll width="100%" style={{ flex: 0 }} spacing={{ p: 4 }}>
        <View>
          {Object.entries(cancellationReasons).map(([key, reason]) => (
            <View
              key={reason.title}
              spacing={{ p: 3, my: 1 }}
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
                <View flex={1} justifyCenter spacing={{ px: 3 }}>
                  <Text numberOfLines={2} variant="titleSmallDark">
                    {reason.title}
                  </Text>
                </View>
                <View justifyCenter>
                  {opened[key] ? <ArrowUp /> : <ArrowDown />}
                </View>

              </View>
              {opened[key] && (
                <Text variant="smallDark" spacing={{ mt: 2 }}>{reason.details}</Text>
              )}
            </View>
          ))}
        </View>
        <View spacing={{ py: 4, pb: 6 }}>
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
