import React from 'react';

import View from '@src/components/View';
import Text from '@src/components/Text';

const TermsOfServiceScreen = () => (
  <View safeArea>
    <View row>
      <View variant="borderBottom" flex={1} height={48} alignCenter justifyCenter>
        <Text variant="titleSmall">Terms & Service</Text>
      </View>
    </View>
    <View flex={1} spacing={{ m: 3 }}>
      <Text variant="regular">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tempor
        dapibus nunc sed fringilla. Nulla facilisi.
        Cras nec enim mauris. Phasellus dolor nisi,
        rhoncus non dui quis, auctor rhoncus quam.
        In quis pretium est. Proin a tristique ex. Aenean metus eros,
        sollicitudin sit amet tortor id, malesuada vehicula mauris.
        Cras gravida mauris eu ex dapibus, non imperdiet
        mauris cursus. Nulla placerat mauris vel faucibus elementum.
        Ut convallis dolor quam, ut dictum turpis semper vitae.
      </Text>
    </View>
  </View>
);

TermsOfServiceScreen.navigationOptions = {
  header: null,
};
export default TermsOfServiceScreen;
