import React from 'react';
import Modal, { ModalProps } from 'react-native-modal';
import { KeyboardAvoidingView } from 'react-native';

import OpenIcon from '@src/icons/OpenIcon';

import { Colors } from '@src/styles';
import View from './View';

type BackdropProps = ModalProps & {
  children: JSX.Element | JSX.Element[];
  height?: number;
  isVisible: boolean;
  bgColor?: keyof typeof Colors;
  handleArrowClick: () => void;
};

const ModalView = ({
  children,
  height = 100,
  handleArrowClick,
  bgColor = 'white',
  ...modalProps
}: BackdropProps) => (
  <Modal
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
      <View alignCenter spacing={{ mt: 2 }} onPress={handleArrowClick}>
        <OpenIcon />
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={90}
      >
        <View alignCenter width="100%" justifyEnd safeArea>
          {children}
        </View>
      </KeyboardAvoidingView>
    </View>
  </Modal>
);

export default ModalView;
