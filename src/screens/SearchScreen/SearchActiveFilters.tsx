import React, { useMemo } from 'react';

import { SmallCheckIcon, BigClockIcon, MaxPriceIcon } from '@src/components/icons';

import View from '@src/components/View';
import Text from '@src/components/Text';

import { checkboxConfig } from './SearchFilterModal';

const SearchActiveFilters = ({ filters, onPress }) => {
  const { maxPrice, ailments = [], ...rest } = filters;

  const active = useMemo(() => {
    const updated = [];

    Object.entries(rest).map(
      ([sectionKey, items]) => Object.entries(items).map(
        ([itemKey, value]) => {
          const { icon, title } = checkboxConfig[sectionKey].items[itemKey];
          const Icon = icon || BigClockIcon;

          if (value) {
            updated.push({ Icon, title });
          }

          return null;
        },
      ),
    );

    if (maxPrice) {
      updated.push({ Icon: MaxPriceIcon, title: `$${maxPrice}` });
    }

    return updated;
  }, [rest, maxPrice]);

  return (
    <View variant="shadow" bgColor="white">
      <View scroll horizontal>
        <View row alignCenter onPress={onPress}>
          {active.map(({ Icon, title }) => (
            <View alignCenter key={title} py={3} px={2} width={100}>
              <Icon />
              <Text
                variant="semiBoldLarge"
                size={0}
                align="center"
                pt={2}
                numberOfLines={2}
              >
                {title}
              </Text>
            </View>
          ))}
        </View>
      </View>
      {ailments && !!ailments.length && (
        <View row py={3} px={4} variant="borderTop" onPress={onPress}>
          <Text variant="semiBoldLarge" size={0} color="secondaryLight">A. of Pain</Text>
          <View row wrap px={4}>
            {ailments.map((item) => (
              <View key={item} row alignCenter pr={2}>
                <SmallCheckIcon />
                <Text pl={1} variant="regular" size={0} color="primary">{item}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default SearchActiveFilters;
