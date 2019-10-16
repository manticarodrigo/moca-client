import React from 'react';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import QualificationsContent from '@src/screens/QualificationsScreen/QualificationsContent';

const QualificationsScreen: NavigationStackScreenComponent = ({ navigation }) => (
  <QualificationsContent navigation={navigation} />
);

QualificationsScreen.navigationOptions = {
  title: 'Qualifications',
};

export default QualificationsScreen;
