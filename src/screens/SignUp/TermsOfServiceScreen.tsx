import React from 'react';

import View from '@src/components/View';
import BackDropView from '@src/components/BackdropView';
import Text from '@src/components/Text';

const TermsOfServiceScreen = () => (
  <BackDropView pt={1} hasArrow>
    <View safeArea expand width="100%" spacing={{ mt: 4 }}>
      <View variant="borderBottom" width="100%" height={54} alignCenter>
        <Text variant="title">Terms & Service</Text>
      </View>
      <View spacing={{ m: 4 }}>
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
  </BackDropView>
);

TermsOfServiceScreen.navigationOptions = {
  header: null,
};
export default TermsOfServiceScreen;
