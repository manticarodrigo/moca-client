import React, { useState, useMemo, useEffect } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { format, addDays, subDays, startOfWeek, eachDayOfInterval } from 'date-fns';

import api from '@src/services/api';

import useStore from '@src/hooks/useStore';
import useAwayMap from '@src/hooks/useAwayMap';

import { ArrowRightIcon } from '@src/components/icons';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Paginator from '@src/components/Paginator';

import { ListItem } from './ScheduleScreen';
import ScheduleWeekRow from './ScheduleWeekRow';

type ItemMap = { [date: string]: ListItem }

type Props = Pick<NavigationStackScreenProps, 'navigation'> & {
  isFocused: boolean;
  selectedDate: Date;
  onChangeDate: (date: Date) => void;
  onSetAway: (props) => void;
}

const keyFormat = 'yyyy-MM-dd';

const ScheduleWeek = ({ navigation, isFocused, selectedDate, onChangeDate, onSetAway }: Props) => {
  const { store } = useStore();
  const awayMap = useAwayMap(store.user.awayDays);

  const [itemMap, setItemMap] = useState<ItemMap>({});
  const [loading, setLoading] = useState(false);

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
    const weekKey = format(start, keyFormat);
    const existing = itemMap[weekKey];

    if (existing) {
      const currentWeekDays = eachDayOfInterval({ start, end });

      currentWeekDays.forEach((day) => {
        const dateString = format(day, keyFormat);

        const { appointments } = itemMap[dateString];
        const awayDays = awayMap[dateString];

        earnings += itemMap[dateString].appointments.reduce((acc, { price }) => acc + price, 0);
        currentItems.push({ dateString, appointments, awayDays });
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
      const weekKey = format(startDate, keyFormat);

      if (itemMap[weekKey]) return;

      setLoading(true);

      try {
        const query = { start: startDate.toISOString(), end: endDate.toISOString() };

        const { data } = await api.appointment.appointmentList({ query });

        const currentWeekDays = eachDayOfInterval({ start: startDate, end: endDate });
        const weekMap: { [date: string]: ListItem } = {};

        currentWeekDays.forEach((day) => {
          const dateString = format(day, keyFormat);

          weekMap[dateString] = { dateString, appointments: [] };
        });

        data.forEach((appointment) => {
          const start = new Date(appointment.startTime);
          start.setHours(0, 0, 0, 0);

          const dateString = format(start, keyFormat);
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          weekMap[dateString].appointments.push(appointment);
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

  const onPressPrev = () => {
    if (loading) return;

    onChangeDate(subDays(startDate, 7));
  };

  const onPressNext = () => {
    if (loading) return;

    onChangeDate(addDays(startDate, 7));
  };

  const onPressSetAway = () => onSetAway({ visible: true });

  const keyExtractor = (item: ListItem) => item.dateString;

  const renderItem: ListRenderItem<ListItem> = ({ item, index }) => {
    const isFirst = index === 0;
    const isLast = index === items.length - 1;

    const handlePress = () => {
      if (item.awayDays && item.awayDays.length) {
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
