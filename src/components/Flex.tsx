import React, { ReactChild } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import {
  compose,
  flexbox,
  space,
  border,
  layout,
  color,
  FlexboxProps,
  SpaceProps,
  BorderProps,
  LayoutProps,
  ColorProps,
} from 'styled-system';

type FlexProps = FlexboxProps & SpaceProps & BorderProps & LayoutProps & ColorProps & {
  style?: StyleProp<ViewStyle>;
  safeArea?: boolean;
  children: ReactChild | ReactChild[];
};

const composed = compose(
  flexbox,
  space,
  border,
  layout,
  color,
);

const FlexView = styled.View(composed);

const FlexSafeAreaView = styled.SafeAreaView(composed);

const baseProps = {
  display: 'flex',
};

const Flex = ({ safeArea, ...props }: FlexProps) => safeArea
  ? <FlexSafeAreaView {...baseProps} {...props} />
  : <FlexView {...baseProps} {...props} />;

export default Flex;
