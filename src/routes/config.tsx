import { StackNavigationOptions } from '@react-navigation/stack';

import { Spacing, Colors, Views, Texts } from '@src/styles';

import BackButton from '@src/components/BackButton';

const baseScreenOptions: StackNavigationOptions = {
  headerBackTitleVisible: false,
  headerBackImage: BackButton,
  headerStyle: {
    height: 100,
  },
  headerLeftContainerStyle: {
    ...Spacing.getStyles({ pl: 4 }),
  },
  headerRightContainerStyle: {
    ...Spacing.getStyles({ pr: 4 }),
  },
};

const primaryScreenOptions: StackNavigationOptions = {
  ...baseScreenOptions,
  headerStyle: {
    ...baseScreenOptions.headerStyle as {},
    borderBottomWidth: 0,
    backgroundColor: Colors.primary,
  },
  headerTitleStyle: {
    ...Texts.titleSmallWhite,
  },
};

const secondaryScreenOptions: StackNavigationOptions = {
  ...baseScreenOptions,
  headerStyle: {
    ...baseScreenOptions.headerStyle as {},
    ...Views.borderBottom,
    backgroundColor: Colors.white,
  },
  headerTitleStyle: {
    ...Texts.titleSmall,
  },
};

export { primaryScreenOptions, secondaryScreenOptions };
