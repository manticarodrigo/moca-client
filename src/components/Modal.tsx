import React, { useMemo } from 'react';
import { StyleSheet, KeyboardAvoidingView as RNKeyboardAvoidingView } from 'react-native';
import RNModal, { ModalProps } from 'react-native-modal';

import OpenIcon from '@src/components/icons/OpenIcon';

import { Colors } from '@src/styles';

import View from '@src/components/View';

const KeyboardAvoidingView = ({ children }) => (
  <RNKeyboardAvoidingView
    style={{ flex: 1 }}
    behavior="padding"
    keyboardVerticalOffset={90}
  >
    {children}
  </RNKeyboardAvoidingView>
);

type Props = ModalProps & {
  children: JSX.Element | JSX.Element[];
  marginTop?: number;
  avoidKeyboard?: boolean;
  bgColor?: keyof typeof Colors;
  onToggle: () => void;
};

const Modal = ({
  children,
  marginTop = 100,
  avoidKeyboard,
  bgColor = 'white',
  onToggle,
  ...modalProps
}: Props) => {
  const styles = useMemo(() => StyleSheet.create({
    modal: { margin: 0, marginTop },
  }), [marginTop]);

  const ChildrenWrapper = useMemo(
    () => avoidKeyboard
      ? KeyboardAvoidingView
      : React.Fragment,
    [avoidKeyboard],
  );

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
        <ChildrenWrapper>
          {children}
        </ChildrenWrapper>
      </View>
    </RNModal>
  );
};

export default Modal;
