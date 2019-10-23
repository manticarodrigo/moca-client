import React, { useState, useCallback, useEffect } from 'react';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import { Agenda } from 'react-native-calendars';
import { format, addDays } from 'date-fns';

import { Colors, Spacing } from '@src/styles';

import View from '@src/components/View';

import SetAwayModal from '@src/modals/SetAwayModal';

import { ScheduleTabIcon } from '@src/components/icons';

import { setAwayDates } from '@src/store/actions/UserAction';
import useStore from '@src/hooks/useStore';

import ScheduleRow from './ScheduleRow';

export type ScheduleItem = {
  dateString: string;
  appointments: string;
  completedAppointments: string;
  timeSpent: string;
  documents: string;
  completedDocuments: string;
  earnings: string;
}

type ScheduleItemMap = {
  [key: string]: ScheduleItem[];
}

const theme = {
  backgroundColor: Colors.semiGreyLighter,
  calendarBackground: Colors.primary,
  textSectionTitleColor: Colors.white,
  arrowColor: Colors.secondary,
  dayTextColor: Colors.white,
  monthTextColor: Colors.white,
  textDayFontFamily: 'family-700',
  todayTextColor: Colors.secondaryLighter,
  dotColor: Colors.semiGreyLighter,
  'stylesheet.day.basic': {
    selected: {
      backgroundColor: Colors.secondary,
      borderRadius: 8,
    },
  },
};

const minDate = new Date();
const maxDate = addDays(new Date(), 365);

const ScheduleScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const { dispatch } = useStore();
  const [items, setItems] = useState<ScheduleItemMap>({});
  const [isAwayModalVisible, setIsAwayModalVisible] = useState(false);

  const renderNull = useCallback(() => null, []);

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

  const onPressDate = (date) => navigation.push(
    'ScheduleDayScreen',
    { selectedDate: date },
  );

  const loadItemsForMonth = (date) => {
    setTimeout(() => {
      const newItems = {};

      for (let i = -15; i < 60; i += 1) {
        const dateString = format(addDays(date.timestamp, i + 1), 'yyyy-MM-dd');

        if (!newItems[dateString]) {
          newItems[dateString] = [];

          const hasItemsForDay = Math.random() >= 0.5;

          if (hasItemsForDay) {
            newItems[dateString].push({
              dateString,
              appointments: 3,
              completedAppointments: 2,
              timeSpent: 5,
              documents: 2,
              completedDocuments: 2,
              earnings: 60,
            });
          }
        }
      }

      setItems(newItems);
    }, 500);
  };

  const renderDay = (date, item) => {
    const handlePress = () => onPressDate(date);

    return <ScheduleRow date={date} item={item} onPressDate={handlePress} />;
  };

  const rowHasChanged = (r1, r2) => r1.dateString !== r2.dateString;

  return (
    <>
      <SetAwayModal
        isVisible={isAwayModalVisible}
        onToggle={onToggleAwayModal}
        onSubmit={onSubmitAwayDays}

      />
      <Agenda
        items={items}
        loadItemsForMonth={loadItemsForMonth}
        renderItem={renderNull}
        renderEmptyDate={renderNull}
        rowHasChanged={rowHasChanged}
        renderDay={renderDay}
        theme={theme}
        pastScrollRange={12}
        futureScrollRange={12}
        minDate={minDate}
        maxDate={maxDate}
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
