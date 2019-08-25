import { ViewStyle } from 'react-native';
import { theme } from '@src/theme';

export const primary: ViewStyle = {
  borderRadius: theme.radii[2],
  backgroundColor: theme.colors.primary,
  padding: theme.space[3],
};

export const text: ViewStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: 80,
  backgroundColor: theme.colors.white,
};
