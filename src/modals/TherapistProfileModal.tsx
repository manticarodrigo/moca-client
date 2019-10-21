import React, { useState, useEffect } from 'react';

import api from '@src/services/api';

import useStore from '@src/hooks/useStore';

import Modal from '@src/components/Modal';
import View from '@src/components/View';
import Image from '@src/components/Image';
import Text from '@src/components/Text';
import Button from '@src/components/Button';

import { StarsIcon, BookmarkIcon } from '@src/components/icons';

import { mockImg } from '@src/services/mock';

import TherapistProfile from '@src/screens/ProfileScreen/TherapistProfile';


const TherapistProfileModal = ({ therapistId, visible, onPressMessage, onClose }) => {
  const { store } = useStore();
  const [therapist, setTherapist] = useState();

  useEffect(() => {
    if (!therapistId) return;

    const fetchTherapist = async () => {
      const options = { headers: { Authorization: `Token ${store.user.token}` } };
      const { data } = await api.user.userTherapistRead_9(therapistId, options);

      setTherapist(data);
    };

    fetchTherapist();
  }, [therapistId]);

  const handlePressMessage = () => onPressMessage(therapist);

  return (
    <Modal
      propagateSwipe
      isVisible={visible}
      onToggle={onClose}
    >
      <View bgColor="lightGrey">
        <View bgColor="white">
          <View alignEnd spacing={{ mr: 3 }}>
            <BookmarkIcon />
          </View>
          {therapist && (
            <>
              <View row spacing={{ p: 4 }} bgColor="white" variant="borderBottom">
                <Image rounded size={80} uri={mockImg} />
                <View column justifyCenter spacing={{ px: 3 }}>
                  <Text variant="title">
                    {therapist.firstName}
                    {' '}
                    {therapist.lastName}
                  </Text>
                  <View row alignCenter>
                    <Text
                      spacing={{ mr: 2 }}
                      variant="lightTextCenter"
                    >
                      {therapist.rating}
                    </Text>
                    <StarsIcon number={therapist.rating} />
                  </View>
                </View>
              </View>
              <View flex={3} bgColor="white">
                <TherapistProfile therapist={therapist} modal />
              </View>
              <View flex={1} variant="borderTop" spacing={{ p: 4 }}>
                <Button onPress={handlePressMessage}>
                    Message / Schedule
                </Button>
              </View>
            </>
          )}
        </View>
      </View>

    </Modal>
  );
};

export default TherapistProfileModal;
