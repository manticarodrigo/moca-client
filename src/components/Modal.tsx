import React from 'react';
import RNModal, { ModalProps as RNModalProps } from 'react-native-modal';

import OpenIcon from '@src/components/icons/OpenIcon';

import { Colors } from '@src/styles';
import View from './View';

type ModalProps = RNModalProps & {
  children: JSX.Element | JSX.Element[];
  height?: number;
  bgColor?: keyof typeof Colors;
  onKnobPress: () => void;
};

const ModalView = ({
  children,
  height = 100,
  onKnobPress,
  bgColor = 'white',
  ...modalProps
}: ModalProps) => (
  <RNModal
    {...modalProps}
    swipeDirection="down"
    backdropOpacity={0.8}
    animationInTiming={500}
    animationOutTiming={500}
    hideModalContentWhileAnimating
    animationIn="slideInUp"
    animationOut="slideOutDown"
    style={{ margin: 0, marginTop: height }}
  >
    <View variant="modal" alignCenter bgColor={bgColor}>
      <View alignCenter spacing={{ my: 3 }} onPress={onKnobPress}>
        <OpenIcon />
      </View>
      <>
        {children}
      </>
    </View>
  </RNModal>
);

export default ModalView;
