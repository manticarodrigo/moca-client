import { SectionList as RNSectionList } from 'react-native';
import styled from 'styled-components/native';

import {
  compose,
  display,
  flexbox,
  space,
  border,
  layout,
  color,
  typography,
  shadow,
  DisplayProps,
  FlexboxProps,
  SpaceProps,
  BorderProps,
  LayoutProps,
  ColorProps,
  TypographyProps,
  ShadowProps,
} from 'styled-system';

type ComposedProps =
  & DisplayProps
  & FlexboxProps
  & SpaceProps
  & BorderProps
  & LayoutProps
  & ColorProps
  & ShadowProps;

const composed = compose(
  display,
  flexbox,
  space,
  border,
  layout,
  color,
  shadow,
);

export const View = styled.View<ComposedProps>(composed);

export const SafeAreaView = styled.SafeAreaView(composed);

export const SectionList = styled(RNSectionList)<ComposedProps>(composed);

export const TouchableHighlight = styled.TouchableHighlight<ComposedProps>(composed);

export const TextInput = styled.TextInput<ComposedProps>(composed);

export const Text = styled.Text<SpaceProps & ColorProps & TypographyProps>(
  space,
  color,
  typography,
);

export const Image = styled.Image<BorderProps & LayoutProps>(
  border,
  layout,
);
