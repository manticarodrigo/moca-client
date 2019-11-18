import React, { useState, useMemo, useEffect } from 'react';
import { format, addDays, differenceInDays, parseISO } from 'date-fns';

import { getDateForString } from '@src/utlities/dates';

import api from '@src/services/api';

import {
  addAwayPeriod,
  updateAwayPeriod,
  deleteAwayPeriod,
} from '@src/store/actions/UserAction';

import useStore from '@src/hooks/useStore';

import { WINDOW_WIDTH } from '@src/utlities/constants';
import { Colors } from '@src/styles';

import { BinIconRed } from '@src/components/icons';

import CalendarList from '@src/components/CalendarList';
import Modal from '@src/components/Modal';
import View from '@src/components/View';
import Text from '@src/components/Text';
import Button from '@src/components/Button';
import Toast from '@src/components/Toast';


type Props = {
  visible: boolean;
  periodId?: number;
  onClose: () => void;
};

type ToastState = {
  type: 'success' | 'error';
  message: string;
}

const initialState = { startDate: '', endDate: '' };

const SetAwayModal = ({ visible, periodId, onClose }: Props) => {
  const { dispatch } = useStore();
  const [{ startDate, endDate }, setAwayPeriodState] = useState(initialState);
  const [toastState, setToastState] = useState<ToastState>();

  useEffect(() => {
    const fetchAwayDays = async () => {
      const { data } = await api.user.userTherapistAwayRead(periodId.toString());
      const start = format(new Date(data.startDate), 'yyyy-MM-dd');
      const end = format(new Date(data.endDate), 'yyyy-MM-dd');
      setAwayPeriodState({ startDate: start, endDate: end });
    };

    if (visible && periodId) {
      fetchAwayDays();
    }

    if (!visible) {
      setAwayPeriodState(initialState);
    }
  }, [visible, periodId]);

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

    setAwayPeriodState({ startDate: start, endDate: end });
  };

  const onDeleteAwayPeriod = async () => {
    try {
      await dispatch(deleteAwayPeriod(periodId));
      setToastState({ type: 'success', message: 'Away time has been successfully removed.' });
      setTimeout(onClose, 2000);
    } catch {
      setToastState({ type: 'error', message: 'There was an issue deleting your away time.' });
    }
  };

  const onPressSubmit = async () => {
    const start = getDateForString(startDate);
    start.setHours(0, 0, 0, 0);
    const end = getDateForString(endDate);
    end.setHours(23, 59, 59, 999);

    try {
      const period = { startDate: start.toISOString(), endDate: end.toISOString() };

      if (!periodId) {
        await dispatch(addAwayPeriod(period.startDate, period.endDate));
      } else {
        await dispatch(updateAwayPeriod(periodId, period));
      }

      setToastState({
        type: 'success',
        message: `Away time has been ${periodId ? 'updated in your' : 'added to your'} calendar.`,
      });
      setTimeout(onClose, 2000);
    } catch ({ response }) {
      const { data } = response;

      let message = `There was an issue ${periodId ? 'updating' : 'adding'} your away time.`;

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
        <View row justifyBetween={!!periodId} variant="borderBottom">
          {!!periodId && <View p={4} px={5} />}
          <View flex={1} p={4} alignCenter justifyCenter>
            <Text variant="semiBoldLarge">
              Add Away Days
            </Text>
          </View>
          {!!periodId && (
            <View p={4} alignCenter onPress={onDeleteAwayPeriod}><BinIconRed /></View>
          )}
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
            {periodId ? 'Update Days Off' : 'Submit Days Off'}
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
