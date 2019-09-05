import React, { useMemo } from 'react';


import {
  ArrowRightIcon,
  WalletIcon,
  MessagesIcon,
  HistoryIcon,
} from '@src/components/icons';

import { SpacingProp } from '@src/styles';

import View from '@src/components/View';
import Text from '@src/components/Text';

type LinkCardProps = {
  type: 'wallet' | 'messages' | 'history';
  spacing?: SpacingProp;
  children: JSX.Element;
  onPress: () => void;
};

const LinkCard = ({ type, spacing, children, onPress }: LinkCardProps) => {
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
    <View column variant="shadowCard" spacing={spacing}>

      <View row justifyBetween spacing={{ p: 1 }} onPress={onPress}>

        <View row flex={1}>
          <View column spacing={{ mr: 3 }}>{icon}</View>
          <View column flex={1}>
            <Text variant="titleSmall" spacing={{ mb: 2 }}>{title}</Text>
            {children}
          </View>
        </View>

        <View row alignCenter spacing={{ ml: 3 }}>
          <ArrowRightIcon />
        </View>

      </View>

    </View>
  );
};

export default LinkCard;
