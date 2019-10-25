import React from 'react';

import View from '@src/components/View';
import Text from '@src/components/Text';

const SegmentedControl = ({ activeKey, tabMap, onPress }) => (
  <View bgColor="primary" alignCenter>
    <View row justifyCenter spacing={{ p: 4 }}>
      {Object.entries(tabMap).map(([key, value], index) => (
        <View
          key={key}
          alignCenter
          flex={1}
          bgColor={key === activeKey ? 'secondary' : 'primary'}
          spacing={{ p: 2 }}
          variant={index === 0 ? 'roundedBorderLeft' : 'roundedBorderRight'}
          onPress={() => onPress(key)}
        >
          <Text variant={key === activeKey ? 'titleSmallWhite' : 'titleSmallSecondary'}>
            {/* @ts-ignore */}
            {value}
          </Text>
        </View>
      ))}
    </View>
  </View>
);

export default SegmentedControl;
