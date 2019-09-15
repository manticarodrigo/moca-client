/* eslint-disable react/jsx-indent-props */
import React from 'react';
import Modal from 'react-native-modal';
import arrow from '@src/assets/pngs/arrow.png';

import View from './View';
import Image from './Image';

type BackdropProps = {
  children: JSX.Element | JSX.Element[];
  height?: number;
  hasArrow?: boolean;
  isVisible: boolean;
  onBackdropPress?: () => void;
  onSwipeComplete?: () => void;
  onModalHide?: () => void;
  handleArrowClick?: () => void;
  avoidKeyboard?: boolean;
};

const ModalView = ({
  children,
  height = 100,
  isVisible,
  onBackdropPress,
  onSwipeComplete,
  onModalHide,
  handleArrowClick,
}: BackdropProps) => (
    <Modal
      onModalHide={onModalHide}
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      onSwipeComplete={onSwipeComplete}
      swipeDirection="down"
      backdropOpacity={0.8}
      animationInTiming={500}
      animationOutTiming={500}
      hideModalContentWhileAnimating
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={{ margin: 0, marginTop: height }}
    >
      <View variant="modal" alignCenter>
        <View alignCenter bgColor="white" spacing={{ mt: 2 }} onPress={handleArrowClick}>
          <Image file={arrow} width={49} height={17} />
        </View>
        <View alignCenter flex={1} width="100%">
          {children}
        </View>
      </View>
    </Modal>
  );

export default ModalView;
