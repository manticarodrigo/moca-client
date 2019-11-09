import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { format } from 'date-fns';

import useStore from '@src/hooks/useStore';
import useProfileStatus from '@src/hooks/useProfileStatus';
import useNavigation from '@src/hooks/useNavigation';

import View from '@src/components/View';
import Text from '@src/components/Text';
import LinkCard from '@src/components/LinkCard';
import NotificationBadge from '@src/components/NotificationBadge';

import * as Colors from '@src/styles/global/colors';

type Props = { isActivated: boolean }

const DashboardLinks = ({ isActivated }: Props) => {
  const { store } = useStore();

  const navigation = useNavigation();
  const profilePercent = useProfileStatus(store.user);

  const isTherapist = store.user.type === 'PT';

  const bgColor = (isTherapist && !isActivated) ? 'transparent' : 'lightGrey';

  const { profileReady, profilePercentString, styles } = useMemo(() => {
    const isReady = profilePercent >= 50;

    return {
      profileReady: isReady,
      profilePercentString: `${100 - profilePercent}% of your profile information is missing`,
      styles: StyleSheet.create({
        progressBarIndicator: {
          width: `${profilePercent}%`,
          backgroundColor: isReady ? Colors.success : Colors.error,
        },
      }),
    };
  }, [profilePercent]);

  const paymentsStr = useMemo(() => {
    const { payments = [] } = store.user;

    return payments.length ? (
      (payments[0].paymentInfo.last4
        && `**** **** **** **** ${payments[0].paymentInfo.last4}`
      )
      || payments[0].paymentInfo.routingNumber
    ) : 'Set payment info';
  }, [store.user]);

  const lastConversation = useMemo(() => {
    const conversations = store.conversations.list;

    if (!conversations.length) return undefined;

    return conversations[0];
  }, [store.conversations.list]);

  const lastAppointmentStr = useMemo(() => {
    const { last } = store.appointments;

    if (!last) return undefined;

    const { otherParty, endTime } = last;

    return `${otherParty.firstName} ${otherParty.lastName} / ${format(new Date(endTime), 'cccc')}`;
  }, [store.appointments]);

  const onPressLink = (screen: string) => () => navigation.navigate(screen);

  return (
    <View column flex={1} px={3} py={4} bgColor={bgColor}>

      {profilePercent !== 100 && (
        <LinkCard
          type="contact"
          status={profileReady ? 'success' : 'error'}
          onPress={onPressLink('ProfileScreen')}
        >
          <View>
            <Text variant="regularSmall" color={profileReady ? 'success' : 'error'}>
              {profilePercentString}
            </Text>
            <View mt={2} variant="progressBar">
              <View variant="progressBarIndicator" style={styles.progressBarIndicator} />
            </View>
          </View>
        </LinkCard>
      )}

      {!isTherapist && (
        <LinkCard type="injury" onPress={onPressLink('ProfileScreen')}>
          <Text variant="regularSmall" color="grey">
            {store.user.injury ? store.user.injury.title : 'Set my injury'}
          </Text>
        </LinkCard>
      )}

      <LinkCard type="wallet" onPress={onPressLink('WalletScreen')}>
        <Text variant="regularSmall" color="grey">
          {paymentsStr}
        </Text>
      </LinkCard>

      {isActivated && (
        <LinkCard type="messages" onPress={onPressLink('ConversationListScreen')}>
          <>
            {lastConversation ? (
              <>
                <Text variant="regularSmall" color="dark">
                  {lastConversation.user.firstName}
                  {' '}
                  {lastConversation.user.lastName}
                </Text>
                <Text variant="light" numberOfLines={1}>
                  {lastConversation.lastMessage.content.text || 'Appointment Request'}
                </Text>
                <NotificationBadge large />
              </>
            ) : (
              <Text variant="regularSmall" color="grey">
                No messages found
              </Text>
            )}
          </>
        </LinkCard>
      )}

      {(isActivated && lastAppointmentStr) && (
        <LinkCard type="history" onPress={onPressLink('HistoryScreen')}>
          <Text>
            <Text variant="regularSmall" color="grey">Last: </Text>
            <Text variant="semiBold" size={1} color="grey">
              {lastAppointmentStr}
            </Text>
          </Text>
        </LinkCard>
      )}

      {(!isTherapist || isActivated) && <View variant="bottomBounceFill" bgColor="lightGrey" />}

    </View>
  );
};

export default DashboardLinks;
