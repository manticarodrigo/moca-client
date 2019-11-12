import React, { useState, useMemo, useEffect } from 'react';
import { format, addDays, differenceInDays, parseISO } from 'date-fns';

import api from '@src/services/api';

import { addLeavePeriod, updateLeavePeriod } from '@src/store/actions/UserAction';

import useStore from '@src/hooks/useStore';

import { WINDOW_WIDTH } from '@src/utlities/constants';
import { Colors } from '@src/styles';

import CalendarList from '@src/components/CalendarList';
import Modal from '@src/components/Modal';
import View from '@src/components/View';
import Text from '@src/components/Text';
import Button from '@src/components/Button';
import Toast from '@src/components/Toast';


type Props = {
  visible: boolean;
  leaveId?: number;
  onClose: () => void;
};

type ToastState = {
  type: 'success' | 'error';
  message: string;
}

const SetAwayModal = ({ visible, leaveId, onClose }: Props) => {
  const { dispatch } = useStore();
  const [{ startDate, endDate }, setLeavePeriodState] = useState({ startDate: '', endDate: '' });
  const [toastState, setToastState] = useState<ToastState>();

  useEffect(() => {
    const fetchAwayDays = async () => {
      const { data } = await api.user.userTherapistAwayRead(leaveId.toString());
      const start = format(new Date(data.startDate), 'yyyy-MM-dd');
      const end = format(new Date(data.endDate), 'yyyy-MM-dd');
      setLeavePeriodState({ startDate: start, endDate: end });
    };

    if (leaveId) {
      fetchAwayDays();
    }
  }, [leaveId]);

  const markedDates = useMemo(() => {
    let daysInRange = 0;

    const datesMap = {};

    if (startDate && endDate) {
      daysInRange = differenceInDays(parseISO(endDate), parseISO(startDate)) + 1;

      [...Array(daysInRange)].forEach((el, i) => {
        const date = format(addDays(parseISO(startDate), i), 'yyyy-MM-dd');

        const isFirst = i === 0;
        const isLast = i === daysInRange - 1;

        datesMap[date] = {
          startingDay: i === 0,
          color: (isFirst || isLast) ? Colors.secondaryLight : Colors.secondaryLightest,
          textColor: (isFirst || isLast) ? Colors.white : Colors.grey,
          endingDay: isLast,
        };
      });
    } else if (startDate) {
      const date = format(parseISO(startDate), 'yyyy-MM-dd');

      datesMap[date] = {
        startingDay: true,
        color: Colors.secondaryLight,
        textColor: 'white',
        endingDay: true,
      };
    }

    return datesMap;
  }, [startDate, endDate]);

  const isButtonDisabled = !(startDate && endDate);

  const onDayPress = ({ dateString }) => {
    let start = startDate;
    let end = endDate;

    if (!startDate) {
      start = dateString;
    }

    if (!endDate && startDate) {
      const newIsBeforeStart = differenceInDays(parseISO(dateString), parseISO(startDate)) < 0;

      if (newIsBeforeStart) {
        start = dateString;
      } else {
        end = dateString;
      }
    }

    if (startDate && endDate) {
      start = dateString;
      end = '';
    }

    setLeavePeriodState({ startDate: start, endDate: end });
  };

  const getDateForString = (str: string) => {
    const [year, month, day] = str.split('-');

    return new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
  };

  const onPressSubmit = async () => {
    const start = getDateForString(startDate);
    start.setHours(0, 0, 0, 0);
    const end = getDateForString(endDate);
    end.setHours(23, 59, 59, 999);

    try {
      const leave = { startDate: start.toISOString(), endDate: end.toISOString() };

      if (!leaveId) {
        await dispatch(addLeavePeriod(leave.startDate, leave.endDate));
      } else {
        await dispatch(updateLeavePeriod(leaveId.toString(), leave));
      }

      setToastState({
        type: 'success',
        message: `Away time has been ${leaveId ? 'updated in your' : 'added to your'} calendar.`,
      });
      setTimeout(onClose, 2000);
    } catch ({ response }) {
      const { data } = response;

      let message = `There was an issue ${leaveId ? 'updating' : 'adding'} your away time.`;

      if (data.startDate || data.endDate) {
        const [errorMessage] = [...(data.startDate || []), ...(data.endDate || [])];
        message = errorMessage;
      }
      setToastState({ type: 'error', message });
    }
  };

  return (
    <Modal propagateSwipe isVisible={visible} onToggle={onClose}>

      <View alignCenter pb={6}>

        <View row>
          <View variant="borderBottom" flex={1} pb={3} alignCenter justifyCenter>
            <Text variant="semiBoldLarge">
              Add Away Days
            </Text>
          </View>
        </View>

        <View alignCenter row variant="borderBottom">
          <View flex={1} p={3} variant="borderRight">
            <Text variant="regularSmall" color="grey">Start</Text>
            <Text
              variant="semiBoldLarge"
              color={!startDate ? 'secondaryLight' : undefined}
              pt={1}
            >
              {startDate || 'Select Date'}
            </Text>
          </View>
          <View flex={1} py={2} px={3} bgColor="white">
            <Text variant="regularSmall" color="grey">End</Text>
            <Text
              variant="semiBoldLarge"
              color={!endDate ? 'secondaryLight' : undefined}
              pt={1}
            >
              {endDate || 'Select Date'}
            </Text>
          </View>
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
            {leaveId ? 'Update Days Off' : 'Submit Days Off'}
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

export default SetAwayModal;
