import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { format, addMinutes } from 'date-fns';

import { mockImg } from '@src/services/mock';

import { ScheduleSectionIcon } from '@src/components/icons';

import CancellationModal from '@src/modals/CancellationModal';

import { Colors } from '@src/styles';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Image from '@src/components/Image';
import Tag from '@src/components/Tag';
import SwipeRow, { BinRow } from '@src/components/SwipeRow';

const ScheduleDayScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const [cancelModalVisible, setCancelModalVisible] = useState(false);

  const { timestamp = new Date() } = navigation.getParam('selectedDate', {});


  const data = Array.from({ length: 25 }, (v, i) => ({
    id: `id-${i}`,
    name: 'Jane Doe',
    start: 1570566600,
    duration: 45,
    earnings: 60,
    reportTimeLeft: 6,
  }));


  useEffect(() => {
    const dayOfMonth = format(timestamp, 'dd');
    const monthAndYear = format(timestamp, 'MMM yyyy');
    const dayOfWeek = format(timestamp, 'cccc');
    const total = data.reduce((acc, { earnings }) => acc + earnings, 0);

    navigation.setParams({ total, dayOfMonth, monthAndYear, dayOfWeek });
  }, []);

  return (
    <View safeArea flex={1} width="100%">
      <FlatList
        data={data}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => {
          const { name, start, duration, earnings, reportTimeLeft } = item;
          const startFormatted = format(start, 'hh:mm aaaa');
          const endFormatted = format(addMinutes(start, duration), 'hh:mm aaaa');

          return (
            <SwipeRow disabled={false} onPress={() => null}>
              <BinRow onPress={() => setCancelModalVisible(true)} />
              <View
                row
                justifyBetween
                alignCenter
                spacing={{ p: 3 }}
                variant="borderBottom"
                bgColor="white"
              >
                <View row>
                  <ScheduleSectionIcon />
                  <View column justifyBetween spacing={{ ml: 2 }}>
                    <Text variant="regularSecondary">{startFormatted}</Text>
                    <Text variant="regularSecondary">{endFormatted}</Text>
                  </View>
                  <View row alignCenter spacing={{ ml: 2 }}>
                    <Image rounded size={36} uri={mockImg} />
                    <Text variant="titleSmallDark" spacing={{ ml: 2 }}>{name}</Text>
                  </View>
                </View>
                <View column>
                  <Tag icon="report" type="borderLight" placeholder={`${reportTimeLeft}h`} />
                  <Tag icon="dollar" type="fill" placeholder={earnings} spacing={{ mt: 2 }} />
                </View>
              </View>
            </SwipeRow>
          );
        }}
      />
      <CancellationModal
        visible={cancelModalVisible}
        onToggle={() => setCancelModalVisible(false)}
      />
    </View>
  );
};

const HeaderTitle = ({ dayOfMonth = '', monthAndYear = '', dayOfWeek = '' }) => (
  <View row flex={1} spacing={{ p: 3 }}>
    <Text variant="titlePrimaryLarge">{dayOfMonth}</Text>
    <View spacing={{ ml: 2 }}>
      <Text variant="lightPrimarySmallest">{monthAndYear}</Text>
      <Text variant="regularPrimary">{dayOfWeek}</Text>
    </View>
  </View>
);

const HeaderRight = ({ total = '' }) => (
  <View spacing={{ p: 3 }}>
    <Tag icon="dollar" type="fill" placeholder={total} />
  </View>
);

ScheduleDayScreen.navigationOptions = ({ navigation, navigationOptions }) => {
  const { params = {} } = navigation.state;

  return {
    headerTitle: <HeaderTitle {...params} />,
    headerRight: <HeaderRight {...params} />,
    headerStyle: {
      ...navigationOptions.headerStyle as {},
      backgroundColor: Colors.lightGrey,
      height: 80,
    },
  };
};

export default ScheduleDayScreen;
