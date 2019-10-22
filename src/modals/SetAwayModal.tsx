import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { format, addDays, differenceInDays, parseISO } from 'date-fns';

import { Colors, Texts, Spacing } from '@src/styles';

import Modal from '@src/components/Modal';
import View from '@src/components/View';
import Text from '@src/components/Text';
import Button from '@src/components/Button';


type Props = {
  isVisible: boolean;
  onToggle: () => void;
  onSubmit?: (startDay: string, endDay: string) => void;
};

const windoWidth = Dimensions.get('window').width;

const SetAwayModal = ({ isVisible, onToggle, onSubmit }: Props) => {
  const [startDay, setStartDay] = useState('');
  const [endDay, setEndDay] = useState('');

  const changeToDate = (date: string) => new Date(parseISO(date));


  let rangeInDays = 0;
  const markedDates = {};

  const isButtonDisabled = !(startDay && endDay);


  if (startDay && endDay) {
    rangeInDays = differenceInDays(changeToDate(endDay), changeToDate(startDay)) + 1;
    [...Array(rangeInDays)].forEach(
      (el, i) => {
        const date = format(addDays(changeToDate(startDay), i), 'yyyy-MM-dd');
        markedDates[date] = {
          startingDay: i === 0,
          color: (i === rangeInDays - 1 || i === 0)
            ? Colors.secondaryLight : Colors.secondaryLightest,
          textColor: (i === rangeInDays - 1 || i === 0) ? Colors.white : Colors.grey,
          endingDay: i === rangeInDays - 1 };
      },
    );
  } else if (startDay) {
    const date = format(changeToDate(startDay), 'yyyy-MM-dd');
    markedDates[date] = {
      startingDay: true,
      color: Colors.secondaryLight,
      textColor: 'white',
    };
    markedDates[date] = {
      startingDay: true,
      color: Colors.secondaryLight,
      textColor: 'white',
      endingDay: true,
    };
  }


  const handleDayPress = (day) => {
    if (!startDay) {
      setStartDay(day);
    }
    if (!endDay && startDay) {
      if (differenceInDays(changeToDate(day), changeToDate(startDay)) <= 0) {
        setStartDay(day);
      } else setEndDay(day);
    }

    if (startDay && endDay) {
      setStartDay(day);
      setEndDay('');
    }
  };

  const handleButtonPress = () => {
    onSubmit(startDay, endDay);
  };

  return (
    <Modal
      propagateSwipe
      isVisible={isVisible}
      onToggle={onToggle}
    >
      <View alignCenter spacing={{ pb: 6 }}>
        <View row>
          <View variant="borderBottom" flex={1} spacing={{ pb: 3 }} alignCenter justifyCenter>
            <Text variant="titleSmall">
              Set Away Days
            </Text>
          </View>
        </View>
        <View alignCenter row variant="borderBottom">
          <View
            flex={1}
            variant="borderRight"
            spacing={{ p: 3 }}
          >
            <Text variant="regularGrey">Start</Text>
            <Text
              variant={startDay ? 'titleSmall' : 'titleSmallSecondaryLight'}
              spacing={{ pt: 1 }}
            >
              {startDay || 'Select Date'}
            </Text>
          </View>
          <View
            flex={1}
            spacing={{ py: 2, px: 3 }}
            bgColor="white"
          >
            <Text variant="regularGrey">End</Text>
            <Text
              variant={endDay ? 'titleSmall' : 'titleSmallSecondaryLight'}
              spacing={{ pt: 1 }}
            >
              {endDay || 'Select Date'}
            </Text>
          </View>
        </View>
        <View flex={1}>
          <CalendarList
            current={new Date()}
            minDate={new Date()}
            onDayPress={(day) => handleDayPress(day.dateString)}
            markingType="period"
            markedDates={markedDates}
            calendarHeight={340}
            theme={{
              arrowColor: 'white',
              'stylesheet.calendar.main': {
                container: {},
              },
              'stylesheet.calendar-list.main': {
                calendar: { backgroundColor: Colors.lightGrey },
              },
              'stylesheet.calendar.header': {
                header: { ...Spacing.getStyles({ pt: 4, px: 2 }), alignItems: 'center' },
                monthText: { ...Texts.boldPrimary },
                week: {
                  ...Spacing.getStyles({ py: 3, px: 4 }),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                },
                dayHeader: { ...Texts.regularSmallGreyishBrown, textTransform: 'uppercase' },
              },
              'stylesheet.day.period': {
                text: { ...Texts.regularGrey, marginTop: 7 },
              },
            }}

            pastScrollRange={0}
            futureScrollRange={12}
            scrollEnabled
            showScrollIndicator
          />
        </View>
        <View width={windoWidth} spacing={{ p: 4 }} variant="borderTop">
          <Button
            disabled={isButtonDisabled}
            variant={isButtonDisabled ? 'primaryDisabled' : 'primary'}
            onPress={handleButtonPress}
          >
            Submit Days
          </Button>
        </View>
      </View>
    </Modal>

  );
};

export default SetAwayModal;
