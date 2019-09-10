import React, { useMemo } from 'react';

import { StyleSheet, Image } from 'react-native';

import { widthPercentageToDP, heightPercentageToDP } from '@src/utlities/deviceSize';

import PriceRateIcon from '@src/assets/Icons/priceRate.png';

import Text from './Text';
import View from './View';

type PriceTableProps = {
  thirtyMinsRate: string;
  fourtyFiveMinsRate: string;
  sixtyMinsRate: string;
  firstEvaluationRate: string;
}


const PriceTable = ({
  thirtyMinsRate,
  fourtyFiveMinsRate,
  sixtyMinsRate,
  firstEvaluationRate,
}: PriceTableProps) => {
  const styles = useMemo(() => StyleSheet.create({
  }), []);


  return (
    <View
      column
      spacing={{ m: 3, p: 3 }}
      height={heightPercentageToDP(25)}
      width="100%"
      bgColor="white"
    >
      <View row position={{ pl: 0 }}>
        <Image source={PriceRateIcon} />
        <Text
          spacing={{ ml: 3 }}
          typography={{
            color: 'dark',
            size: 2,
            weight: '700',
          }}
        >
          Price Rate
        </Text>
      </View>
      <View column position={{ pl: 1 }} spacing={{ mt: 3 }}>
        <View row variant="borderBottom" spacing={{ pb: 3 }}>
          <View variant="borderRight" spacing={{ pr: 4 }}>
            <Text
              spacing={{ mb: 2 }}
              typography={{
                color: 'semiGrey',
                size: 2,
                weight: '500',
                align: 'right',
              }}
            >
              30 min
            </Text>
            <Text
              typography={{
                color: 'secondary',
                size: 5,
                weight: '700',
              }}
            >
              {thirtyMinsRate}
            </Text>
          </View>
          <View variant="borderRight" spacing={{ px: 5 }}>
            <Text
              spacing={{ mb: 2 }}
              typography={{
                color: 'semiGrey',
                size: 2,
                weight: '500',
                align: 'right',
              }}
            >
              45 min
            </Text>
            <Text
              typography={{
                color: 'secondary',
                size: 5,
                weight: '700',
              }}
            >
              {fourtyFiveMinsRate}
            </Text>
          </View>
          <View spacing={{ px: 5 }}>
            <Text
              spacing={{ mb: 2 }}
              typography={{
                color: 'semiGrey',
                size: 2,
                weight: '500',
                align: 'right',
              }}
            >
              60 min
            </Text>
            <Text
              typography={{
                color: 'secondary',
                size: 5,
                weight: '700',
              }}
            >
              {sixtyMinsRate}
            </Text>
          </View>
        </View>
        <View row position={{ pl: 0 }} spacing={{ mt: 2 }}>
          <Text
            spacing={{ pt: 3 }}
            typography={{
              color: 'semiGrey',
              size: 2,
              weight: '500',
            }}
          >
            First time evaluation price
          </Text>
          <Text
            spacing={{ ml: 6 }}
            typography={{
              color: 'secondary',
              size: 5,
              weight: '700',
            }}
          >
            {firstEvaluationRate}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PriceTable;
