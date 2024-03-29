import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import RNModal, { ModalProps } from 'react-native-modal';

import OpenIcon from '@src/components/icons/OpenIcon';

import { Colors } from '@src/styles';

import View from '@src/components/View';

type Props = ModalProps & {
  hideToggle?: boolean;
  marginTop?: number;
  bgColor?: keyof typeof Colors;
  onToggle: () => void;
  children: JSX.Element | JSX.Element[];
};

const Modal = ({
  hideToggle,
  marginTop = 100,
  bgColor = 'white',
  onToggle,
  children,
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
        {!hideToggle && (
          <View alignCenter py={3} onPress={onToggle}>
            <OpenIcon />
          </View>
        )}
        <>
          {children}
        </>
      </View>
    </RNModal>
  );
};

export default React.memo(Modal);
