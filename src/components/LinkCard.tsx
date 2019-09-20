import React, { useMemo } from 'react';


import {
  ArrowRightIcon,
  ContactIcon,
  DiagnosisIcon,
  WalletIcon,
  MessagesIcon,
  HistoryIcon,
} from '@src/components/icons';

import { SpacingProp, Colors } from '@src/styles';

import View from '@src/components/View';
import Text from '@src/components/Text';

type LinkCardProps = {
  type: 'wallet' | 'messages' | 'history' | 'diagnosis' | 'contact';
  spacing?: SpacingProp;
  status?: 'success' | 'error';
  children: JSX.Element;
  onPress: () => void;
};

const LinkCard = ({ type, spacing, status, children, onPress }: LinkCardProps) => {
  const { icon, title } = useMemo(() => {
    switch (type) {
      case 'wallet':
        return { icon: <WalletIcon />, title: 'Wallet' };
      case 'messages':
        return { icon: <MessagesIcon />, title: 'Messages' };
      case 'history':
        return { icon: <HistoryIcon />, title: 'History' };
      case 'diagnosis':
        return { icon: <DiagnosisIcon />, title: 'Injury' };
      case 'contact':
        return {
          icon: <ContactIcon tint={status === 'success' ? Colors.success : Colors.error} />,
          title: 'Complete Profile',
        };
      default:
        return null;
    }
  }, [type, status]);

  const titleVariant = useMemo(() => {
    switch (status) {
      case 'success':
        return 'titleSmallSuccess';
      case 'error':
        return 'titleSmallError';
      default:
        return 'titleSmall';
    }
  }, [status]);

  return (
    <View column variant="shadowCard" spacing={spacing}>

      <View row justifyBetween spacing={{ p: 1 }} onPress={onPress}>

        <View row flex={1}>
          <View column spacing={{ mr: 3 }}>{icon}</View>
          <View column flex={1}>
            <Text variant={titleVariant} spacing={{ mb: 2 }}>{title}</Text>
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
