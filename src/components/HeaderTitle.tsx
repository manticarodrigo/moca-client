import React from 'react';

import Text from '@src/components/Text';

const HeaderTitle = ({ title }) => (
  <Text variant="semiBold" size={2} ml={3}>
    {title}
  </Text>
);

export default HeaderTitle;
