import React, { useState, useMemo, useEffect } from 'react';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { Calendar as RNCalendar, DotMarking } from 'react-native-calendars';
import {
  format,
  addDays,
  startOfMonth,
  endOfMonth,
  subYears,
  differenceInDays,
  eachDayOfInterval,
} from 'date-fns';


import api from '@src/services/api';

import useStore from '@src/hooks/useStore';
import useAwayMap from '@src/hooks/useAwayMap';

import { Leave } from '@src/services/openapi';
import { Appointment } from '@src/store/reducers/AppointmentReducer';

import { Colors, Typography } from '@src/styles';

import { PreviousArrowIcon, NextArrowIcon, ArrowRightIcon } from '@src/components/icons';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Paginator from '@src/components/Paginator';

import { ListItem } from './ScheduleScreen';
import ScheduleMonthDay from './ScheduleMonthDay';

type MarkedDates = {
  [date: string]: DotMarking & {
    total?: number;
    appointments?: Appointment[];
    awayDays?: Leave[];
  };
}

type Props = Pick<NavigationStackScreenProps, 'navigation'> & {
  isFocused: boolean;
  selectedDate: Date;
  onChangeDate: (date: Date) => void;
  onSetAway: (props) => void;
}

const Calendar = ({ navigation, isFocused, selectedDate, onChangeDate, onSetAway }: Props) => {
  const { store } = useStore();
  const awayMap = useAwayMap(store.user.awayDays);

  const [markedDates, setMarkedDates] = useState<MarkedDates>({});
  const [loading, setLoading] = useState(false);

  const { startDate, endDate } = useMemo(() => {
    const start = startOfMonth(selectedDate);
    start.setHours(0, 0, 0, 0);
    const dayCount = differenceInDays(endOfMonth(start), start);
    const end = addDays(start, dayCount);
    end.setHours(23, 59, 59, 999);

    return { startDate: start, endDate: end };
  }, [selectedDate]);

  useEffect(() => {
    if (isFocused) {
      const newState: MarkedDates = { ...markedDates };

      Object.keys(markedDates).forEach((key) => {
        delete newState[key].awayDays;
      });

      Object.entries(awayMap).forEach(([key, awayDays]) => {
        newState[key] = { ...newState[key], awayDays };
      });

      setMarkedDates(newState);
    }
  }, [isFocused, awayMap]);

  useEffect(() => {
    const getAppointments = async () => {
      const monthMap: MarkedDates = {};

      try {
        const startKey = format(startDate, 'yyyy-MM-dd');

        if (markedDates[startKey]) return;

        setLoading(true);

        const query = { start: startDate.toISOString(), end: endDate.toISOString() };
        const { data } = await api.appointment.appointmentList({ query });


        data.forEach((appointment) => {
          const date = new Date(appointment.startTime);
          const key = format(new Date(date), 'yyyy-MM-dd');

          let total = appointment.price;
          let appointments = [appointment];

          if (monthMap[key]) {
            total += monthMap[key].total;
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            appointments = [...monthMap[key].appointments, appointment];
          }
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          monthMap[key] = { total, appointments };
        });
      } finally {
        setMarkedDates((prev) => ({ ...prev, ...monthMap }));
        setLoading(false);
      }
    };

    if (isFocused && store.user.token) {
      getAppointments();
    }

    if (!isFocused) {
      setMarkedDates({});
    }
  }, [isFocused, selectedDate]);

  const onChangeMonth = (date) => onChangeDate(new Date(date.dateString));

  const onPressSetAway = () => onSetAway({ visible: true });

  const onPressDay = (day) => {
    onChangeDate(new Date(day.dateString));

    const existing = markedDates[day.dateString] || {};

    if (existing.awayDays && existing.awayDays.length) {
      const [leaveId] = existing.awayDays;

      return onSetAway({ visible: true, leaveId });
    }

    const scheduleItem: ListItem = {
      dateString: day.dateString,
      appointments: existing.appointments,
    };

    return navigation.push('ScheduleDayScreen', { scheduleItem });
  };

  const monthTotal = useMemo(() => {
    const currentDays = eachDayOfInterval({ start: startDate, end: endDate });

    let newTotal = 0;
    currentDays.forEach((day) => {
      const key = format(day, 'yyyy-MM-dd');
      const existing = markedDates[key];

      if (existing && existing.total) {
        newTotal += existing.total;
      }
    });

    return newTotal;
  }, [markedDates, startDate, endDate]);

  return (
    <View flex={1} justifyCenter alignCenter bgColor="lightGrey">
      <RNCalendar
        displayLoadingIndicator={loading}
        current={selectedDate}
        markedDates={markedDates}
        minDate={subYears(new Date(), 1)}
        renderArrow={(direction) => {
          switch (direction) {
            case 'left':
              return <PreviousArrowIcon />;
            case 'right':
              return <NextArrowIcon />;
            default:
              return null;
          }
        }}
        renderHeader={(onPressLeft, onPressRight, monthString, indicator) => (
          <>
            <Paginator
              loading={!!indicator}
              title={monthString}
              subtitle={`$${monthTotal}`}
              onPressPrev={onPressLeft}
              onPressNext={onPressRight}
            />
            <View row justifyCenter alignCenter py={2} bgColor="secondary" onPress={onPressSetAway}>
              <Text mr={2} variant="semiBold" color="white">Add Away Days</Text>
              <ArrowRightIcon tint="white" size={0.75} />
            </View>
          </>
        )}
        dayComponent={ScheduleMonthDay}
        onMonthChange={onChangeMonth}
        onDayPress={onPressDay}
        style={{ width: '100%', height: '100%', paddingRight: 0, paddingLeft: 0 }}
        theme={{
          calendarBackground: Colors.semiGreyLighter,
          textSectionTitleColor: Colors.greyishBrown,
          arrowColor: Colors.secondary,
          dayTextColor: Colors.greyishBrown,
          textDayFontFamily: 'family-700',
          todayTextColor: Colors.secondary,
          'stylesheet.calendar.main': {
            monthView: {
              padding: 12,
            },
          },
          'stylesheet.calendar.header': {
            header: {
              backgroundColor: Colors.primary,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 16,
            },
            week: {
              padding: 12,
              paddingTop: 20,
              marginTop: 7,
              flexDirection: 'row',
              justifyContent: 'space-around',
            },
            arrow: {},
            dayHeader: {
              ...Typography.getStyles({
                size: 0,
                weight: '500',
                color: 'greyishBrown',
                transform: 'uppercase',
                align: 'center',
              }),
              width: 35,
            },
          },
        }}
      />
    </View>
  );
};

export default Calendar;
