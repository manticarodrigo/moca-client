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
    <View m={4} p={3} pb={5} row variant="curveBorder" bgColor="white">
      <View flex={3}>
        <Text variant="semiBold" color="dark">My Injury</Text>
        <Text variant="regular">{title}</Text>
        <Text variant="light" color="dark" mt={3}>{details}</Text>
      </View>
      <View flex={1} alignCenter>
        <Image rounded size={58} />
      </View>
    </View>
  );
};

export default InjuryCard;
