import React, { useMemo } from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import RNModal, { ModalProps } from 'react-native-modal';

import OpenIcon from '@src/components/icons/OpenIcon';

import { Colors } from '@src/styles';

import View from '@src/components/View';

type Props = ModalProps & {
  children: JSX.Element | JSX.Element[];
  marginTop?: number;
  bgColor?: keyof typeof Colors;
  onToggle: () => void;
};

const Modal = ({
  children,
  marginTop = 100,
  bgColor = 'white',
  onToggle,
  ...modalProps
}: Props) => {
  const styles = useMemo(() => StyleSheet.create({
    modal: { margin: 0, marginTop },
  }), [marginTop]);

  return (
    <RNModal
      style={styles.modal}
      onBackdropPress={onToggle}
      onSwipeComplete={onToggle}
      swipeDirection="down"
      backdropOpacity={0.8}
      animationInTiming={500}
      animationOutTiming={500}
      hideModalContentWhileAnimating
      animationIn="slideInUp"
      animationOut="slideOutDown"
      {...modalProps}
    >
      <View variant="modal" alignCenter bgColor={bgColor}>
        <View alignCenter spacing={{ my: 3 }} onPress={onToggle}>
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
