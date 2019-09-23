import React, { useState, useEffect } from 'react';

import View from '@src/components/View';
import Text from '@src/components/Text';

import {
  LowestPriceIcon,
  MorningIcon,
  AfternoonIcon,
  EveningIcon,
  MostReviewedIcon,
  HighestRatedIcon,
  MaleIcon,
  FemaleIcon,
  BothGendersIcon,
} from '@src/icons';

import { ScreenProps } from '@src/stacks/DashboardStack';

type Props = ScreenProps<'filterScreen'>;

const FilterScreen = ({ navigation }: Props) => {
  const [focus, setfocus] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      title: 'Filters',
    });
  }, [navigation]);

  const filterItems = {
    sortBy: {
      title: 'Sort By',
      items: [
        {
          icon: <LowestPriceIcon focused={!!focus.includes('Lowest')} />,
          firstLine: 'Lowest',
          secondLine: 'Price',
        },
        {
          icon: <MostReviewedIcon focused={!!focus.includes('Most')} />,
          firstLine: 'Most',
          secondLine: 'Reviews',
        },
        {
          icon: <HighestRatedIcon focused={!!focus.includes('Highest')} />,
          firstLine: 'Highest',
          secondLine: 'Rated',
        },
      ],
    },
    desiredTime: {
      title: 'Desired Time',
      items: [
        {
          icon: <MorningIcon focused={!!focus.includes('Morning')} />,
          firstLine: 'Morning',
        },
        {
          icon: <AfternoonIcon focused={!!focus.includes('Afternoon')} />,
          firstLine: 'Afternoon',
        },
        {
          icon: <EveningIcon focused={!!focus.includes('Evening')} />,
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
          icon: <MaleIcon focused={!!focus.includes('Female')} />,
          firstLine: 'Female',
        },
        {
          icon: <FemaleIcon focused={!!focus.includes('Male')} />,
          firstLine: 'Male',
        },
        {
          icon: <BothGendersIcon focused={!!focus.includes('Either')} />,
          firstLine: 'Either',
        },
      ],
    },
  };

  const handlePress = (key) => {
    const newFocus = [...focus];
    const index = focus.indexOf(key);
    if (index !== -1) {
      newFocus.splice(index, 1);
    } else {
      newFocus.push(key);
      // newFocus.push(key);
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

export default FilterScreen;
