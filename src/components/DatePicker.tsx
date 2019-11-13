import React from 'react';

import { Typography, Texts } from '@src/styles';

import RNDatePicker from 'react-native-datepicker';

const smallRegularGrey = Typography.getStyles({ size: 1, weight: '500', color: 'grey' });

const semiBoldSecondary = {
  ...Typography.getStyles({ ...Texts.semiBold, color: 'secondary' }),
};

const DatePicker = ({ existingDate, placeholder, onChange }) => (
  <RNDatePicker
    showIcon={false}
    style={{ width: 150 }}
    date={existingDate}
    mode="date"
    placeholder={placeholder}
    format="YYYY-MM-DD"
    maxDate={new Date()}
    confirmBtnText="Confirm"
    cancelBtnText="Cancel"
    onDateChange={onChange}
    customStyles={{
      placeholderText: smallRegularGrey,
      dateInput: {
        borderWidth: 0,
        alignItems: 'flex-start',
        height: 'auto',
      },
      dateTouchBody: {
        paddingTop: 8,
        height: 'auto',
      },
      dateText: smallRegularGrey,
      // @ts-ignore
      btnTextText: semiBoldSecondary,
    }}
  />
);

export default DatePicker;
