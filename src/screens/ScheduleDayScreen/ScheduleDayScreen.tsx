import React, { useState, useEffect, useMemo } from 'react';
import { StatusBar, FlatList } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { format, differenceInHours } from 'date-fns';

import { getDateForString } from '@src/utlities/dates';

import { ScheduleSectionIcon, NoConversationsIcon } from '@src/components/icons';

import CancellationModal from '@src/modals/CancellationModal';
import ProfileModal from '@src/modals/ProfileModal';
import AppointmentModal from '@src/modals/AppointmentModal';

import { Colors } from '@src/styles';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Image from '@src/components/Image';
import Tag from '@src/components/Tag';
import SwipeRow, { BinRow } from '@src/components/SwipeRow';

import { ListItem } from '@src/screens/ScheduleScreen/ScheduleScreen';

const ScheduleDayScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const [cancelId, setCancelId] = useState();
  const [selectedProfile, setSelectedProfile] = useState();
  const [selectedAppointment, setSelectedAppointment] = useState();

  const scheduleItem: ListItem = navigation.getParam('scheduleItem', {});

  const { appointments = [] } = scheduleItem;

  useEffect(() => {
    const date = getDateForString(scheduleItem.dateString);

    const dayOfMonth = format(date, 'dd');
    const monthAndYear = format(date, 'MMM yyyy');
    const dayOfWeek = format(date, 'cccc');
    const total = appointments.reduce((acc, { price }) => acc + price, 0);

    navigation.setParams({ total, dayOfMonth, monthAndYear, dayOfWeek });
  }, [scheduleItem]);

  const sortedData = useMemo(() => appointments.sort(
    (a, b) => new Date(a.startTime).getTime() - new Date(b.endTime).getTime(),
  ), [appointments]);

  const onCloseCancelModal = () => setCancelId(undefined);
  const onCloseProfileModal = () => setSelectedProfile(undefined);
  const onCloseAppointmentModal = () => setSelectedAppointment(undefined);

  const onMessageUser = (user) => {
    setSelectedProfile(undefined);

    navigation.navigate('ConversationScreen', { user });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />

      <CancellationModal
        visible={!!cancelId}
        appointmentId={cancelId}
        onToggle={onCloseCancelModal}
        onSubmit={onCloseCancelModal}
      />

      <ProfileModal
        userId={selectedProfile && selectedProfile.id}
        visible={!!selectedProfile}
        onMessage={onMessageUser}
        onClose={onCloseProfileModal}
      />

      <AppointmentModal
        past
        isTherapist
        appointment={selectedAppointment}
        visible={!!selectedAppointment}
        onClose={onCloseAppointmentModal}
      />

      <View safeArea flex={1} width="100%">
        {!appointments.length ? (
          <View flex={1} justifyCenter alignCenter>
            <NoConversationsIcon />
            <Text variant="title" color="semiGrey" align="center" pt={4}>
              You have not created any appointments for this date.
            </Text>
          </View>
        ) : (
          <FlatList
            data={sortedData}
            keyExtractor={({ id }) => id.toString()}
            renderItem={({ item }) => {
              const { id, otherParty, startTime, endTime, price } = item;
              const startDate = new Date(startTime);
              const endDate = new Date(endTime);

              const startFormatted = format(startDate, 'hh:mm aaaa');
              const endFormatted = format(endDate, 'hh:mm aaaa');
              const hoursSinceEnd = differenceInHours(new Date(), endDate);

              let notesTimeLeft = 48;
              if (hoursSinceEnd > 0) {
                notesTimeLeft = Math.max(48 - hoursSinceEnd, 0);
              }

              const onPressCancel = () => setCancelId(id);
              const onPressProfile = () => setSelectedProfile(otherParty);
              const onPressNote = () => setSelectedAppointment(item);

              return (
                <SwipeRow disabled={false}>
                  <BinRow onPress={onPressCancel} />
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
                      <View row alignCenter ml={2} onPress={onPressProfile}>
                        <Image rounded size={36} uri={otherParty.image} />
                        <View>
                          <Text ml={2} variant="semiBoldLarge" color="dark">
                            {`${otherParty.firstName} ${otherParty.lastName}`}
                          </Text>
                          {hoursSinceEnd >= 0 && (
                            <Text ml={2} mt={2} variant="link" onPress={onPressNote}>
                              {hoursSinceEnd < 48 ? 'Edit Note' : 'View Note'}
                            </Text>
                          )}
                        </View>
                      </View>
                    </View>
                    <View>
                      <Tag
                        icon="report"
                        type={(hoursSinceEnd < 0 || hoursSinceEnd > 48) ? 'border' : 'borderLight'}
                        placeholder={`${notesTimeLeft}h`}
                      />
                      <Tag mt={2} icon="dollar" type="fill" placeholder={price} />
                    </View>
                  </View>
                </SwipeRow>
              );
            }}
          />
        )}
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
