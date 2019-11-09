import React from 'react';

import FormModal from './FormModal';

const InjuryModal = ({ visible, patient, onSubmit, onClose }) => {
  const { firstName, injury } = patient || {};
  const { title = '', description = '', images } = injury || {};

  return (
    <FormModal
      visible={visible}
      fieldConfig={{
        title: { value: title, placeholder: 'Title' },
        description: { multiline: true, value: description, placeholder: 'Description' },
      }}
      images={images}
      title={firstName ? `${firstName}'s Injury` : undefined}
      submitText="Save Injury"
      onSubmit={onSubmit}
      onClose={onClose}
    />
  );
};

export default InjuryModal;