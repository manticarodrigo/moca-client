import React, { useState, useMemo, useEffect } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { NavigationStackScreenComponent, NavigationStackScreenProps } from 'react-navigation-stack';
import { format, addDays, subDays, startOfWeek } from 'date-fns';

import useStore from '@src/hooks/useStore';
import { Appointment } from '@src/store/reducers/AppointmentReducer';

import { getAppointments } from '@src/store/actions/AppointmentAction';
import { setAwayDates } from '@src/store/actions/UserAction';

import { Colors, Spacing } from '@src/styles';

import { ScheduleTabIcon } from '@src/components/icons';

import View from '@src/components/View';
import Paginator from '@src/components/Paginator';

import SetAwayModal from '@src/modals/SetAwayModal';

import ScheduleRow from './ScheduleRow';

export type ScheduleItem = {
  date: string;
  timestamp: number;
  appointments: Appointment[];
}

type Props = NavigationStackScreenProps & { isFocused: boolean }

const ScheduleScreen: NavigationStackScreenComponent = ({ navigation, isFocused }: Props) => {
  const { store, dispatch } = useStore();

  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [items, setItems] = useState<ScheduleItem[]>([]);
  const [isAwayModalVisible, setIsAwayModalVisible] = useState(false);

  useEffect(() => {
    if (isFocused && store.user.id) {
      dispatch(getAppointments());
    }
  }, [isFocused]);

  useEffect(() => {
    const itemMap: { [key: string]: ScheduleItem } = {};

    store.appointments.forEach((appointment) => {
      const startDate = new Date(appointment.startTime);
      const timestamp = startDate.getTime();

      const date = format(startDate, 'yyyy-MM-dd');

      if (itemMap[date]) {
        itemMap[date].appointments.push(appointment);
      } else {
        itemMap[date] = { date, timestamp, appointments: [appointment] };
      }
    });

    setItems(Object.values(itemMap).sort((a, b) => a.timestamp - b.timestamp));
  }, [store.appointments]);

  const onToggleAwayModal = () => setIsAwayModalVisible(!isAwayModalVisible);

  useEffect(() => {
    navigation.setParams({ onToggleAwayModal });
  }, []);

  const onSubmitAwayDays = async (startDate: string, endDate: string) => {
    try {
      await dispatch(setAwayDates(startDate, endDate));

      setIsAwayModalVisible(false);
    } catch (error) {
      // console.log(error);
    }
  };

  const renderItem: ListRenderItem<ScheduleItem> = ({ item }) => {
    const handlePress = () => navigation.push('ScheduleDayScreen', { scheduleItem: item });

    return <ScheduleRow item={item} onPressDate={handlePress} />;
  };

  const keyExtractor = (item: ScheduleItem) => item.date;

  const { currentStartOfWeek, weekString, totalEarnings } = useMemo(() => {
    const start = startOfWeek(currentDate);
    const end = addDays(start, 6);

    const startDayStr = format(start, 'dd');
    const endDayStr = format(end, 'dd');
    const endMonthStr = format(end, 'MMM');

    return {
      currentStartOfWeek: start,
      weekString: `${startDayStr}-${endDayStr} ${endMonthStr}`,
      totalEarnings: store.appointments.reduce((acc, { price }) => acc + price, 0),
    };
  }, [currentDate, store.appointments]);

  const onPressPrev = () => setCurrentDate(subDays(currentStartOfWeek, 7));
  const onPressNext = () => setCurrentDate(addDays(currentStartOfWeek, 7));

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
        onPressPrev={onPressPrev}
        onPressNext={onPressNext}
      />
      <FlatList
        style={{ ...Spacing.getStyles({ py: 2 }), backgroundColor: Colors.semiGreyLighter }}
        data={Object.values(items)}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
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
