import React, { useState, useEffect, useMemo } from 'react';
import { StatusBar, FlatList } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { format, addMinutes, differenceInMinutes } from 'date-fns';

import { ScheduleSectionIcon } from '@src/components/icons';

import CancellationModal from '@src/modals/CancellationModal';

import { Colors } from '@src/styles';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Image from '@src/components/Image';
import Tag from '@src/components/Tag';
import SwipeRow, { BinRow } from '@src/components/SwipeRow';

import { ListItem } from '@src/screens/ScheduleScreen/ScheduleScreen';

const ScheduleDayScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const [cancelModalVisible, setCancelModalVisible] = useState(false);

  const scheduleItem: ListItem = navigation.getParam('scheduleItem', {});

  useEffect(() => {
    const dateObj = new Date(scheduleItem.timestamp);

    const dayOfMonth = format(dateObj, 'dd');
    const monthAndYear = format(dateObj, 'MMM yyyy');
    const dayOfWeek = format(dateObj, 'cccc');
    const total = scheduleItem.appointments.reduce((acc, { price }) => acc + price, 0);

    navigation.setParams({ total, dayOfMonth, monthAndYear, dayOfWeek });
  }, []);

  const sortedData = useMemo(() => scheduleItem.appointments.sort(
    (a, b) => new Date(a.startTime).getTime() - new Date(b.endTime).getTime(),
  ), [scheduleItem.appointments]);

  return (
    <>
      <StatusBar barStyle="dark-content" />

      <CancellationModal
        visible={cancelModalVisible}
        onToggle={() => setCancelModalVisible(false)}
      />

      <View safeArea flex={1} width="100%">
        <FlatList
          data={sortedData}
          keyExtractor={({ id }) => id.toString()}
          renderItem={({ item }) => {
            const { otherParty, startTime, endTime, price } = item;

            const duration = differenceInMinutes(new Date(endTime), new Date(startTime));
            const startFormatted = format(new Date(startTime), 'hh:mm aaaa');
            const endFormatted = format(addMinutes(new Date(startTime), duration), 'hh:mm aaaa');

            return (
              <SwipeRow disabled={false} onPress={() => null}>
                <BinRow onPress={() => setCancelModalVisible(true)} />
                <View
                  row
                  justifyBetween
                  alignCenter
                  p={3}
                  variant="borderBottom"
                  bgColor="white"
                >
                  <View row>
                    <ScheduleSectionIcon />
                    <View justifyBetween ml={2}>
                      <Text variant="regularSmall" color="secondary">{startFormatted}</Text>
                      <Text variant="regularSmall" color="secondary">{endFormatted}</Text>
                    </View>
                    <View row alignCenter ml={2}>
                      <Image rounded size={36} uri={otherParty.image} />
                      <Text ml={2} variant="semiBold" color="dark">
                        {`${otherParty.firstName} ${otherParty.lastName}`}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Tag icon="report" type="borderLight" placeholder="10h" />
                    <Tag mt={2} icon="dollar" type="fill" placeholder={price} />
                  </View>
                </View>
              </SwipeRow>
            );
          }}
        />
      </View>
    </>
  );
};

const HeaderTitle = ({ dayOfMonth = '', monthAndYear = '', dayOfWeek = '' }) => (
  <View row flex={1} p={3}>
    <Text variant="titleLarge">{dayOfMonth}</Text>
    <View ml={2}>
      <Text variant="light" size={0} color="primary">{monthAndYear}</Text>
      <Text variant="regularSmall" color="primary">{dayOfWeek}</Text>
    </View>
  </View>
);

const HeaderRight = ({ total = '' }) => (
  <View p={3}><Tag icon="dollar" type="fill" placeholder={total} /></View>
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
