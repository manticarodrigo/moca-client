import React from 'react';

import View from './View';
import BackDrop from './BackDrop';

View.defaultProps = {
  position: 'absolute',
  width: '100%',
  top: '30%',
  borderRadius: 16,
  height: '100%',
  bg: 'white',
  p: 3,
};

const SlideUp = ({ children, top }) => {

  const handleBackDropPress = () => console.log('Clicked');

  return (
    <React.Fragment>
      <BackDrop pressed={handleBackDropPress} />
      <View top={top}>
        {children}
      </View>
    </React.Fragment >
  );
};

export default SlideUp;
