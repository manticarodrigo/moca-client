import React, { useState } from 'react';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import { Injury } from '@src/services/openapi';
import { addInjury, updateInjury, deleteInjury } from '@src/store/actions/UserAction';

import { WINDOW_WIDTH } from '@src/utlities/constants';

import useStore from '@src/hooks/useStore';

import InjuryModal from '@src/modals/InjuryModal';

import View from '@src/components/View';
import Toast from '@src/components/Toast';
import InfoList from '@src/components/InfoList';

type ToastState = {
  type: 'success' | 'error';
  message: string;
}

type ModalState = {
  visible?: boolean;
  injury?: Injury;
}

const InjuriesScreen: NavigationStackScreenComponent = () => {
  const { store, dispatch } = useStore();
  const [toastState, setToastState] = useState<ToastState>();
  const [modalState, setModalState] = useState<ModalState>({});

  const onPressItem = (injury: Injury) => setModalState({ visible: true, injury });

  const onPressDelete = async (id: Injury['id']) => {
    try {
      await dispatch(deleteInjury(id));
      setToastState({ type: 'success', message: 'Delete successful.' });
    } catch {
      setToastState({ type: 'error', message: 'Delete failed.' });
    }
  };

  const onPressAdd = () => setModalState({ visible: true });

  const onCloseModal = () => setModalState({});

  const onSubmitInjury = async ({ id, title, description, images }) => {
    const imageUrls = images.map(({ image }) => image);

    try {
      if (id) {
        await dispatch(updateInjury(id, title, description, imageUrls));
      } else {
        await dispatch(addInjury(title, description, imageUrls));
      }
      setToastState({ type: 'success', message: `${id ? 'Update' : 'Submission'} succeeded.` });
    } catch {
      setToastState({ type: 'error', message: `${id ? 'Update' : 'Submission'} failed.` });
    } finally {
      // eslint-disable-next-line no-undef
      requestAnimationFrame(() => {
        setModalState({});
      });
    }
  };

  return (
    <View safeArea flex={1} width={WINDOW_WIDTH}>
      <InfoList
        title="Injury"
        items={store.user.injuries}
        onPress={onPressItem}
        onAdd={onPressAdd}
        onDelete={onPressDelete}
      />

      {!!toastState && (
        <Toast error={toastState.type === 'error'} onClose={() => setToastState(undefined)}>
          {toastState.message}
        </Toast>
      )}

      <InjuryModal
        visible={modalState.visible}
        injury={modalState.injury}
        patient={store.user}
        onSubmit={onSubmitInjury}
        onClose={onCloseModal}
      />
    </View>
  );
};

InjuriesScreen.navigationOptions = {
  title: 'My Injuries',
};

export default InjuriesScreen;
