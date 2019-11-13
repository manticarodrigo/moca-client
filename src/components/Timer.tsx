import React, { useState, useRef, useMemo, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { format, differenceInMinutes, differenceInSeconds } from 'date-fns';

import {
  startAppointment,
  endAppointment,
  getUpcomingAppointments,
} from '@src/store/actions/AppointmentAction';

import useStore from '@src/hooks/useStore';

import { TimerBackgroundIcon } from '@src/components/icons';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Button from '@src/components/Button';
import { AppointmentStatusEnum } from '@src/services/openapi';

const Timer = ({ focused, isTherapist, appointment, onEnd }) => {
  const { dispatch } = useStore();
  const { startTime, endTime, status } = appointment || {};
  const [secondsCounter, setSecondsCounter] = useState(0);
  const [didTimeStart, setDidTimeStart] = useState(false);

  const mounted = useRef(true);

  const timer = useRef<NodeJS.Timer>();

  const minutes = Math.floor(secondsCounter / 60);
  const seconds = secondsCounter - minutes * 60;

  const minutesFormated = minutes.toString().length === 1 ? `0${minutes}` : minutes;
  const secondsFormated = seconds.toString().length === 1 ? `0${seconds}` : seconds;

  const inProgress = status === AppointmentStatusEnum.InProgress;

  const pauseTimer = () => clearInterval(timer.current);

  const startTimer = () => {
    if (mounted.current && !timer.current && !didTimeStart) {
      setDidTimeStart(true);

      const interval = setInterval(() => {
        if (mounted.current) {
          setSecondsCounter((counter) => counter - 1);
        } else {
          pauseTimer();
        }
      }, 1000);

      timer.current = interval;
    }
  };

  const onPressStart = async () => {
    await dispatch(startAppointment(appointment.id));
    startTimer();
  };

  const onPressEnd = async () => {
    await dispatch(endAppointment(appointment.id));
    dispatch(getUpcomingAppointments());

    pauseTimer();
    onEnd();
  };

  useEffect(() => {
    const totalMinutes = differenceInMinutes(new Date(endTime), new Date(startTime));
    const elapsed = differenceInSeconds(new Date(), new Date(startTime));

    let updated = (totalMinutes * 60);
    if (inProgress) {
      updated -= elapsed;
    }

    if (mounted.current) {
      setSecondsCounter(updated);
    }
  }, [focused, startTime, endTime]);

  useEffect(() => {
    if (secondsCounter === 1) {
      onPressEnd();
    }
  }, [secondsCounter]);

  useEffect(() => {
    if (!focused) {
      pauseTimer();
    }
  }, [focused]);

  useEffect(() => {
    if (!didTimeStart && inProgress) {
      startTimer();
    }
  }, [didTimeStart, inProgress]);

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
              variant="semiBoldLarge"
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
              <Button width="100%" onPress={onPressEnd}>End Session</Button>
            ) : (
              <Button shadow width="100%" variant="secondaryBig" onPress={onPressStart}>
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
