import React, { useMemo } from 'react';

import { StyleSheet, View, Image } from 'react-native';
import { Spacing, Colors } from '@src/styles';

import Text from './TextInput';


import { widthPercentageToDP, heightPercentageToDP } from '../deviceSize';

type FormFieldProps = {
  placeholder: string;
  icon?: any;
}

const FormField = ({ placeholder, icon }: FormFieldProps) => {

  const styles = useMemo(() => StyleSheet.create({
    view: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: Spacing.space[2],
      marginTop: Spacing.space[5],
      padding: Spacing.space[3],
      borderRadius: Spacing.space[1],
      width: widthPercentageToDP(87.2),
      height: heightPercentageToDP(8.3),
      backgroundColor: Colors['lightGrey'],
    },
    text: {
      color: Colors['text']
    }
  }), [placeholder]);

  return (
    <View style={styles.view}>
      <Text placeholder={placeholder} />
      <Image source={icon} />
    </View>
  );
};

export default FormField;