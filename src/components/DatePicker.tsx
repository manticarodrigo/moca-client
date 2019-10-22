import React from 'react';

import { Texts } from '@src/styles';

import RNDatePicker from 'react-native-datepicker';

const DatePicker = ({ existingDate, placeholder, onChange }) => (
  <RNDatePicker
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
      placeholderText: {
        ...Texts.regularSmallGrey,
      },
      dateInput: {
        borderWidth: 0,
        alignItems: 'flex-start',
      },
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      btnTextText: {
        ...Texts.boldSecondary,
      },
    }}
  />
);

export default DatePicker;