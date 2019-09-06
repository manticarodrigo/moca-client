import React, { useMemo, useState } from 'react';

import { StyleSheet, View, TextInputProps, Text } from 'react-native';
import { Spacing, Colors } from '../styles';


import { widthPercentageToDP, heightPercentageToDP } from '../utlities/deviceSize';

import TextInput from './TextInput';

type ZipCodeFieldProps = TextInputProps;

const ZipCodeField = ({ ...textInputProps }: ZipCodeFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const styles = useMemo(() => StyleSheet.create({
    view: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: Spacing.spaceSize[2],
      marginTop: Spacing.spaceSize[5],
      padding: Spacing.spaceSize[3],
      width: widthPercentageToDP(87.2),
      height: heightPercentageToDP(8.3),
      backgroundColor: isFocused ? Colors.semiGreyLighter : Colors.lightGrey,
    },
    text: {
      color: Colors.black,
      letterSpacing: 5,
      paddingTop: heightPercentageToDP(3.0),
      fontSize: 16,
      width: widthPercentageToDP(70),
      height: heightPercentageToDP(8.3),
      textAlign: 'center',
      alignSelf: 'center',
    },
  }), [isFocused]);

  return (
    <View style={styles.view}>
      <TextInput
        placeholder="____________"
        style={styles.text}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...textInputProps}
      />
      <Text style={{ letterSpacing: 3 }}>
        Ahmed Abdelhamid
      </Text>
    </View>
  );
};

export default ZipCodeField;
