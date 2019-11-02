import React, { useState, useRef, useMemo, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { format } from 'date-fns';

import { TimerBackgroundIcon } from '@src/components/icons';

import Modal from '@src/components/Modal';
import Text from '@src/components/Text';
import View from '@src/components/View';
import Button from '@src/components/Button';
import AppointmentHeader from '@src/components/AppointmentHeader';

const TimerModal = ({
  visible,
  isTherapist,
  appointment,
  onEnd,
  onClose,
}) => {
  const { startTime } = appointment || {};
  const [secondsCounter, setSecondsCounter] = useState(0);
  const [didTimeStart, setDidTimeStart] = useState(false);

  const timer = useRef<NodeJS.Timer>();

  const minutes = Math.floor(secondsCounter / 60);
  const seconds = secondsCounter - minutes * 60;

  const minutesFormated = minutes.toString().length === 1 ? `0${minutes}` : minutes;
  const secondsFormated = seconds.toString().length === 1 ? `0${seconds}` : seconds;

  const onStart = () => {
    setDidTimeStart(true);

    const interval = setInterval(() => {
      setSecondsCounter((counter) => counter + 1);
    }, 1000);

    timer.current = interval;
  };

  const onPause = () => clearInterval(timer.current);

  const handleEnd = () => {
    onPause();
    onEnd();
  };

  useEffect(() => {
    if (visible) {
      onStart();

      // if (!isTherapist) {
      //   setTimeout(handleEnd, 3000);
      // }
    } else {
      onPause();
    }
  }, [visible]);

  const scheduledTimeString = useMemo(
    () => startTime && format(new Date(startTime), 'hh:mm aaaa'), [startTime],
  );

  return (
    <Modal isVisible={visible} onToggle={onClose}>
      <View row spacing={{ py: 2, px: 4 }} variant="borderBottom">
        <AppointmentHeader isTherapist={isTherapist} appointment={appointment} />
      </View>
      <View alignCenter>
        <View
          row
          variant="borderBottom"
          alignCenter
          bgColor={didTimeStart ? 'secondary' : 'white'}
          spacing={{ py: 3, px: 4 }}
        >
          <View flex={1} alignCenter>
            {!!didTimeStart && (
              <View style={{ ...StyleSheet.absoluteFillObject }} justifyCenter alignCenter>
                <TimerBackgroundIcon />
              </View>
            )}
            <Text
              variant={didTimeStart ? 'titleWhite' : 'titleSecondary'}
              typography={{ size: 1 }}
            >
              {`Scheduled Time - ${scheduledTimeString}`}
            </Text>
            <View row spacing={{ py: 2 }}>
              <Text
                variant={didTimeStart ? 'boldWhite' : 'boldSemiGreyAlt'}
                typography={{ size: 9 }}
              >
                {`${minutesFormated}:${secondsFormated}`}
              </Text>
            </View>
          </View>
        </View>

        {isTherapist && (
          <View row spacing={{ py: 6, px: 5 }}>
            <View flex={1}>
              {didTimeStart ? (
                <Button width="100%" onPress={handleEnd}>End Session</Button>
              ) : (
                <Button shadow width="100%" variant="secondaryBig" onPress={onStart}>
                  Begin Session
                </Button>
              )}
            </View>
          </View>
        )}

      </View>
    </Modal>
  );
};

export default TimerModal;
