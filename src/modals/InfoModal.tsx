import React from 'react';

import FormModal from './FormModal';

const InfoModal = ({ visible, profile, item, singularTitle, onSubmit, onClose }) => {
  const { id, title = '', description = '', images } = item || {};
  const { firstName } = profile || {};

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
      title={firstName ? `${firstName}'s ${singularTitle}` : undefined}
      submitText={`Save ${singularTitle}`}
      onSubmit={handleSubmit}
      onClose={onClose}
    />
  );
};

export default InfoModal;
