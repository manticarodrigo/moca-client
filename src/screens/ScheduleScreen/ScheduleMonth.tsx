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

import { Colors, Typography } from '@src/styles';

import api from '@src/services/api';

import useStore from '@src/hooks/useStore';

import { Appointment } from '@src/store/reducers/AppointmentReducer';

import { PreviousArrowIcon, NextArrowIcon } from '@src/components/icons';

import View from '@src/components/View';
import Text from '@src/components/Text';

import ScheduleMonthDay from './ScheduleMonthDay';

type MarkedDates = {
  [date: string]: DotMarking & {
    total?: number;
    appointments?: Appointment[];
  };
}

type Props = Pick<NavigationStackScreenProps, 'navigation'> & {
  isFocused: boolean;
  selectedDate: Date;
  onChangeDate: (date: Date) => void;
}

const Calendar = ({ navigation, isFocused, selectedDate, onChangeDate }: Props) => {
  const { store } = useStore();

  const [markedDates, setMarkedDates] = useState<MarkedDates>({});

  const { startDate, endDate } = useMemo(() => {
    const start = startOfMonth(selectedDate);
    start.setHours(0, 0, 0, 0);
    const dayCount = differenceInDays(endOfMonth(start), start);
    const end = addDays(start, dayCount);
    end.setHours(23, 59, 59, 999);

    return { startDate: start, endDate: end };
  }, [selectedDate]);

  useEffect(() => {
    const getAppointments = async () => {
      const startKey = format(startDate, 'yyyy-MM-dd');

      if (markedDates[startKey]) return;

      try {
        const query = { start: startDate.toISOString(), end: endDate.toISOString() };

        const { data } = await api.appointment.appointmentList({ query });

        const monthMap: MarkedDates = {};

        data.forEach((appointment) => {
          const key = format(new Date(appointment.startTime), 'yyyy-MM-dd');

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

        setMarkedDates((prev) => ({ ...prev, ...monthMap }));
      } catch (e) {
        // console.log(e);
      }
    };

    if (isFocused && store.user.token) {
      getAppointments();
    }
  }, [isFocused, selectedDate]);

  const onChangeMonth = (date) => onChangeDate(new Date(date.timestamp));

  const onPressDay = (day) => {
    onChangeDate(new Date(day.timestamp));

    const existing = markedDates[day.dateString] || {};

    const scheduleItem = {
      // month is an index
      timestamp: new Date(day.year, day.month - 1, day.day).toISOString(),
      appointments: existing.appointments,
    };

    navigation.push('ScheduleDayScreen', { scheduleItem });
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
        renderMonthTitle={(monthString) => (
          <View alignCenter>
            <Text mb={2} variant="semiBoldLarge" color="white">{monthString}</Text>
            <Text variant="regularSmall" color="secondaryLighter">{`$${monthTotal}`}</Text>
          </View>
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
