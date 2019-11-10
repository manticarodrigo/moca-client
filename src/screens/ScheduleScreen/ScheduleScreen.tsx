import React, { useState, useEffect } from 'react';
import { withNavigationFocus } from 'react-navigation';
import { NavigationStackScreenComponent, NavigationStackScreenProps } from 'react-navigation-stack';

import useStore from '@src/hooks/useStore';

import { Appointment } from '@src/store/reducers/AppointmentReducer';
import { setAwayDates } from '@src/store/actions/UserAction';

import SetAwayModal from '@src/modals/SetAwayModal';

import SegmentedControl from '@src/components/SegmentedControl';

import ScheduleWeek from './ScheduleWeek';
import ScheduleMonth from './ScheduleMonth';

export type ListItem = {
  timestamp: number;
  appointments: Appointment[];
}

type Props = NavigationStackScreenProps & { isFocused: boolean }
type Tab = 'week' | 'month';

const tabOptions = [{ value: 'week', label: 'Week' }, { value: 'month', label: 'Month' }];

const ScheduleScreen: NavigationStackScreenComponent = ({ navigation, isFocused }: Props) => {
  const { dispatch } = useStore();

  const [activeTab, setActiveTab] = useState('month');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isAwayModalVisible, setIsAwayModalVisible] = useState(false);

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

  const onChangeTab = (tab: Tab) => setActiveTab(tab);

  const tabProps = {
    navigation,
    isFocused,
    selectedDate,
    onChangeDate: setSelectedDate,
    onSetAway: onToggleAwayModal,
  };

  return (
    <>
      <SetAwayModal
        isVisible={isAwayModalVisible}
        onToggle={onToggleAwayModal}
        onSubmit={onSubmitAwayDays}
      />
      <SegmentedControl selected={activeTab} options={tabOptions} onChange={onChangeTab} />
      {activeTab === 'week' && <ScheduleWeek {...tabProps} />}
      {activeTab === 'month' && <ScheduleMonth {...tabProps} />}
    </>
  );
};

ScheduleScreen.navigationOptions = {
  title: 'Calendar',
};

export default withNavigationFocus(ScheduleScreen);
