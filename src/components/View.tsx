import styled from 'styled-components/native';
import {
  compose,
  flexbox,
  border,
  space,
  layout,
  color,
  shadow,
  FlexboxProps,
  BorderProps,
  SpaceProps,
  LayoutProps,
  ColorProps,
  ShadowProps,
} from 'styled-system';

export type ViewProps =
  & FlexboxProps
  & BorderProps
  & SpaceProps
  & LayoutProps
  & ColorProps
  & ShadowProps;

const View = styled.View<ViewProps>(
  compose(
    flexbox,
    border,
    space,
    layout,
    color,
    shadow,
  ),
);

export default View;
