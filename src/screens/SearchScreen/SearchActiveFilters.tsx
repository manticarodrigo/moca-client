import React, { useMemo } from 'react';

import { SmallCheckIcon, BigClockIcon, MaxPriceIcon } from '@src/components/icons';

import View from '@src/components/View';
import Text from '@src/components/Text';

import { checkboxConfig } from './SearchFilterModal';

const SearchActiveFilters = ({ filters }) => {
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
      <View scroll horizontal spacing={{ px: 4 }}>
        <View row alignCenter>
          {active.map(({ Icon, title }) => (
            <View alignCenter key={title} spacing={{ p: 3 }} width={90}>
              <Icon />
              <Text
                variant="boldSmallestPrimary"
                spacing={{ pt: 2 }}
                typography={{ align: 'center' }}
                numberOfLines={2}
              >
                {title}
              </Text>
            </View>
          ))}
        </View>
      </View>
      {ailments && !!ailments.length && (
        <View row variant="borderTop" spacing={{ py: 3, px: 4 }}>
          <Text variant="boldSmallestSecondaryLight">A. of Pain</Text>
          <View row wrap spacing={{ px: 4 }}>
            {ailments.map((item) => (
              <View key={item} row alignCenter spacing={{ pr: 2 }}>
                <SmallCheckIcon />
                <Text spacing={{ pl: 1 }} variant="regularSmallestPrimary">{item}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default SearchActiveFilters;
