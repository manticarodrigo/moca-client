import React, { useState, useMemo } from 'react';
import { format, addDays, differenceInDays, parseISO } from 'date-fns';

import { WINDOW_WIDTH } from '@src/utlities/constants';

import { Colors } from '@src/styles';

import CalendarList from '@src/components/CalendarList';
import Modal from '@src/components/Modal';
import View from '@src/components/View';
import Text from '@src/components/Text';
import Button from '@src/components/Button';


type Props = {
  isVisible: boolean;
  onToggle: () => void;
  onSubmit?: (startDay: string, endDay: string) => void;
};

const SetAwayModal = ({ isVisible, onToggle, onSubmit }: Props) => {
  const [startDay, setStartDay] = useState('');
  const [endDay, setEndDay] = useState('');

  const markedDates = useMemo(() => {
    let daysInRange = 0;

    const datesMap = {};

    if (startDay && endDay) {
      daysInRange = differenceInDays(parseISO(endDay), parseISO(startDay)) + 1;

      [...Array(daysInRange)].forEach((el, i) => {
        const date = format(addDays(parseISO(startDay), i), 'yyyy-MM-dd');

        const isFirst = i === 0;
        const isLast = i === daysInRange - 1;

        datesMap[date] = {
          startingDay: i === 0,
          color: (isFirst || isLast) ? Colors.secondaryLight : Colors.secondaryLightest,
          textColor: (isFirst || isLast) ? Colors.white : Colors.grey,
          endingDay: isLast,
        };
      });
    } else if (startDay) {
      const date = format(parseISO(startDay), 'yyyy-MM-dd');

      datesMap[date] = {
        startingDay: true,
        color: Colors.secondaryLight,
        textColor: 'white',
        endingDay: true,
      };
    }

    return datesMap;
  }, [startDay, endDay]);

  const isButtonDisabled = !(startDay && endDay);

  const onDayPress = ({ dateString }) => {
    if (!startDay) {
      setStartDay(dateString);
    }
    if (!endDay && startDay) {
      if (differenceInDays(parseISO(dateString), parseISO(startDay)) <= 0) {
        setStartDay(dateString);
      } else setEndDay(dateString);
    }

    if (startDay && endDay) {
      setStartDay(dateString);
      setEndDay('');
    }
  };

  const onPressSubmit = () => onSubmit(startDay, endDay);

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
            onDayPress={onDayPress}
            markedDates={markedDates}
          />
        </View>
        <View width={WINDOW_WIDTH} spacing={{ p: 4 }} variant="borderTop">
          <Button
            disabled={isButtonDisabled}
            variant={isButtonDisabled ? 'primaryDisabled' : 'primary'}
            onPress={onPressSubmit}
          >
            Submit Days Off
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default SetAwayModal;
