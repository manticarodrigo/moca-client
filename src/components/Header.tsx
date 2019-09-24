import React, { useMemo } from 'react';

import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { HeaderProps } from '@react-navigation/stack/src/types';

import { Colors } from '@src/styles';

import { BackButtonIcon } from '@src/icons';

import View from '@src/components/View';
import Text from '@src/components/Text';

const Header = ({ scene, previous, navigation }: HeaderProps) => {
  const { options } = scene.descriptor;
  const { headerStyle, headerTitleStyle } = options;

  const styles = useMemo(() => StyleSheet.create({
    container: {
      backgroundColor: Colors.primary,
      ...(headerStyle && headerStyle as ViewStyle),
    },
    title: {
      ...(headerTitleStyle && headerTitleStyle as TextStyle),
    },
  }), [headerStyle, headerTitleStyle]);


  const HeaderTitle = options.headerTitle as React.ReactType;
  const HeaderRight = options.headerRight as React.ReactType;

  return (
    <View
      row
      justifyBetween
      alignCenter
      spacing={{ px: 4, pt: 5, pb: 3 }}
      style={styles.container}
    >
      <View
        column
        justifyCenter
        alignCenter
        width={32}
        height={32}
        shadow={previous && { color: 'secondary', blur: 2, alpha: 0.16 }}
        onPress={previous && navigation.goBack}
      >
        {previous && <BackButtonIcon />}
      </View>

      {options.headerTitle ? (
        <HeaderTitle />
      ) : (
        <Text variant="titleSmallWhite" style={styles.title}>
          {options.title || scene.route.name}
        </Text>
      )}

      <View
        column
        justifyCenter
        alignCenter
        width={32}
        height={32}
        onPress={navigation.goBack}
      >
        {options.headerRight && <HeaderRight />}
      </View>
    </View>
  );
};

export default Header;
