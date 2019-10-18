import React, { useState } from 'react';

import View from '@src/components/View';
import Text from '@src/components/Text';
import ModalView from '@src/components/ModalView';
import { Checkbox } from '@src/components/Checkbox';
import { Dimensions } from 'react-native';

import { ArrowDown, ArrowUp } from '@src/components/icons';
import Button from '@src/components/Button';

const CancellationModal = ({ visible, onToggle }) => {
  const [isOpen, setIsOpen] = useState([]);
  const [checked, setChecked] = useState(null);

  const cancellationReasons = [
    {
      title: 'Standard Cancellation Policy',
      details: 'For a full refund, cancel at least 24 hours before your session is scheduled to begin.If cancelling within 24 hours of the scheduled session, you will be charged 50% of the agreed-upon session cost.',
    },
    {
      title: 'Rescheduling',
      details: 'You can reschedule the date or time of your session up to 48 hours before the session is scheduled to start. If you reschedule the session, the cancellation policy is based on the original purchase time and original start date of the experience.',
    },
    {
      title: 'Cancellation Due to Weather',
      details: 'For a full refund, cancel at least 24 hours before your session is scheduled to begin.If cancelling within 24 hours of the scheduled session, you will be charged 50% of the agreed-upon session cost.',
    },
    {
      title: 'Cancellation Due to an Emergency',
      details: 'For a full refund, cancel at least 24 hours before your session is scheduled to begin.If cancelling within 24 hours of the scheduled session, you will be charged 50% of the agreed-upon session cost.',
    },
  ];

  const handlePress = (key) => {
    const newIsOpen = [...isOpen];
    const index = isOpen.indexOf(key);
    if (index !== -1) {
      newIsOpen.splice(index, 1);
    } else {
      newIsOpen.push(key);
    }
    setIsOpen(newIsOpen);
  };

  const handleOptionPress = (key) => {
    // setIsOpen(!isOpen);
  };

  const handleCheckBoxClick = (index) => {
    setChecked(index);
  };

  return (
    <ModalView
      isVisible={visible}
      handleArrowClick={onToggle}
      onBackdropPress={onToggle}
    >
      <View>
        <View
          variant="borderBottom"
          alignCenter
          bgColor="white"
          spacing={{ p: 5, pb: 2 }}
          width={Dimensions.get('window').width}
        >
          <Text variant="titleDark">Choose your reason</Text>
          <Text variant="titleDark">for cancellation.</Text>
        </View>
        <View scroll spacing={{ p: 3, pb: 3 }}>
          <View>
            {cancellationReasons.map((reason) => (
              <View
                variant="roundedBorderGrey"
                spacing={{ p: 3, my: 1 }}
                key={reason.title}
                onPress={() => handlePress(cancellationReasons.indexOf(reason))}
              >
                <View row justifyBetween>
                  <View row>
                    <Checkbox
                      checked={checked === (cancellationReasons.indexOf(reason) + 1)}
                      onChange={() => handleCheckBoxClick((cancellationReasons.indexOf(reason) + 1))}
                    />
                    <Text variant="titleSmallDark" spacing={{ p: 1, ml: 1 }}>{reason.title}</Text>
                  </View>
                  <View spacing={{ mt: 2 }}>
                    {isOpen.includes(cancellationReasons.indexOf(reason)) ? <ArrowUp /> : <ArrowDown />}
                  </View>

                </View>
                {isOpen.includes(cancellationReasons.indexOf(reason)) && <Text variant="smallDark" spacing={{ mt: 2 }}>{reason.details}</Text>}
              </View>
            ))}
          </View>
          <Button
            variant={checked ? 'primary' : 'primaryDisabled'}
            disabled={!!checked}
            spacing={{ mt: 8 }}
          >
            Continue
          </Button>
        </View>
      </View>
    </ModalView>
  );
};

export default CancellationModal;
