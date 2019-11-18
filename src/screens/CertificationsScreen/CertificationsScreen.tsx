import React, { useState } from 'react';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import { Certification } from '@src/services/openapi';
import {
  addCertification,
  updateCertification,
  deleteCertification,
} from '@src/store/actions/UserAction';

import { WINDOW_WIDTH } from '@src/utlities/constants';

import useStore from '@src/hooks/useStore';

import InfoModal from '@src/modals/InfoModal';

import View from '@src/components/View';
import Toast from '@src/components/Toast';
import InfoList from '@src/components/InfoList';

type ToastState = {
  type: 'success' | 'error';
  message: string;
}

type ModalState = {
  visible?: boolean;
  certification?: Certification;
}

const CertificationsScreen: NavigationStackScreenComponent = () => {
  const { store, dispatch } = useStore();
  const [toastState, setToastState] = useState<ToastState>();
  const [modalState, setModalState] = useState<ModalState>({});

  const onPressItem = (certification: Certification) => (
    setModalState({ visible: true, certification })
  );

  const onPressDelete = async (id: Certification['id']) => {
    try {
      await dispatch(deleteCertification(id));
      setToastState({ type: 'success', message: 'Delete successful.' });
    } catch {
      setToastState({ type: 'error', message: 'Delete failed.' });
    }
  };

  const onPressAdd = () => setModalState({ visible: true });

  const onCloseModal = () => setModalState({});

  const onSubmit = async ({ id, title, description, images }) => {
    const imageUrls = images.map(({ image }) => image);

    try {
      if (id) {
        await dispatch(updateCertification(id, title, description, imageUrls));
      } else {
        await dispatch(addCertification(title, description, imageUrls));
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
        title="Certification"
        items={store.user.certifications}
        onPress={onPressItem}
        onAdd={onPressAdd}
        onDelete={onPressDelete}
      />

      {!!toastState && (
        <Toast error={toastState.type === 'error'} onClose={() => setToastState(undefined)}>
          {toastState.message}
        </Toast>
      )}

      <InfoModal
        visible={modalState.visible}
        item={modalState.certification}
        profile={store.user}
        singularTitle="Certification"
        onSubmit={onSubmit}
        onClose={onCloseModal}
      />
    </View>
  );
};

CertificationsScreen.navigationOptions = {
  title: 'My Certifications',
};

export default CertificationsScreen;
