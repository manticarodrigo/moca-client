/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useMemo } from 'react';
import { Picker } from 'react-native';
import { format, parseISO, addMinutes, isToday } from 'date-fns';

import { getDateForString } from '@src/utlities/dates';

import { UserState } from '@src/store/reducers/UserReducer';
import { sendAppointmentRequest } from '@src/store/actions/ConversationAction';

import useStore from '@src/hooks/useStore';

import { WINDOW_WIDTH } from '@src/utlities/constants';
import { Colors } from '@src/styles';

import CalendarList from '@src/components/CalendarList';
import Modal from '@src/components/Modal';
import View from '@src/components/View';
import Text from '@src/components/Text';
import Button from '@src/components/Button';
import Toast from '@src/components/Toast';

type ToastState = {
  type: 'success' | 'error';
  message: string;
}

type Props = {
  visible: boolean;
  patient: UserState;
  onClose: () => void;
};


const getTimes = (initialHour = 0, initialQuarterHour = 0) => {
  const quarterHours = ['00', '15', '30', '45'];
  const times = [];

  for (let i = initialHour; i < 24; i += 1) {
    for (let j = i === initialHour ? initialQuarterHour : 0; j < 4; j += 1) {
      let label;

      if (i < 12) {
        label = `${i === 0 ? 12 : i}:${quarterHours[j]}am`;
      } else if (i === 12) {
        label = `${i}:${quarterHours[j]}pm`;
      } else {
        label = `${i - 12}:${quarterHours[j]}pm`;
      }

      times.push({ label, value: `${i > 10 ? i : `0${i}`}:${quarterHours[j]}` });
    }
  }

  return times;
};

const sessionDuration: { [key: string]: number } = {
  evaluation: 60,
  thirty: 30,
  fourtyfive: 45,
  sixty: 60,
};

const getMarkedDate = (date) => {
  const dateMap = {};

  const formattedDate = format(new Date(parseISO(date)), 'yyyy-MM-dd');

  dateMap[formattedDate] = {
    startingDay: true,
    endingDay: true,
    color: Colors.secondaryLight,
    textColor: Colors.white,
  };

  return dateMap;
};

const AppointmentRequestModal = ({ visible, patient, onClose }: Props) => {
  const { store, dispatch } = useStore();

  const durationOptions = useMemo(() => (
    [
      { label: 'Evaluation', value: 'evaluation' },
      { label: '30min', value: 'thirty' },
      { label: '45min', value: 'fourtyfive' },
      { label: '60min', value: 'sixty' },
    ].filter(
      ({ value }) => store.user.prices.find(({ sessionType }) => value === sessionType),
    )
  ), [store.user.prices]);

  const [selectedSession, setSelectedSession] = useState(durationOptions[0].value);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  const markedDates = useMemo(() => {
    let dateMap = {};

    if (selectedDate) {
      dateMap = getMarkedDate(selectedDate);
    }

    return dateMap;
  }, [selectedDate]);

  const timeOptions = useMemo(() => {
    let currentHour = 0;
    let currentQuarterHour = 0;

    if (isToday(getDateForString(selectedDate))) {
      currentHour = new Date().getHours();
      currentQuarterHour = new Date().getMinutes();
      currentQuarterHour = Math.ceil(currentQuarterHour / 60) * 4;
    }

    return getTimes(currentHour, currentQuarterHour);
  }, [selectedDate]);

  const [selectedTime, setSelectedTime] = useState(timeOptions[0].value);
  const [toastState, setToastState] = useState<ToastState>();

  const isButtonDisabled = !selectedSession || !selectedTime || !selectedDate;

  const submitAppointment = async (data) => {
    try {
      await dispatch(sendAppointmentRequest(patient.id, data));
      setToastState({
        type: 'success',
        message: 'The appointment request has been created successfully.',
      });
      setTimeout(onClose, 2000);
    } catch (e) {
      const { nonFieldErrors } = e.response.data;

      let message = 'There was an issue adding the appointment request.';

      if (nonFieldErrors && nonFieldErrors.length) {
        const [errorMessage] = nonFieldErrors;
        message = errorMessage;
      }

      setToastState({ type: 'error', message });
    }
  };

  const onDayPress = ({ dateString }) => setSelectedDate(dateString);

  const onPressSubmit = () => {
    const localStartDate = getDateForString(selectedDate, selectedTime);
    const localEndDate = addMinutes(localStartDate, sessionDuration[selectedSession]);

    const data = {
      startTime: localStartDate.toISOString(),
      endTime: localEndDate.toISOString(),
      sessionType: selectedSession,
    };

    submitAppointment(data);
  };

  return (
    <Modal
      propagateSwipe
      isVisible={visible}
      onToggle={onClose}
    >
      <View alignCenter pb={6}>
        <View row>
          <View alignCenter justifyCenter flex={1} pb={3} variant="borderBottom">
            <Text variant="semiBoldLarge">
              Create Appointment
            </Text>
          </View>
        </View>

        <View row variant="borderBottom">
          <Picker
            style={{ height: 200, width: WINDOW_WIDTH / 2 }}
            selectedValue={selectedSession}
            onValueChange={(value) => setSelectedSession(value)}
          >
            {durationOptions.map((option) => (
              <Picker.Item key={option.value} {...option} />
            ))}
          </Picker>
          <Picker
            style={{ height: 200, width: WINDOW_WIDTH / 2 }}
            selectedValue={selectedTime}
            onValueChange={(value) => setSelectedTime(value)}
          >
            {timeOptions.map((option) => (
              <Picker.Item key={option.value} {...option} />
            ))}
          </Picker>
        </View>

        <View flex={1}>
          <CalendarList
            onDayPress={onDayPress}
            markedDates={markedDates}
          />
        </View>

        <View p={4} width={WINDOW_WIDTH} variant="borderTop">
          <Button
            disabled={isButtonDisabled}
            variant={isButtonDisabled ? 'primaryDisabled' : 'primary'}
            onPress={onPressSubmit}
          >
            Submit Appointment
          </Button>
        </View>
      </View>

      {!!toastState && (
        <Toast
          schedule={toastState.type === 'success'}
          error={toastState.type === 'error'}
          onClose={() => setToastState(undefined)}
        >
          {toastState.message}
        </Toast>
      )}

    </Modal>
  );
};

export default AppointmentRequestModal;
