import React, { useState } from 'react';

import View from '@src/components/View';
import Text from '@src/components/Text';

// import CreditCardsTab from './CreditCardsTab';
import NotesTab from './NotesTab';

const HistoryScreen = () => {
  const [active, setActive] = useState(0);

  const tabs = ['Appointments', 'Notes'];

  const handlePress = (index) => setActive(index);

  return (
    <View>
      <View bgColor="primary" alignCenter>
        <View row justifyCenter width="90%" spacing={{ m: 4 }}>
          {tabs.map((value, index) => (
            <View
              key={value}
              alignCenter
              flex={1}
              bgColor={index === active ? 'secondary' : 'primary'}
              spacing={{ p: 2 }}
              variant={index === 0 ? 'roundedBorderLeft' : 'roundedBorderRight'}
              onPress={() => handlePress(index)}
            >
              <Text variant={index === active ? 'titleSmallWhite' : 'titleSmallSecondary'}>{value}</Text>
            </View>
          ))}
        </View>
      </View>
      {active ? <NotesTab /> : null}
    </View>
  );
};

HistoryScreen.navigationOptions = () => ({
  headerTitle: 'History',
});

export default HistoryScreen;
