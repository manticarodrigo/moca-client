import React, { useState, useRef, useMemo, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { format, differenceInMinutes, differenceInSeconds } from 'date-fns';

import { WINDOW_WIDTH } from '@src/utlities/constants';

import { TimerBackgroundIcon } from '@src/components/icons';

import Modal from '@src/components/Modal';
import View from '@src/components/View';
import AppointmentHeader from '@src/components/AppointmentHeader';
import SegmentedControl from '@src/components/SegmentedControl';
import Text from '@src/components/Text';
import Button from '@src/components/Button';

const TimerModal = ({
  visible,
  isTherapist,
  appointment,
  onOpenNotes,
  onEnd,
  onClose,
}) => {
  const { startTime, endTime } = appointment || {};
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
      setSecondsCounter((counter) => counter - 1);
    }, 1000);

    timer.current = interval;
  };

  const onPause = () => clearInterval(timer.current);

  const handleClose = () => {
    onPause();
    onClose();
  };

  const handleEnd = () => {
    onPause();
    onEnd();
  };

  const handleOpenNotes = () => {
    handleClose();

    setTimeout(onOpenNotes, 1000);
  };

  useEffect(() => {
    const totalMinutes = differenceInMinutes(new Date(endTime), new Date(startTime));
    const elapsed = differenceInSeconds(new Date(), new Date(startTime));

    setSecondsCounter((totalMinutes * 60) - elapsed);
  }, [startTime, endTime, visible]);

  useEffect(() => {
    if (secondsCounter === 1) {
      handleEnd();
    }
  }, [secondsCounter]);

  useEffect(() => {
    if (visible) {
      onStart();
    } else {
      onPause();
    }
  }, [visible]);

  const scheduledTimeString = useMemo(
    () => startTime && format(new Date(startTime), 'hh:mm aaaa'), [startTime],
  );

  return (
    <Modal isVisible={visible} onToggle={handleClose}>
      <View width={WINDOW_WIDTH} variant="borderBottom">
        <View row spacing={{ py: 2, px: 4 }}>
          <AppointmentHeader
            minimal={isTherapist}
            isTherapist={isTherapist}
            appointment={appointment}
          />
        </View>
        {isTherapist && (
          <SegmentedControl
            light
            selected="timer"
            options={[{ value: 'timer', label: 'Timer' }, { value: 'notes', label: 'Notes' }]}
            onChange={handleOpenNotes}
          />
        )}
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
              variant="title"
              color={didTimeStart ? 'white' : 'secondary'}
              size={1}
            >
              {`Scheduled Time - ${scheduledTimeString}`}
            </Text>
            <View row spacing={{ py: 2 }}>
              <Text
                variant="semiBold"
                color={didTimeStart ? 'white' : 'semiGreyAlt'}
                size={9}
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
