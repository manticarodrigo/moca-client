import { SectionList as RNSectionList } from 'react-native';
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

type SectionListProps = FlexboxProps & SpaceProps & LayoutProps & ColorProps;

const SectionList = styled(RNSectionList)<SectionListProps>(
  flexbox,
  space,
  layout,
  color,
);

export default SectionList;
