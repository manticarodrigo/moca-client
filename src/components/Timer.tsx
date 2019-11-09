import React, { useState, useRef, useMemo, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { format, differenceInMinutes, differenceInSeconds } from 'date-fns';

import { TimerBackgroundIcon } from '@src/components/icons';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Button from '@src/components/Button';

const Timer = ({ focused, isTherapist, appointment, onEnd }) => {
  const { startTime, endTime } = appointment || {};
  const [secondsCounter, setSecondsCounter] = useState(0);
  const [didTimeStart, setDidTimeStart] = useState(false);

  const mounted = useRef(true);

  const timer = useRef<NodeJS.Timer>();

  const minutes = Math.floor(secondsCounter / 60);
  const seconds = secondsCounter - minutes * 60;

  const minutesFormated = minutes.toString().length === 1 ? `0${minutes}` : minutes;
  const secondsFormated = seconds.toString().length === 1 ? `0${seconds}` : seconds;

  const onStart = () => {
    if (mounted.current) {
      setDidTimeStart(true);

      const interval = setInterval(() => {
        setSecondsCounter((counter) => counter - 1);
      }, 1000);

      timer.current = interval;
    }
  };

  const onPause = () => clearInterval(timer.current);

  const handleEnd = () => {
    onPause();
    onEnd();
  };

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => onPause();
  }, []);

  useEffect(() => {
    const totalMinutes = differenceInMinutes(new Date(endTime), new Date(startTime));
    const elapsed = differenceInSeconds(new Date(), new Date(startTime));

    if (mounted.current) {
      setSecondsCounter((totalMinutes * 60) - elapsed);
    }
  }, [focused, startTime, endTime]);

  useEffect(() => {
    if (secondsCounter === 1) {
      handleEnd();
    }
  }, [secondsCounter]);

  useEffect(() => {
    if (focused) {
      onStart();
    } else {
      onPause();
    }
  }, [focused]);

  const scheduledTimeString = useMemo(
    () => startTime && format(new Date(startTime), 'hh:mm aaaa'), [startTime],
  );

  return (
    <View alignCenter>
      <View
        row
        alignCenter
        py={3}
        px={4}
        variant="borderBottom"
        bgColor={didTimeStart ? 'secondary' : 'white'}
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
          <View row py={2}>
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
        <View row py={6} px={5}>
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
  );
};

export default Timer;
