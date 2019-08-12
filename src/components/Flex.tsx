import React, { ReactChild } from 'react';
import styled from 'styled-components/native';
import {
  flexbox,
  space,
  layout,
  color,
  FlexboxProps,
  SpaceProps,
  LayoutProps,
  ColorProps,
} from 'styled-system';

type FlexProps = FlexboxProps & SpaceProps & LayoutProps & ColorProps & {
  safeArea?: boolean;
  children: ReactChild | ReactChild[];
};

const FlexView = styled.View(
  flexbox,
  space,
  layout,
  color,
);

const FlexSafeAreaView = styled.SafeAreaView(
  flexbox,
  space,
  layout,
  color,
);

const baseProps = {
  flex: 1,
  display: 'flex',
};

const Flex = ({ safeArea, ...props }: FlexProps) => safeArea
  ? <FlexSafeAreaView {...baseProps} {...props} />
  : <FlexView {...baseProps} {...props} />;

export default Flex;
