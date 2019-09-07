import React, { useMemo } from 'react';

import { StyleSheet } from 'react-native';

import { widthPercentageToDP, heightPercentageToDP } from '@src/utlities/deviceSize';

import { PriceRateIcon } from '@src/components/icons';

import Text from './Text';
import View from './View';

type PriceTableProps = {
  thirtyMinsRate: string;
  FourtyFiveMinsRate: string;
  SixtyMinsRate: string;
  FirstEvaluationRate: string;
}


const PriceTable = ({
  thirtyMinsRate,
  FourtyFiveMinsRate,
  SixtyMinsRate,
  FirstEvaluationRate,
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
        <PriceRateIcon />
        <Text
          spacing={{ m: 1 }}
          typography={{
            color: 'black',
            size: 2,
            weight: '300',
          }}
        >
          Price Rate
        </Text>
      </View>
      <View column position={{ pl: 1 }}>
        <View row>
          <View spacing={{ pr: 4 }}>
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
          <View spacing={{ px: 4 }}>
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
              {FourtyFiveMinsRate}
            </Text>
          </View>
          <View spacing={{ px: 4 }}>
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
              {SixtyMinsRate}
            </Text>
          </View>
        </View>
        <View row position={{ pl: 0 }}>
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
            spacing={{ ml: 5 }}
            typography={{
              color: 'secondary',
              size: 5,
              weight: '700',
            }}
          >
            {FirstEvaluationRate}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PriceTable;
