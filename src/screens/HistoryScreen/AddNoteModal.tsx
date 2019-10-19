import React, { useState } from 'react';

import useImageViewer from '@src/hooks/useImageViewer';
import { getImage } from '@src/utlities/imagePicker';

import ModalView from '@src/components/ModalView';
import View from '@src/components/View';
import Text from '@src/components/Text';
import FormField from '@src/components/FormField';
import Image from '@src/components/Image';

import { AddCardIcon } from '@src/components/icons';
import Button from '@src/components/Button';

const AddNoteModal = ({ handleArrowClick, modalVisibility }) => {
  const [subjective, setSubjective] = useState('');
  const [objective, setObjective] = useState('');
  const [treatment, setTreatment] = useState('');
  const [assessment, setAssessment] = useState('');
  const [diagnosis, setDiagnosis] = useState('');

  const [formFieldHeight, setFormFieldHeight] = useState(100);

  const [images, setImages] = useState([]);

  const { viewer, onPressImage } = useImageViewer(images);

  return (
    <ModalView
      isVisible={modalVisibility}
      handleArrowClick={handleArrowClick}
      onBackdropPress={handleArrowClick}
    >
      {/* Can't make the View Scrollable */}
      <View bgColor="lightGrey">
        <View variant="borderBottom" alignCenter row spacing={{ p: 5 }} bgColor="white">
          <Image rounded size={80} />
          <Text variant="titlePrimary" spacing={{ m: 4 }}>John Doe</Text>
        </View>
        <View alignCenter width="100%" spacing={{ px: 2, my: 3 }} bgColor="white">
          <FormField
            placeholder="Subjective"
            height={formFieldHeight}
            value={subjective}
            multiline
            spacing={{ m: 1, mt: 4 }}
            onChangeText={(text) => setSubjective(text)}
          // onContentSizeChange={(e) => setFormFieldHeight(e.nativeEvent.contentSize.height)}
          />
          <FormField
            placeholder="Objective"
            value={objective}
            multiline
            spacing={{ m: 1 }}
            onChangeText={(text) => setObjective(text)}
          />
          <FormField
            placeholder="Treatment"
            value={treatment}
            multiline
            spacing={{ m: 1 }}
            onChangeText={(text) => setTreatment(text)}
          />
          <FormField
            placeholder="Assessment"
            value={assessment}
            multiline
            spacing={{ m: 1 }}
            onChangeText={(text) => setAssessment(text)}
          />
          <FormField
            placeholder="Diagnosis"
            value={diagnosis}
            multiline
            spacing={{ m: 1 }}
            onChangeText={(text) => setDiagnosis(text)}
          />
          <View justifyCenter row spacing={{ m: 3 }} onPress={() => onPressImage('')}>
            <Text variant="titleSmallDark" spacing={{ mr: 3, mt: 2 }}>Add Pictures / Files</Text>
            <AddCardIcon />
          </View>
        </View>
        <Button spacing={{ m: 2 }}>Save</Button>
      </View>
      {viewer}
    </ModalView>
  );
};

export default AddNoteModal;
