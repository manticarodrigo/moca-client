import React, { ReactChild } from 'react';

import { View, SafeAreaView } from '@src/theme/components';

const variantProps = {
  bottomInput: {
    style: {
      borderTopWidth: 1,
      borderTopColor: '#ddd',
      height: 60,
    },
  },
};

const centerProps = {
  x: {
    justifyContent: 'center',
  },
  y: {
    alignItems: 'center',
  },
  xy: {
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const paddingProps = {
  true: {
    padding: 3,
  },
  px: {
    px: 3,
  },
  pl: {
    pl: 3,
  },
};

type FlexVariant = 'bottomInput'

type FlexDirection = 'row' | 'column';

type FlexCenter = keyof typeof centerProps;

type FlexPadding = keyof typeof paddingProps | boolean;

type FlexBg = 'white' | 'grey';

type FlexProps = {
  variant?: FlexVariant;
  flex?: boolean;
  safeArea?: boolean;
  direction?: FlexDirection;
  center?: FlexCenter;
  padding?: FlexPadding;
  bg?: FlexBg;
  children: ReactChild | ReactChild[];
};

const Flex = ({
  variant,
  flex,
  safeArea,
  direction = 'row',
  center,
  padding = false,
  bg = 'white',
  children,
}: FlexProps) => {
  const FlexView = safeArea ? SafeAreaView : View;

  return (
    <FlexView
      display="flex"
      flex={flex ? '1' : undefined}
      flexDirection={direction}
      backgroundColor={bg}
      {...variantProps[variant]}
      {...centerProps[center]}
      {...paddingProps[padding.toString()]}
    >
      {children}
    </FlexView>
  );
};

export default Flex;
