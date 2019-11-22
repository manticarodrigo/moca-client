import React from 'react';

import FormModal from './FormModal';

const MessageFormModal = ({ visible, onSubmit, onClose }) => (
  <FormModal
    visible={visible}
    initialState={{ title: '', text: '' }}
    config={{ text: { required: true } }}
    props={{
      title: { placeholder: 'Title' },
      text: { multiline: true, placeholder: 'Text' },
    }}
    images={[]}
    title="Multimedia message"
    submitText="Submit message"
    onSubmit={onSubmit}
    onClose={onClose}
  />
);

export default MessageFormModal;
