/* eslint-disable radix */
/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useMemo } from 'react';
import { Picker } from 'react-native';
import { format, parseISO, addMinutes } from 'date-fns';

import { WINDOW_WIDTH } from '@src/utlities/constants';

import { Colors } from '@src/styles';

import CalendarList from '@src/components/CalendarList';
import Modal from '@src/components/Modal';
import View from '@src/components/View';
import Text from '@src/components/Text';
import Button from '@src/components/Button';

type DateRange = {
  start_time: Date;
  end_time: Date;
}

type Props = {
  visible: boolean;
  onSubmit: (data: DateRange) => void;
  onClose: () => void;
};


const getTimes = () => {
  const quarterHours = ['00', '15', '30', '45'];
  const times = [];

  for (let i = 0; i < 24; i += 1) {
    for (let j = 0; j < 4; j += 1) {
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

const durationOptions = [
  { label: '30min', value: 30 },
  { label: '45min', value: 45 },
  { label: '60min', value: 60 },
];

const timeOptions = getTimes();

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

const AppointmentRequestModal = ({ visible, onSubmit, onClose }: Props) => {
  const [selectedDuration, setSelectedDuration] = useState(45);
  const [selectedTime, setSelectedTime] = useState('12:00');
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  const markedDates = useMemo(() => {
    let dateMap = {};

    if (selectedDate) {
      dateMap = getMarkedDate(selectedDate);
    }

    return dateMap;
  }, [selectedDate]);

  const isButtonDisabled = !selectedDuration || !selectedTime || !selectedDate;

  const onDayPress = ({ dateString }) => setSelectedDate(dateString);

  const onPressSubmit = () => {
    const localStartDate = new Date(`${selectedDate}T${selectedTime}:00`);
    const localEndDate = addMinutes(localStartDate, selectedDuration);

    const data = {
      start_time: localStartDate,
      end_time: localEndDate,
    };

    onSubmit(data);
  };

  return (
    <Modal
      propagateSwipe
      isVisible={visible}
      onToggle={onClose}
    >
      <View alignCenter spacing={{ pb: 6 }}>
        <View row>
          <View variant="borderBottom" flex={1} spacing={{ pb: 3 }} alignCenter justifyCenter>
            <Text variant="titleSmall">
              Create Appointment
            </Text>
          </View>
        </View>

        <View row variant="borderBottom">
          <Picker
            style={{ height: 200, width: WINDOW_WIDTH / 2 }}
            selectedValue={selectedDuration}
            onValueChange={(value) => setSelectedDuration(value)}
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

        <View width={WINDOW_WIDTH} spacing={{ p: 4 }} variant="borderTop">
          <Button
            disabled={isButtonDisabled}
            variant={isButtonDisabled ? 'primaryDisabled' : 'primary'}
            onPress={onPressSubmit}
          >
            Submit Appointment
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default AppointmentRequestModal;