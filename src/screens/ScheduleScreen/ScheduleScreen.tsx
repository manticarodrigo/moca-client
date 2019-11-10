import React, { useState, useEffect } from 'react';
import { withNavigationFocus } from 'react-navigation';
import { NavigationStackScreenComponent, NavigationStackScreenProps } from 'react-navigation-stack';

import useStore from '@src/hooks/useStore';

import { Appointment } from '@src/store/reducers/AppointmentReducer';
import { setAwayDates } from '@src/store/actions/UserAction';

import { Spacing } from '@src/styles';

import { ScheduleTabIcon } from '@src/components/icons';

import SetAwayModal from '@src/modals/SetAwayModal';

import View from '@src/components/View';
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

  const [activeTab, setActiveTab] = useState('week');
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
