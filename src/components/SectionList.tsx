import React, { useMemo } from 'react';
import { StyleSheet, SectionList as RNSectionList, SectionListProps as RNSectionListProps } from 'react-native';

import { Lists } from '@src/styles';

type SectionListProps = RNSectionListProps<any> & {
  variant?: keyof typeof Lists;
};

const SectionList = ({ variant = 'primary', ...nativeProps }: SectionListProps) => {
  const styles = useMemo(() => StyleSheet.create({
    list: {
      ...Lists[variant],
    },
  }), [variant]);

  return (
    <RNSectionList
      style={styles.list}
      {...nativeProps}
    />
  );
};

export default SectionList;
