import React, { useState, useMemo, useEffect } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { format, addDays, subDays, startOfWeek, eachDayOfInterval } from 'date-fns';

import api from '@src/services/api';

import useStore from '@src/hooks/useStore';

import { Appointment } from '@src/store/reducers/AppointmentReducer';

import { ArrowRightIcon } from '@src/components/icons';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Paginator from '@src/components/Paginator';

import ScheduleWeekRow from './ScheduleWeekRow';

export type ListItem = {
  timestamp: number;
  appointments: Appointment[];
  awayDays?: number[];
}

type ItemMap = { [date: string]: ListItem }

type Props = Pick<NavigationStackScreenProps, 'navigation'> & {
  isFocused: boolean;
  selectedDate: Date;
  onChangeDate: (date: Date) => void;
  onSetAway: (props) => void;
}

const ScheduleWeek = ({ navigation, isFocused, selectedDate, onChangeDate, onSetAway }: Props) => {
  const { store } = useStore();

  const [itemMap, setItemMap] = useState<ItemMap>({});
  const [loading, setLoading] = useState(false);

  const awayMap = useMemo(() => {
    const map = {};
    if (store.user.awayDays && Array.isArray(store.user.awayDays)) {
      store.user.awayDays.forEach((leave) => {
        const start = new Date(leave.startDate);
        const end = new Date(leave.endDate);
        const range = eachDayOfInterval({ start, end });

        range.forEach((day) => {
          const timestamp = day.getTime();

          if (map[timestamp]) {
            map[timestamp].push(leave.id);
          } else {
            map[timestamp] = [leave.id];
          }
        });
      });
    }
    return map;
  }, [store.user.awayDays]);

  const { items, startDate, endDate, weekString, totalEarnings } = useMemo(() => {
    const start = startOfWeek(selectedDate);
    start.setHours(0, 0, 0, 0);
    const end = addDays(start, 6);
    end.setHours(23, 59, 59, 999);

    const startDayStr = format(start, 'dd');
    const endDayStr = format(end, 'dd');
    const endMonthStr = format(end, 'MMM');

    let earnings = 0;

    const currentItems = [];
    const currentWeekTime = start.getTime();
    const existing = itemMap[currentWeekTime];

    if (existing) {
      const currentWeekDays = eachDayOfInterval({ start, end });

      currentWeekDays.forEach((day) => {
        const timestamp = day.getTime();
        const { appointments } = itemMap[timestamp];
        const awayDays = awayMap[timestamp];

        earnings += itemMap[timestamp].appointments.reduce((acc, { price }) => acc + price, 0);
        currentItems.push({ timestamp, appointments, awayDays });
      });
    }

    return {
      items: currentItems,
      startDate: start,
      endDate: end,
      weekString: `${startDayStr}-${endDayStr} ${endMonthStr}`,
      totalEarnings: earnings,
    };
  }, [selectedDate, itemMap, awayMap]);

  useEffect(() => {
    const getWeekAppointments = async () => {
      const currentWeekTime = startDate.getTime();

      if (itemMap[currentWeekTime]) return;

      setLoading(true);

      try {
        const query = { start: startDate.toISOString(), end: endDate.toISOString() };

        const { data } = await api.appointment.appointmentList({ query });

        const currentWeekDays = eachDayOfInterval({ start: startDate, end: endDate });
        const weekMap: { [date: string]: ListItem } = {};

        currentWeekDays.forEach((day) => {
          const timestamp = day.getTime();

          weekMap[timestamp] = { timestamp, appointments: [] };
        });

        data.forEach((appointment) => {
          const start = new Date(appointment.startTime);
          start.setHours(0, 0, 0, 0);

          const timestamp = start.getTime();

          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          weekMap[timestamp].appointments.push(appointment);
        });

        setItemMap((prev) => ({ ...prev, ...weekMap }));
      } finally {
        setLoading(false);
      }
    };

    if (isFocused && store.user.token) {
      getWeekAppointments();
    }

    if (!isFocused) {
      setItemMap({});
    }
  }, [isFocused, selectedDate]);

  const renderItem: ListRenderItem<ListItem> = ({ item, index }) => {
    const isFirst = index === 0;
    const isLast = index === items.length - 1;

    const handlePress = () => {
      if (item.awayDays.length) {
        const [leaveId] = item.awayDays;

        return onSetAway({ visible: true, leaveId });
      }

      return navigation.push('ScheduleDayScreen', { scheduleItem: item });
    };

    return (
      <ScheduleWeekRow
        item={item}
        isFirst={isFirst}
        isLast={isLast}
        onPressDate={handlePress}
      />
    );
  };

  const keyExtractor = (item: ListItem) => item.timestamp.toString();

  const onPressPrev = () => {
    if (loading) return;

    onChangeDate(subDays(startDate, 7));
  };

  const onPressNext = () => {
    if (loading) return;

    onChangeDate(addDays(startDate, 7));
  };

  const onPressSetAway = () => onSetAway({ visible: true });

  return (
    <>
      <Paginator
        title={weekString}
        subtitle={`$${totalEarnings}`}
        loading={loading}
        onPressPrev={onPressPrev}
        onPressNext={onPressNext}
      />
      <View row justifyCenter alignCenter py={2} bgColor="secondary" onPress={onPressSetAway}>
        <Text mr={2} variant="semiBold" color="white">Add Away Days</Text>
        <ArrowRightIcon tint="white" size={0.75} />
      </View>
      <View flex={1} bgColor="semiGreyLighter">
        <FlatList
          refreshing={loading}
          data={items}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      </View>
    </>
  );
};

export default ScheduleWeek;
