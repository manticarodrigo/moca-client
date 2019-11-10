/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React, { useState } from 'react';
import { TouchableHighlight } from 'react-native';

import { WINDOW_WIDTH } from '@src/utlities/constants';

import { Colors } from '@src/styles';

import { qualificationOptions } from '@src/screens/QualificationsScreen/QualificationsContent';

import {
  LowestPriceIcon,
  MostReviewedIcon,
  HighestRatedIcon,
  MaleIcon,
  FemaleIcon,
  BothGendersIcon,
  ArrowDown,
} from '@src/components/icons';

import KeyboardAwareScrollView from '@src/components/KeyboardAwareScrollView';
import View from '@src/components/View';
import Text from '@src/components/Text';
import Modal from '@src/components/Modal';
import FormField from '@src/components/FormField';
import { Checkbox } from '@src/components/Checkbox';

export const checkboxConfig = {
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
      fourtyfive: { title: '45 min' },
      sixty: { title: '60 min' },
    },
  },
  gender: {
    title: 'Gender',
    items: {
      male: { icon: MaleIcon, title: 'Male' },
      female: { icon: FemaleIcon, title: 'Female' },
      either: { icon: BothGendersIcon, title: 'Either' },
    },
  },
};

type CheckboxConfig = Readonly<typeof checkboxConfig>;

type SortByItems = keyof CheckboxConfig['sortBy']['items']
type SessionLengthItems = keyof CheckboxConfig['sessionLength']['items']
type GenderItems = keyof CheckboxConfig['gender']['items']


export type FilterState = {
  sortBy: { [key in SortByItems]?: boolean };
  sessionLength: { [key in SessionLengthItems]?: boolean };
  gender: { [key in GenderItems]?: boolean };
  maxPrice: string;
  ailments: string[];
}

const initialState = {
  sortBy: {},
  sessionLength: {},
  gender: {},
  maxPrice: '',
  ailments: [],
};

const SearchFilterModal = ({ isVisible, onClose }) => {
  const [filters, setFilters] = useState<FilterState>(initialState);

  const onPressCheckbox = (section: string, item: string, value: boolean) => {
    setFilters((prevState) => ({
      ...prevState, [section]: { ...prevState[section], [item]: value },
    }));
  };

  const onPressClear = () => setFilters(initialState);

  const onChangeMaxPrice = (maxPrice: string) => {
    setFilters((prevState) => ({ ...prevState, maxPrice }));
  };

  const onChangeAilment = (ailment: string, checked: boolean) => {
    let updated = [...filters.ailments];

    if (checked) {
      updated.push(ailment);
    } else {
      updated = updated.filter((v) => v !== ailment);
    }

    setFilters((prevState) => ({ ...prevState, ailments: updated }));
  };

  const onToggle = () => onClose(filters);

  return (
    <Modal
      hideToggle
      propagateSwipe
      isVisible={isVisible}
      onToggle={onToggle}
    >
      <View row justifyBetween alignCenter p={4} width={WINDOW_WIDTH} variant="borderBottom">
        <Text variant="semiBoldLarge" color="error" onPress={onPressClear}>Clear</Text>
        <Text variant="title">Filters</Text>
        <View onPress={onToggle}><ArrowDown large /></View>
      </View>
      <KeyboardAwareScrollView>
        <View safeArea mb={6} width="100%" bgColor="white">
          <>
            {Object.keys(checkboxConfig).map((sectionKey) => {
              const section = checkboxConfig[sectionKey];
              const sectionItems = Object.entries(section.items);

              return (
                <View key={sectionKey} variant="borderBottom" height={180}>
                  <Text m={3} variant="semiBoldLarge" color="grey">
                    {checkboxConfig[sectionKey].title}
                  </Text>
                  <View px={3} height={100} variant="shadow">
                    <View row flex={1} variant="roundedBorder">
                      {sectionItems.map(([itemKey, value], index) => {
                        // @ts-ignore
                        const { title = '', icon = () => null } = value;

                        const IconComponent = icon;

                        const focused = !!filters[sectionKey][itemKey];

                        const handlePress = () => onPressCheckbox(sectionKey, itemKey, !focused);

                        return (
                          <TouchableHighlight
                            key={title}
                            style={{ flex: 1 }}
                            underlayColor={Colors.secondaryLight}
                            onPress={handlePress}
                          >
                            <View
                              alignCenter
                              justifyCenter
                              flex={1}
                              p={3}
                              variant={index < sectionItems.length - 1 ? 'borderRight' : null}
                              bgColor={focused ? 'secondary' : 'white'}
                            >
                              <IconComponent focused={focused} />
                              <Text
                                mt={icon ? 2 : undefined}
                                variant="semiBoldLarge"
                                color={focused ? 'white' : 'secondary'}
                                align="center"
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
          </>
          <View variant="borderBottom" height={180}>
            <Text m={3} variant="semiBoldLarge" color="grey">Desired Cost</Text>
            <View px={3}>
              <FormField
                keyboardType="number-pad"
                icon="dollar"
                placeholder="Max Price"
                value={filters.maxPrice}
                onChangeText={onChangeMaxPrice}
              />
            </View>
          </View>
          <View variant="borderBottom">
            <Text m={3} variant="semiBoldLarge" color="grey">Area(s) of Pain</Text>
            <View row wrap alignStart px={4}>
              {qualificationOptions.map((item) => (
                <View key={item} row alignCenter py={3} width="50%">
                  <Checkbox
                    checked={filters.ailments.includes(item)}
                    onChange={(checked) => onChangeAilment(item, checked)}
                  />
                  <Text ml={2} variant="semiBoldLarge" size={1} color="semiGrey">
                    {item}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Modal>
  );
};


export default SearchFilterModal;
