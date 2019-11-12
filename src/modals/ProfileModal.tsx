import React, { useState, useEffect } from 'react';

import api from '@src/services/api';

import { WINDOW_WIDTH } from '@src/utlities/constants';

import useStore from '@src/hooks/useStore';

import { BookmarkIcon } from '@src/components/icons';

import Modal from '@src/components/Modal';
import View from '@src/components/View';
import Image from '@src/components/Image';
import Text from '@src/components/Text';
import Button from '@src/components/Button';
import Rating from '@src/components/Rating';

import ProfileList from '@src/screens/ProfileScreen/ProfileList';

const ProfileModal = ({ userId, visible, onMessage, onClose }) => {
  const { store } = useStore();
  const [profile, setProfile] = useState();

  const isTherapist = store.user.type === 'PT';

  useEffect(() => {
    if (!userId) return;

    const fetchProfile = async () => {
      const method = isTherapist ? api.user.userPatientRead : api.user.userTherapistRead_24;

      const { data } = await method(userId);

      setProfile(data);
    };

    fetchProfile();
  }, [userId]);

  const handlePressMessage = () => onMessage(profile);

  const buttonText = isTherapist ? 'Send Message' : 'Message / Schedule';

  return (
    <Modal
      propagateSwipe
      isVisible={visible}
      onToggle={onClose}
    >
      <View bgColor="lightGrey">
        <View bgColor="white">
          {/* <View alignEnd mr={3}>
            <BookmarkIcon />
          </View> */}
          {profile && (
            <>
              <View row p={4} bgColor="white" variant="borderBottom">
                <Image rounded size={80} uri={profile.image} />
                <View column justifyCenter px={3}>
                  <Text variant="title">
                    {`${profile.firstName} ${profile.lastName}`}
                  </Text>
                  {!isTherapist && (
                    <View row alignCenter>
                      <Rating rating={profile.rating} />
                    </View>
                  )}
                </View>
              </View>
              <View width={WINDOW_WIDTH} flex={3} bgColor="white">
                <ProfileList readonly user={profile} />
              </View>
              <View flex={1} p={4} variant="borderTop">
                <Button onPress={handlePressMessage}>
                  {buttonText}
                </Button>
              </View>
            </>
          )}
        </View>
      </View>

    </Modal>
  );
};

export default ProfileModal;
