import React, { useMemo } from 'react';


import {
  ArrowRightIcon,
  WalletIcon,
  MessagesIcon,
  HistoryIcon,
} from '@src/components/icons';

import View from '@src/components/View';
import Text from '@src/components/Text';

type LinkCardProps = {
  type: 'wallet' | 'messages' | 'history';
  onPress: () => void;
  children: JSX.Element;
};

const LinkCard = ({ type, onPress, children }: LinkCardProps) => {
  const { icon, title } = useMemo(() => {
    switch (type) {
    case 'wallet':
      return { icon: <WalletIcon />, title: 'Wallet' };
    case 'messages':
      return { icon: <MessagesIcon />, title: 'Messages' };
    case 'history':
      return { icon: <HistoryIcon />, title: 'History' };
    default:
      return null;
    }
  }, [type]);

  return (
    <View variant="shadowCard" width="100%" spacing={{ mb: 2 }}>
      <View row spacing={{ p: 1 }} onPress={onPress}>
        {icon}
        <View column spacing={{ pl: 3 }}>
          <Text variant="titleSmall" spacing={{ mb: 2 }}>
            {title}
          </Text>
          {children}
        </View>
        <View row flex={1} justifyEnd alignCenter>
          <ArrowRightIcon />
        </View>
      </View>
    </View>
  );
};

export default LinkCard;
