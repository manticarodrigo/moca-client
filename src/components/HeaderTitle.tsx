import React from 'react';

import Text from '@src/components/Text';

const HeaderTitle = ({ title }) => (
  <Text spacing={{ ml: 3 }} typography={{ size: 3, weight: '700', color: 'primary' }}>
    {title}
  </Text>
);

export default HeaderTitle;
