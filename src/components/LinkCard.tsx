import React, { useMemo } from 'react';


import {
  ArrowRightIcon,
  ContactIcon,
  InjuryIcon,
  WalletIcon,
  MessagesIcon,
  HistoryIcon,
} from '@src/components/icons';

import { Colors } from '@src/styles';

import View from '@src/components/View';
import Text from '@src/components/Text';

type LinkCardProps = {
  type: 'wallet' | 'messages' | 'upcoming' | 'history' | 'injuries' | 'contact';
  status?: 'success' | 'error';
  children: JSX.Element;
  onPress: () => void;
};

const LinkCard = ({ type, status, children, onPress }: LinkCardProps) => {
  const { icon, title } = useMemo(() => {
    switch (type) {
      case 'wallet':
        return { icon: <WalletIcon />, title: 'Wallet' };
      case 'messages':
        return { icon: <MessagesIcon />, title: 'Messages' };
      case 'upcoming':
        return { icon: <HistoryIcon />, title: 'Upcoming' };
      case 'history':
        return { icon: <HistoryIcon />, title: 'History' };
      case 'injuries':
        return { icon: <InjuryIcon />, title: 'My Injuries' };
      case 'contact':
        return {
          icon: <ContactIcon tint={status === 'success' ? Colors.success : Colors.error} />,
          title: 'Complete Profile',
        };
      default:
        return null;
    }
  }, [type, status]);

  const titleColor = useMemo(() => {
    switch (status) {
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      default:
        return undefined;
    }
  }, [status]);

  return (
    <View column variant="shadowCard" mb={2}>

      <View row justifyBetween p={1} onPress={onPress}>

        <View row flex={1}>
          <View column mr={3} width={48}>{icon}</View>
          <View column flex={1}>
            <Text variant="semiBoldLarge" color={titleColor} mb={2}>{title}</Text>
            {children}
          </View>
        </View>

        <View row alignCenter ml={3}>
          <ArrowRightIcon />
        </View>

      </View>

    </View>
  );
};

export default LinkCard;
