import React, { useState, useEffect } from 'react';
import { withNavigationFocus } from 'react-navigation';
import { NavigationStackScreenComponent, NavigationStackScreenProps } from 'react-navigation-stack';

import SetAwayModal from '@src/modals/SetAwayModal';

import SegmentedControl from '@src/components/SegmentedControl';

import ScheduleWeek from './ScheduleWeek';
import ScheduleMonth from './ScheduleMonth';

type Props = NavigationStackScreenProps & { isFocused: boolean }
type Tab = 'week' | 'month';

const tabOptions = [{ value: 'week', label: 'Week' }, { value: 'month', label: 'Month' }];

const ScheduleScreen: NavigationStackScreenComponent = ({ navigation, isFocused }: Props) => {
  const [activeTab, setActiveTab] = useState('week');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [awayModalProps, setAwayModalProps] = useState();

  const openAwayModal = (props) => setAwayModalProps(props);
  const closeAwayModal = () => setAwayModalProps(undefined);

  const onChangeTab = (tab: Tab) => setActiveTab(tab);

  const tabProps = {
    navigation,
    isFocused,
    selectedDate,
    onChangeDate: setSelectedDate,
    onSetAway: openAwayModal,
  };

  return (
    <>
      <SetAwayModal
        {...awayModalProps}
        onClose={closeAwayModal}
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
