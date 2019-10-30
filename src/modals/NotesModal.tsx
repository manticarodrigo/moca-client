import React, { useState } from 'react';
import { ScrollView } from 'react-native';

import { Appointment } from '@src/store/reducers/AppointmentReducer';

import useFormFields from '@src/hooks/useFormFields';

import { WINDOW_WIDTH } from '@src/utlities/constants';

import Modal from '@src/components/Modal';
import View from '@src/components/View';
import Text from '@src/components/Text';
import FormField from '@src/components/FormField';
import Image from '@src/components/Image';
import Button from '@src/components/Button';
import ImageSelector from '@src/components/ImageSelector';

const NotesModal = ({ visible, onClose }) => {
  const [images, setImages] = useState([]);

  const {
    getFieldProps,
  } = useFormFields<Appointment['note']>({
    subjective: '',
    objective: '',
    treatment: '',
    assessment: '',
    diagnosis: '',
  });

  const onPressSubmit = () => null;

  return (
    <Modal propagateSwipe isVisible={visible} onToggle={onClose}>

      <View alignCenter spacing={{ pb: 6 }}>

        <View row>
          <View flex={1} row alignCenter spacing={{ p: 4 }} variant="borderBottom">
            <Image rounded size={70} />
            <Text variant="titlePrimary" spacing={{ m: 4 }}>John Doe</Text>
          </View>
        </View>

        <View flex={1} bgColor="lightGrey">
          <ScrollView contentContainerStyle={{ width: WINDOW_WIDTH }}>
            <View width="100%" spacing={{ p: 4, my: 3 }} bgColor="white">
              <FormField
                multiline
                placeholder="Subjective"
                {...getFieldProps('subjective')}
              />
              <FormField
                multiline
                placeholder="Objective"
                {...getFieldProps('objective')}
              />
              <FormField
                multiline
                placeholder="Treatment"
                {...getFieldProps('treatment')}
              />
              <FormField
                multiline
                placeholder="Assessment"
                {...getFieldProps('assessment')}
              />
              <FormField
                multiline
                placeholder="Diagnosis"
                {...getFieldProps('diagnosis')}
              />
              <View row spacing={{ pt: 5, px: 3, pb: 2 }}>
                <ImageSelector
                  label="Add Images"
                  images={images}
                  setImages={setImages}
                />
              </View>
            </View>
          </ScrollView>
        </View>

        <View width={WINDOW_WIDTH} spacing={{ p: 4 }} variant="borderTop">
          <Button variant="primary" onPress={onPressSubmit}>
            Save Notes
          </Button>
        </View>

      </View>

    </Modal>
  );
};

export default NotesModal;
