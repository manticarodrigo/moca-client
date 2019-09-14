import React, { useState } from 'react';

import View from '@src/components/View';
import Text from '@src/components/Text';

import {
  LowestPriceIcon,
  MorningIcon,
  AfternoonIcon,
  EveningIcon,
  MostReviewedIcon,
  HighestRatedIcon,
} from '@src/components/icons';

const FilterScreen = () => {
  const filterItems = {
    sortBy: {
      title: 'Sort By',
      items: [
        {
          icon: <LowestPriceIcon />,
          firstLine: 'Lowest',
          secondLine: 'Price',
        },
        {
          icon: <MostReviewedIcon />,
          firstLine: 'Most',
          secondLine: 'Reviews',
        },
        {
          icon: <HighestRatedIcon />,
          firstLine: 'Highest',
          secondLine: 'Rated',
        },
      ],
    },
    desiredTime: {
      title: 'Desired Time',
      items: [
        {
          icon: <MorningIcon />,
          firstLine: 'Morning',
        },
        {
          icon: <AfternoonIcon />,
          firstLine: 'Afternoon',
        },
        {
          icon: <EveningIcon />,
          firstLine: 'Evening',
        },
      ],
    },
    sessionLength: {
      title: 'Session Length',
      items: [
        {
          firstLine: '30 min',
        },
        {
          firstLine: '45 min',
        },
        {
          firstLine: '60 min',
        },
      ],
    },
    desiredCost: {
      title: 'Desired Cost',
      items: [
        {
          firstLine: '$40-$60',
        },
        {
          firstLine: '$60-$80',
        },
        {
          firstLine: '$80-$125',
        },
      ],
    },
    gender: {
      title: 'Gender',
      items: [
        {
          firstLine: 'Female',
        },
        {
          firstLine: 'Male',
        },
        {
          firstLine: 'Either',
        },
      ],
    },
  };

  const [focus, setfocus] = useState(['Female', 'Either', 'Evening']);

  const handlePress = (key) => {
    const newFocus = focus;
    const index = newFocus.indexOf(key);
    if (index !== -1) {
      newFocus.splice(index, 1);
    } else {
      newFocus.push(key);
    }
    setfocus(newFocus);
  };

  return (
    <View scroll flex={1} bgColor="white">
      {Object.keys(filterItems).map((key) => (
        <View key={key} column bgColor="white" variant="borderBottom" height={200}>
          <Text variant="boldGrey" spacing={{ m: 3 }}>{filterItems[key].title}</Text>
          <View
            row
            variant="roundedBorder"
            height={(key === 'Session Length') || (key === 'Desired Cost') ? 80 : 100}
            spacing={{ mx: 3 }}
            bgColor="semiGrey"
          >
            {filterItems[key].items.map((item) => (
              <View
                alignCenter
                justifyCenter
                variant="borderRight"
                key={item.firstLine}
                flex={1}
                bgColor={focus.includes(item.firstLine) ? 'secondary' : 'white'}
                onPress={() => handlePress(item.firstLine)}
              >
                {item.icon ? item.icon : null}
                <Text spacing={item.icon ? { mt: 2 } : null} variant={focus.includes(item.firstLine) ? 'boldWhite' : 'boldSecondary'}>{item.firstLine}</Text>
                {item.secondLine && <Text variant={focus.includes(item.firstLine) ? 'boldWhite' : 'boldSecondary'}>{item.secondLine}</Text>}
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

FilterScreen.navigationOptions = () => ({
  title: 'Filter',
  headerStyle: {
    backgroundColor: 'transparent',
  },
});

export default FilterScreen;
