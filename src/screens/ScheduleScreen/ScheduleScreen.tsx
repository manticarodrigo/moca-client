import React, { useState, useMemo, useEffect } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { NavigationStackScreenComponent, NavigationStackScreenProps } from 'react-navigation-stack';
import { format, addDays, subDays, startOfWeek, eachDayOfInterval } from 'date-fns';

import api from '@src/services/api';

import useStore from '@src/hooks/useStore';

import { Appointment } from '@src/store/reducers/AppointmentReducer';

import { setAwayDates } from '@src/store/actions/UserAction';

import { Spacing } from '@src/styles';

import { ScheduleTabIcon } from '@src/components/icons';

import View from '@src/components/View';
import Paginator from '@src/components/Paginator';

import SetAwayModal from '@src/modals/SetAwayModal';

import ScheduleRow from './ScheduleRow';

export type ListItem = {
  timestamp: number;
  appointments: Appointment[];
}

type ItemMap = { [date: string]: ListItem }

type Props = NavigationStackScreenProps & { isFocused: boolean }

const ScheduleScreen: NavigationStackScreenComponent = ({ navigation, isFocused }: Props) => {
  const { store, dispatch } = useStore();

  const [itemMap, setItemMap] = useState<ItemMap>({});
  const [selectedDate, setSelectedDate] = useState<Date>(startOfWeek(new Date()));
  const [isAwayModalVisible, setIsAwayModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { items, startDate, endDate, weekString, totalEarnings } = useMemo(() => {
    const start = startOfWeek(selectedDate);
    const end = addDays(start, 6);

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

        earnings += itemMap[timestamp].appointments.reduce((acc, { price }) => acc + price, 0);
        currentItems.push({ timestamp, appointments });
      });
    }

    return {
      items: currentItems,
      startDate: start,
      endDate: end,
      weekString: `${startDayStr}-${endDayStr} ${endMonthStr}`,
      totalEarnings: earnings,
    };
  }, [selectedDate, itemMap]);

  useEffect(() => {
    const getWeekAppointments = async () => {
      const currentWeekTime = startDate.getTime();

      if (itemMap[currentWeekTime]) return;

      setIsLoading(true);

      try {
        const query = { start: startDate.toISOString(), end: endDate.toISOString() };
        const options = { headers: { Authorization: `Token ${store.user.token}` }, query };

        const { data } = await api.appointment.appointmentList(options);

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
      } catch (e) {
        // console.log(e);
      } finally {
        setIsLoading(false);
      }
    };

    if (isFocused && store.user.token) {
      getWeekAppointments();
    }
  }, [isFocused, selectedDate]);

  const onToggleAwayModal = () => setIsAwayModalVisible(!isAwayModalVisible);

  useEffect(() => {
    navigation.setParams({ onToggleAwayModal });
  }, []);

  const onSubmitAwayDays = async (start: string, end: string) => {
    try {
      await dispatch(setAwayDates(start, end));

      setIsAwayModalVisible(false);
    } catch (error) {
      // console.log(error);
    }
  };

  const renderItem: ListRenderItem<ListItem> = ({ item, index }) => {
    const isFirst = index === 0;
    const isLast = index === items.length - 1;

    const handlePress = () => navigation.push('ScheduleDayScreen', { scheduleItem: item });

    return <ScheduleRow item={item} isFirst={isFirst} isLast={isLast} onPressDate={handlePress} />;
  };

  const keyExtractor = (item: ListItem) => item.timestamp.toString();

  const onPressPrev = () => {
    if (isLoading) return;

    setSelectedDate(subDays(startDate, 7));
  };

  const onPressNext = () => {
    if (isLoading) return;

    setSelectedDate(addDays(startDate, 7));
  };

  return (
    <>
      <SetAwayModal
        isVisible={isAwayModalVisible}
        onToggle={onToggleAwayModal}
        onSubmit={onSubmitAwayDays}

      />
      <Paginator
        title={weekString}
        subtitle={`$${totalEarnings}`}
        loading={isLoading}
        onPressPrev={onPressPrev}
        onPressNext={onPressNext}
      />
      <View flex={1} bgColor="semiGreyLighter">
        <FlatList
          refreshing={isLoading}
          data={items}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      </View>
    </>
  );
};

ScheduleScreen.navigationOptions = ({ navigation }) => {
  const { params = {} } = navigation.state;

  return {
    title: 'Calendar',
    headerRightContainerStyle: { ...Spacing.getStyles({ pt: 2, pr: 3 }) },
    headerRight: (
      <View alignCenter onPress={params.onToggleAwayModal}>
        <ScheduleTabIcon />
      </View>
    ),
  };
};

export default withNavigationFocus(ScheduleScreen);
