import React from 'react';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Image from '@src/components/Image';

const mock = {
  title: 'Neck Hernia',
  details: 'My back is injured I need emergency therapy …',
};

const InjuryCard = () => {
  const { title, details } = mock;

  return (
    <View row variant="curveBorder" bgColor="white" spacing={{ p: 3, pb: 5, m: 4 }}>
      <View flex={3}>
        <Text variant="titleSmallDark">My Injury</Text>
        <Text variant="regularSemiGrey">{title}</Text>
        <Text variant="smallDark" spacing={{ mt: 3 }}>{details}</Text>
      </View>
      <View flex={1} alignCenter spacing={{}}>
        <Image rounded size={58} />
      </View>
    </View>
  );
};

export default InjuryCard;
