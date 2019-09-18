import React from 'react';
import Modal, { ModalProps } from 'react-native-modal';
import OpenIcon from '@src/components/icons/OpenIcon';

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
      <View alignCenter flex={1} width="100%">
        {children}
      </View>
    </View>
  </Modal>
);

export default ModalView;
