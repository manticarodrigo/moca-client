import React from 'react';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import { Colors, Views } from '@src/styles';
import QualificationsContent from '@src/screens/QualificationsScreen/QualificationsContent';

const QualificationsScreen: NavigationStackScreenComponent = ({ navigation }) => (
  <QualificationsContent navigation={navigation} />
);

QualificationsScreen.navigationOptions = ({ navigationOptions }) => ({
  title: 'Qualifications',
  headerTitleStyle: {
    color: Colors.primary,
  },
  headerStyle: {
    ...navigationOptions.headerStyle as {},
    ...Views.borderBottom,
    backgroundColor: Colors.white,
  },
});

export default QualificationsScreen;
