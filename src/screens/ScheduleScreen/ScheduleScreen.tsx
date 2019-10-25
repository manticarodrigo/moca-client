import React, { useState, useEffect } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { NavigationStackScreenComponent, NavigationStackScreenProps } from 'react-navigation-stack';
import { format } from 'date-fns';

import useStore from '@src/hooks/useStore';
import { Appointment } from '@src/store/reducers/AppointmentReducer';

import { getAppointments } from '@src/store/actions/AppointmentAction';
import { setAwayDates } from '@src/store/actions/UserAction';

import { Colors, Spacing } from '@src/styles';

import { ScheduleTabIcon } from '@src/components/icons';

import View from '@src/components/View';
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
  const [items, setItems] = useState<ScheduleItem[]>([]);
  const [isAwayModalVisible, setIsAwayModalVisible] = useState(false);

  useEffect(() => {
    if (store.user.id) {
      dispatch(getAppointments());
    }
  }, [store.user, isFocused, dispatch]);

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

  return (
    <>
      <SetAwayModal
        isVisible={isAwayModalVisible}
        onToggle={onToggleAwayModal}
        onSubmit={onSubmitAwayDays}

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

export default ScheduleScreen;
