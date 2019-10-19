/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React, { useState } from 'react';
import { TouchableHighlight } from 'react-native';

import { Colors } from '@src/styles';

import {
  LowestPriceIcon,
  MostReviewedIcon,
  HighestRatedIcon,
  MaleIcon,
  FemaleIcon,
  BothGendersIcon,
} from '@src/components/icons';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Modal from '@src/components/Modal';

const filtersConfig = {
  sortBy: {
    title: 'Sort By',
    items: {
      lowestPrice: { icon: LowestPriceIcon, title: 'Lowest Price' },
      mostReviews: { icon: MostReviewedIcon, title: 'Most Reviews' },
      highestRated: { icon: HighestRatedIcon, title: 'Highest Rated' },
    },
  },
  sessionLength: {
    title: 'Session Length',
    items: {
      thirty: { title: '30 min' },
      fortyfive: { title: '45 min' },
      sixty: { title: '60 min' },
    },
  },
  desiredCost: {
    title: 'Desired Cost',
    items: {
      min: { title: 'Min' },
      max: { title: 'Max' },
    },
  },
  gender: {
    title: 'Gender',
    items: {
      male: { icon: MaleIcon, title: 'Female' },
      female: { icon: FemaleIcon, title: 'Male' },
      either: { icon: BothGendersIcon, title: 'Either' },
    },
  },
};

type FilterConfig = Readonly<typeof filtersConfig>;
type FilterSection = keyof FilterConfig;

type SortByItems = keyof FilterConfig['sortBy']['items']
type SessionLengthItems = keyof FilterConfig['sortBy']['items']
type DesiredCostItems = keyof FilterConfig['desiredCost']['items']
type GenderItems = keyof FilterConfig['gender']['items']

type FilterItems = SortByItems | SessionLengthItems | DesiredCostItems | GenderItems;

type FilterState = {
  sortBy: { [key in SortByItems]?: boolean };
  sessionLength: { [key in SortByItems]?: boolean };
  desiredCost: { [key in SortByItems]?: boolean };
  gender: { [key in GenderItems]?: boolean };
}

const SearchFilterModal = ({ isVisible, onToggle, onFilter }) => {
  const [filters, setFilters] = useState<FilterState>({
    sortBy: {},
    sessionLength: {},
    desiredCost: {},
    gender: {},
  });

  const onPress = (section: string, item: string, value: boolean) => {
    setFilters((prevState) => ({
      ...prevState, [section]: { ...prevState[section], [item]: value },
    }));
    // onFilter(newFocus);
  };

  return (
    <Modal propagateSwipe isVisible={isVisible} onToggle={onToggle}>
      <View scroll width="100%">
        {Object.keys(filtersConfig).map((sectionKey) => {
          const section = filtersConfig[sectionKey];
          const sectionItems = Object.entries(section.items);

          return (
            <View key={sectionKey} flex={1} bgColor="white" variant="borderBottom" height={180}>
              <Text variant="boldGrey" spacing={{ m: 3 }}>{filtersConfig[sectionKey].title}</Text>
              <View
                spacing={{ px: 3 }}
                height={100}
                variant="shadow"
              >
                <View row flex={1} variant="roundedBorder">
                  {sectionItems.map(([itemKey, value], index) => {
                    // @ts-ignore
                    const { title = '', icon = () => null } = value;

                    const IconComponent = icon;

                    const focused = !!filters[sectionKey][itemKey];

                    const handlePress = () => onPress(sectionKey, itemKey, !focused);

                    return (
                      <TouchableHighlight
                        key={title}
                        style={{ flex: 1 }}
                        underlayColor={Colors.secondaryLight}
                        onPress={handlePress}
                      >
                        <View
                          flex={1}
                          alignCenter
                          justifyCenter
                          variant={index < sectionItems.length - 1 ? 'borderRight' : null}
                          bgColor={focused ? 'secondary' : 'white'}
                        >
                          <IconComponent focused={focused} />
                          <Text
                            spacing={icon ? { mt: 2 } : null}
                            variant={focused ? 'boldWhite' : 'boldSecondary'}
                            numberOfLines={2}
                          >
                            {title}
                          </Text>
                        </View>
                      </TouchableHighlight>
                    );
                  })}
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </Modal>
  );
};


export default SearchFilterModal;
