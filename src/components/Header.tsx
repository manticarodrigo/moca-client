import React, { useMemo } from 'react';

import { StyleSheet, ViewStyle } from 'react-native';
import { HeaderProps } from '@react-navigation/stack/src/types';

import { Colors } from '@src/styles';

import { BackButtonIcon } from '@src/icons';

import View from '@src/components/View';
import Text from '@src/components/Text';

const Header = ({ scene, previous, navigation }: HeaderProps) => {
  const { options } = scene.descriptor;
  const { headerStyle } = options;

  const styles = useMemo(() => StyleSheet.create({
    container: {
      backgroundColor: Colors.primary,
      ...(headerStyle && headerStyle as ViewStyle),
    },
  }), [headerStyle]);


  const HeaderTitle = options.headerTitle as React.ReactType;
  const HeaderRight = options.headerRight as React.ReactType;

  return (
    <View
      row
      justifyCenter={!previous}
      alignCenter
      spacing={{ p: 4, pt: 6 }}
      style={styles.container}
    >
      {previous && (
        <View
          column
          justifyCenter
          alignCenter
          width={32}
          height={32}
          shadow={{ color: 'secondary', blur: 2, alpha: 0.16 }}
          onPress={navigation.goBack}
        >
          <BackButtonIcon />
        </View>
      )}
      {options.headerTitle ? (
        <HeaderTitle />
      ) : (
        <Text variant="titleSmallWhite">{options.title || scene.route.name}</Text>
      )}

      {options.headerRight && <HeaderRight />}
    </View>
  );
};

export default Header;
