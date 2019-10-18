import React from 'react';


import Modal from '@src/components/Modal';

import FilterScreen from '@src/screens/FilterScreen';

const FiltersModal = ({ isVisible, onToggle, onFilter }) => (
  <Modal isVisible={isVisible} onToggle={onToggle}>
    <FilterScreen getActiveFilters={onFilter} />
  </Modal>
);

export default FiltersModal;
