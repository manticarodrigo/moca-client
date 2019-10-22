import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';

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

  const latestConversation = useMemo(() => {
    const conversations = store.conversations.list;

    return conversations.find(({ lastMessage }) => lastMessage.type === 'text');
  }, [store.conversations.list]);

  const onPressLink = (screen: string) => () => navigation.navigate(screen);

  return (
    <View column spacing={{ px: 3, py: 4 }} flex={1} bgColor={bgColor}>

      {profilePercent !== 100 && (
        <LinkCard
          type="contact"
          status={profileReady ? 'success' : 'error'}
          spacing={{ mb: 2 }}
          onPress={onPressLink('ProfileScreen')}
        >
          <View>
            <Text variant={profileReady ? 'regularSmallSuccess' : 'regularSmallError'}>
              {profilePercentString}
            </Text>
            <View variant="progressBar" spacing={{ mt: 2 }}>
              <View variant="progressBarIndicator" style={styles.progressBarIndicator} />
            </View>
          </View>
        </LinkCard>
      )}

      {!isTherapist && (
        <LinkCard type="diagnosis" spacing={{ mb: 2 }} onPress={onPressLink('ProfileScreen')}>
          <Text variant="regularSmallGrey">
            Set my injury
          </Text>
        </LinkCard>
      )}

      <LinkCard type="wallet" spacing={{ mb: 2 }} onPress={onPressLink('WalletScreen')}>
        <Text variant="regularSmallGrey">
          {store.user.payments.length ? (
            (
              store.user.payments[0].paymentInfo.last4
              && `**** **** **** **** ${store.user.payments[0].paymentInfo.last4}`
            )
            || store.user.payments[0].paymentInfo.routingNumber
          ) : 'Set payment info'}
        </Text>
      </LinkCard>

      {isActivated && (
        <LinkCard
          type="messages"
          spacing={{ mb: 2 }}
          onPress={onPressLink('ConversationListScreen')}
        >
          <>
            {latestConversation ? (
              <>
                <Text variant="regularSmallDark">
                  {latestConversation.user.firstName}
                  {' '}
                  {latestConversation.user.lastName}
                </Text>
                <Text variant="light" numberOfLines={1}>
                  {latestConversation.lastMessage.content.text}
                </Text>
                <NotificationBadge large />
              </>
            ) : (
              <Text variant="regularSmallDark">
                No messages were found
              </Text>
            )}
          </>
        </LinkCard>
      )}

      {/* {isActivated && (
        <LinkCard type="history" spacing={{ mb: 2 }} onPress={onPressLink('HistoryScreen')}>
          <Text>
            <Text variant="regularSmallGrey">Last: </Text>
            <Text variant="boldSmallGrey">Adele Dust / Wed</Text>
          </Text>
        </LinkCard>
      )} */}

      {(!isTherapist || isActivated) && <View variant="bottomBounceFill" bgColor="lightGrey" />}

    </View>
  );
};

export default DashboardLinks;
