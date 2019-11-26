/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { format, differenceInSeconds } from 'date-fns';

import { AppointmentStatusEnum } from '@src/services/openapi';
import { Appointment } from '@src/store/reducers/AppointmentReducer';

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

type Props = {
  visible: boolean;
  appointment: Appointment;
  onEnd: () => void;
}

const Timer = ({ visible, appointment, onEnd }: Props) => {
  const { store, dispatch } = useStore();
  const { startTime, endTime, status } = appointment || {};
  const [secondsCounter, setSecondsCounter] = useState(0);

  const timer = useRef<NodeJS.Timer>();

  const isTherapist = store.user.type === 'PT';
  const inProgress = status === AppointmentStatusEnum.InProgress;

  const mounted = useRef(true);

  const { minutesStr, secondsStr } = useMemo(() => {
    const minutes = Math.floor(secondsCounter / 60);
    const seconds = secondsCounter - minutes * 60;

    return {
      minutesStr: minutes.toString().length === 1 ? `0${minutes}` : minutes,
      secondsStr: seconds.toString().length === 1 ? `0${seconds}` : seconds,
    };
  }, [secondsCounter]);

  const getUpdatedSeconds = () => {
    const totalSeconds = differenceInSeconds(new Date(endTime), new Date(startTime));
    const elapsedSeconds = differenceInSeconds(new Date(), new Date(startTime));

    const remainingSeconds = totalSeconds - elapsedSeconds;

    const updatedSeconds = inProgress ? remainingSeconds : totalSeconds;

    return { totalSeconds, elapsedSeconds, updatedSeconds };
  };


  const pauseTimer = () => clearInterval(timer.current);

  const startTimer = () => {
    if (!mounted.current) return;

    const { updatedSeconds } = getUpdatedSeconds();
    setSecondsCounter(updatedSeconds);

    const interval = setInterval(() => {
      if (mounted.current) {
        setSecondsCounter((counter) => counter - 1);
      } else {
        pauseTimer();
      }
    }, 1000);

    timer.current = interval;
  };

  const onPressStart = async () => {
    await dispatch(startAppointment(appointment.id));
  };

  const onPressEnd = async () => {
    await dispatch(endAppointment(appointment.id));
    dispatch(getUpcomingAppointments());

    pauseTimer();
    onEnd();
  };

  useEffect(() => {
    if (!mounted.current || !visible) return;
    const { updatedSeconds } = getUpdatedSeconds();
    setSecondsCounter(updatedSeconds);
  }, [visible, startTime, endTime]);

  useEffect(() => {
    if (visible && inProgress) {
      // eslint-disable-next-line no-undef
      startTimer();
    }

    if (!visible) {
      pauseTimer();
    }
  }, [visible, inProgress]);

  const scheduledTimeString = useMemo(
    () => startTime && format(new Date(startTime), 'hh:mm aaaa'), [startTime],
  );

  return visible ? (
    <View alignCenter>
      <View
        row
        alignCenter
        py={3}
        px={4}
        variant="borderBottom"
        bgColor={inProgress ? 'secondary' : 'white'}
      >
        <View flex={1} alignCenter>
          {inProgress && (
            <View style={{ ...StyleSheet.absoluteFillObject }} justifyCenter alignCenter>
              <TimerBackgroundIcon />
            </View>
          )}
          <Text
            variant="title"
            color={inProgress ? 'white' : 'secondary'}
            size={1}
          >
            {`Scheduled Time - ${scheduledTimeString}`}
          </Text>
          <View row py={2}>
            <Text
              variant="semiBoldLarge"
              color={inProgress ? 'white' : 'semiGreyAlt'}
              size={9}
            >
              {`${minutesStr}:${secondsStr}`}
            </Text>
          </View>
        </View>
      </View>

      {isTherapist && (
        <View row py={6} px={5}>
          <View flex={1}>
            {inProgress ? (
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
  ) : null;
};

export default Timer;
