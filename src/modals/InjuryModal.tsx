import React from 'react';

import FormModal from './FormModal';

const InjuryModal = ({ visible, injury, patient, onSubmit, onClose }) => {
  const { id, title = '', description = '', images } = injury || {};
  const { firstName } = patient || {};

  const handleSubmit = (fields) => onSubmit({ id, ...fields });

  return (
    <FormModal
      visible={visible}
      initialState={{ title, description }}
      config={{ title: { required: true }, description: { required: true } }}
      props={{
        title: { placeholder: 'Title' },
        description: { multiline: true, placeholder: 'Description' },
      }}
      images={images}
      title={firstName ? `${firstName}'s Injury` : undefined}
      submitText="Save Injury"
      onSubmit={handleSubmit}
      onClose={onClose}
    />
  );
};

export default InjuryModal;
