import styled from 'styled-components/native';
import {
  compose,
  flexbox,
  border,
  space,
  layout,
  color,
  shadow,
  position,
  FlexboxProps,
  BorderProps,
  SpaceProps,
  LayoutProps,
  ColorProps,
  ShadowProps,
  PositionProps,
} from 'styled-system';

export type ViewProps =
  & FlexboxProps
  & BorderProps
  & SpaceProps
  & LayoutProps
  & ColorProps
  & ShadowProps
  & PositionProps;

const View = styled.View<ViewProps>(
  compose(
    flexbox,
    border,
    space,
    layout,
    color,
    shadow,
    position,
  ),
);

export default View;
