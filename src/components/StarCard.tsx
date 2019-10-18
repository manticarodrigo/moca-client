import React from 'react';

import View from '@src/components/View';
import StarIcon from '@src/components/icons/StarIcon';

import { Views } from '@src/styles/index';


type VariantKey = keyof typeof Views;

type StarCardProps = {
  first: boolean;
  last: boolean;
  onPress: () => void;
  clicked: boolean;
}

const StarCard = ({ first, last, onPress, clicked }: StarCardProps) => {
  let viewVariant: VariantKey = 'star';

  if (first) { viewVariant = 'starFirst'; }
  if (last) { viewVariant = 'starLast'; }

  return (
    <View
      bgColor={clicked ? 'secondaryLight' : 'white'}
      alignCenter
      variant={viewVariant}
      onPress={onPress}
      spacing={{ p: 3 }}
    >
      <StarIcon clicked={clicked} />
    </View>
  );
};

export default StarCard;
