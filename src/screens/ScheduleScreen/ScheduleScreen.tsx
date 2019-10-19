import React, { useState, useCallback, useEffect } from 'react';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import { Agenda } from 'react-native-calendars';
import { format, addDays, isToday } from 'date-fns';

import { Colors, Spacing } from '@src/styles';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Tag from '@src/components/Tag';

import SetAwayModal from '@src/modals/SetAwayModal';

import { ScheduleTabIcon } from '@src/components/icons';

import { setAwayDates } from '@src/store/actions/UserAction';
import useStore from '@src/hooks/useStore';

type ScheduleItem = {
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

const ScheduleScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const { dispatch } = useStore();
  const [items, setItems] = useState<ScheduleItemMap>({});
  const [isAwayModal, setIsAwayModal] = useState(false);

  const renderNull = useCallback(() => null, []);

  const handleSetAwayDates = () => {
    setIsAwayModal(true);
  };

  useEffect(() => {
    navigation.setParams({ handleSetAwayDates });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitAwayDates = async (startDate: string, endDate: string) => {
    try {
      await dispatch(setAwayDates(startDate, endDate));
      setIsAwayModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const setAwayModal = (
    <SetAwayModal
      isModalVisible={isAwayModal}
      closeInputModal={() => setIsAwayModal(false)}
      onSubmit={submitAwayDates}

    />
  );

  return (
    <Agenda
      items={items}
      loadItemsForMonth={(date) => {
        setTimeout(() => {
          const newItems = {};

          for (let i = -15; i < 85; i += 1) {
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
        }, 1000);
      }}
      renderItem={renderNull}
      renderEmptyDate={renderNull}
      rowHasChanged={(r1, r2) => r1.dateString !== r2.dateString}
      renderDay={(date, item?: ScheduleItem) => {
        if (date) {
          const isDateToday = isToday(date.timestamp);

          const {
            completedDocuments = '0',
            documents = '0',
            completedAppointments = '0',
            appointments = '0',
            timeSpent = '0',
            earnings = '0',
          } = item || {};

          const onPressDate = () => navigation.push(
            'ScheduleDayScreen',
            { selectedDate: date },
          );

          return (
            <View
              variant={isDateToday ? 'borderShadowCard' : 'card'}
              row
              flex={1}
              spacing={{ mt: 2, mx: 3 }}
              onPress={onPressDate}
            >
              <View column>
                <View row>
                  <Text variant={isDateToday ? 'titlePrimaryLarge' : 'titleSecondaryLarge'}>
                    {date.day}
                  </Text>
                  <View column spacing={{ ml: 2 }}>
                    <Text
                      variant={isDateToday ? 'lightPrimarySmallest' : 'lightSecondarySmallest'}
                    >
                      {format(date.timestamp, 'MMM')}
                    </Text>
                    <Text
                      variant={isDateToday ? 'lightPrimarySmallest' : 'lightSecondarySmallest'}
                    >
                      {date.year}
                    </Text>
                  </View>
                </View>

                <Text variant={isDateToday ? 'regularPrimary' : 'regularSecondary'}>
                  {format(date.timestamp, 'cccc')}
                </Text>
              </View>

              <View column flex={1}>

                <View row flex={1} justifyEnd spacing={{ mb: 2 }}>
                  <Tag
                    icon="report"
                    type="borderLight"
                    placeholder={`${completedDocuments}/${documents}`}
                    spacing={{ ml: 2 }}
                  />
                  <Tag
                    icon="appointment"
                    type="fill"
                    placeholder={`${completedAppointments}/${appointments}`}
                    spacing={{ ml: 2 }}
                  />
                </View>

                <View row flex={1} justifyEnd>
                  <Tag icon="clock" type="border" placeholder={timeSpent} spacing={{ ml: 2 }} />
                  <Tag icon="dollar" type="fill" placeholder={earnings} spacing={{ ml: 2 }} />
                </View>
              </View>
              {setAwayModal}
            </View>
          );
        }

        return null;
      }}
      theme={{
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
      }}
    />
  );
};

ScheduleScreen.navigationOptions = ({ navigation }) => {
  const { params = {} } = navigation.state;

  return {
    title: 'Calendar',
    headerRightContainerStyle: { ...Spacing.getStyles({ pt: 2, pr: 3 }) },
    headerRight:
  <View
    alignCenter
    onPress={() => params.handleSetAwayDates()}
  >
    <ScheduleTabIcon focused={false} />
  </View>,
  };
};

export default ScheduleScreen;
