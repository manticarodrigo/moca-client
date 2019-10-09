import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import RNModal, { ModalProps } from 'react-native-modal';

import OpenIcon from '@src/components/icons/OpenIcon';

import { Colors } from '@src/styles';

import View from '@src/components/View';

type Props = ModalProps & {
  children: JSX.Element | JSX.Element[];
  marginTop?: number;
  bgColor?: keyof typeof Colors;
  onKnobPress: () => void;
};

const Modal = ({
  children,
  marginTop = 100,
  onKnobPress,
  bgColor = 'white',
  ...modalProps
}: Props) => {
  const styles = useMemo(() => StyleSheet.create({
    modal: { margin: 0, marginTop },
  }), [marginTop]);

  return (
    <RNModal
      {...modalProps}
      swipeDirection="down"
      backdropOpacity={0.8}
      animationInTiming={500}
      animationOutTiming={500}
      hideModalContentWhileAnimating
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={styles.modal}
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
};

export default Modal;
