import React, { useState } from 'react';
import { CalendarList } from 'react-native-calendars';


import View from '@src/components/View';
import Text from '@src/components/Text';
import ModalView from '@src/components/ModalView';

import { format, addDays, differenceInDays, parseISO } from 'date-fns';


import { TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
import { Colors } from '@src/styles';
import Button from '@src/components/Button';
import { secondaryLightest } from '@src/styles/global/colors';


type SetAwayProps = {
  closeInputModal: () => void;
  isModalVisible: boolean;
  onSubmit?: (value: string) => void;
};

const SetAwayPModal = (
  {
    closeInputModal,
    isModalVisible = false,
  }: SetAwayProps,
) => {
  const [startDay, setStartDay] = useState('');
  const [endDay, setEndDay] = useState('');
  const [startDayPressed, setStartDayPressed] = useState(true);
  const [endDayPressed, setEndDayPressed] = useState(false);


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
    setStartDayPressed(false);
    setEndDayPressed(false);

    if (!startDay) {
      setStartDay(day);
    }
    if (!endDay && startDay) {
      if (differenceInDays(changeToDate(day), changeToDate(startDay)) <= 0) {
        setStartDay(day);
      } else setEndDay(day);
    }

    if (startDay && endDay) {
      if (startDayPressed) {
        if (differenceInDays(changeToDate(day), changeToDate(endDay)) >= 0) {
          setEndDay('');
        }
        setStartDay(day);
        return;
      }

      if (differenceInDays(changeToDate(day), changeToDate(startDay)) > 0) {
        setEndDay(day);
      } else {
        setStartDay(day);
      }
    }
  };

  const handleButtonPress = () => {

  };

  return (
    <ModalView
      height={100}
      isVisible={isModalVisible}
      propagateSwipe
      onBackdropPress={() => {
        closeInputModal();
      }}
      onSwipeComplete={() => {
        closeInputModal();
      }}
      handleArrowClick={() => {
        closeInputModal();
      }}
    >
      <View alignCenter>
        <View row>
          <View variant="borderBottom" flex={1} height={48} alignCenter justifyCenter>
            <Text variant="titleSmall">
              {'Set Away Days'}
            </Text>
          </View>
        </View>
        <View alignCenter row spacing={{ pb: 4 }}>
          <View
            flex={1}
            variant="borderRight"
            onPress={() => {
              setStartDayPressed(true);
              setEndDayPressed(false);
            }}
          >
            <View bgColor={startDayPressed ? 'lightGrey' : 'white'}>
              <Text variant="regularGrey" spacing={{ mt: 2, ml: 2 }}>start</Text>
              <Text
                variant={startDay ? 'titleSmall' : 'titleSmallSecondaryLight'}
                typography={startDay ? null : { weight: '300' }}
                spacing={{ mt: 2, ml: 2, mb: 3 }}
              >
                {startDay || 'Select Date'}
              </Text>
            </View>
          </View>
          <View
            flex={1}
            spacing={{ pl: 2 }}
            bgColor={endDayPressed ? 'lightGrey' : 'white'}
            onPress={() => {
              setEndDayPressed(true);
              setStartDayPressed(false);
            }}
          >
            <Text variant="regularGrey" spacing={{ mt: 2 }}>end</Text>
            <Text
              typography={startDay ? null : { weight: '300' }}
              variant={endDay ? 'titleSmall' : 'titleSmallSecondaryLight'}
              spacing={{ mt: 2, mb: 3 }}
            >
              {endDay || 'Select Date'}
            </Text>
          </View>
        </View>
        <View flex={1}>
          <View flex={4}>
            <TouchableWithoutFeedback>
              <TouchableHighlight>
                <CalendarList
                  current={new Date()}
                  minDate={new Date()}
                  onDayPress={(day) => handleDayPress(day.dateString)}
                  markingType="period"
                  markedDates={markedDates}
                  theme={{
                    arrowColor: 'white',
                    'stylesheet.calendar.header': {
                      week: {
                        marginTop: 5,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      },
                    },
                  }}

                  pastScrollRange={50}
                  futureScrollRange={50}
                  scrollEnabled
                  showScrollIndicator
                />
              </TouchableHighlight>
            </TouchableWithoutFeedback>
          </View>
          <View flex={1} spacing={{ mb: 4, mx: 3 }}>
            <View flex={1} />
            <Button
              disabled={isButtonDisabled}
              variant={isButtonDisabled ? 'primaryDisabled' : 'primary'}
              onPress={handleButtonPress}
            >
                Set Dates
            </Button>
          </View>
        </View>
      </View>
    </ModalView>

  );
};

export default SetAwayPModal;
