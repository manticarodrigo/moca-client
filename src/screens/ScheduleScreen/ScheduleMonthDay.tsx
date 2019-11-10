import React from 'react';
import { ViewStyle } from 'react-native';

import { Colors } from '@src/styles';

import View from '@src/components/View';
import Text from '@src/components/Text';

const viewStyles: ViewStyle = {
  borderRadius: 10,
  width: 40,
  height: 40,
};

const dotStyles: ViewStyle = {
  position: 'absolute',
  top: 1,
  right: 1,
  borderRadius: 4,
  width: 8,
  height: 8,
  backgroundColor: Colors.secondary,
};

const CalendarDay = ({ date, marking, state, onPress }) => {
  const disabled = state === 'disabled';
  const today = state === 'today';

  const onDayPress = () => onPress(date);

  if (disabled) return null;

  let viewStyle: ViewStyle = viewStyles;

  if (today) {
    viewStyle = { ...viewStyles, backgroundColor: Colors.primary };
  }

  let dotStyle: ViewStyle;

  if (marking.total) {
    dotStyle = dotStyles;

    if (today) {
      dotStyle = { ...dotStyles, borderWidth: 2, borderColor: Colors.white, width: 10, height: 10 };
    }
  }

  return (
    <View
      justifyCenter
      alignCenter
      style={viewStyle}
      onPress={onDayPress}
    >
      <View style={dotStyle} />
      <Text
        variant="semiBold"
        color={today ? 'white' : 'greyishBrown'}
      >
        {date.day}
      </Text>
      <Text variant="lightSmallest" color={today ? 'secondaryLightest' : 'warmGrey'}>
        {marking.total ? `$${marking.total}` : ''}
      </Text>
    </View>
  );
};

export default React.memo(CalendarDay);
