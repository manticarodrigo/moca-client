import React, { useMemo } from 'react';

import {
  AddCardIcon,
  ArrowRightIcon,
  CheckedIcon,
  AmexIcon,
  MaestroIcon,
  MasterCardIcon,
  VisaIcon,
} from '@src/icons';

import Text from './Text';
import View from './View';

type CardProps = {
  type: string;
  title?: string;
  details?: string;
  arrow?: boolean;
  large?: boolean;
  children?: JSX.Element | JSX.Element[];
  onPress?: () => void;
  selected?: boolean;
}


const Card = ({ type, title, arrow, details, large, onPress, selected }: CardProps) => {
  const { icon, text } = useMemo(() => {
    switch (type) {
      case 'amex':
        return { icon: <AmexIcon />, text: title || null };
      case 'maestro':
        return { icon: <MaestroIcon />, text: title || null };
      case 'masterCard':
        return { icon: <MasterCardIcon />, text: title || null };
      case 'visa':
        return { icon: <VisaIcon />, text: title || null };
      case 'addCard':
        return { icon: <AddCardIcon />, text: 'Add New Stripe Account' };
      default:
        return null;
    }
  }, [type, title]);

  return (
    <View
      row
      justifyBetween
      width="100%"
      height={large ? 80 : 50}
      bgColor="white"
      variant="borderBottom"
      spacing={{ p: 3 }}
      onPress={onPress}
    >
      <View row>
        <View spacing={{ m: 2 }}>
          {icon}
        </View>
        <View column spacing={{ mr: 5, ml: 3 }} justifyCenter={!details}>
          <Text variant="titleSmall">
            {text}
          </Text>
          {details && <Text typography={{ size: 2, weight: '300', color: 'grey' }} spacing={{ mt: 1 }}>{details}</Text>}
        </View>
      </View>
      {arrow
        && (
          <View spacing={{ m: 3 }}>
            <ArrowRightIcon />
          </View>
        )}
      {selected
        && (
          <View spacing={{ m: 2 }}>
            <CheckedIcon />
          </View>
        )}
    </View>
  );
};

export default Card;
