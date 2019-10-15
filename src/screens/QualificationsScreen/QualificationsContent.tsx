import React from 'react';
import { NavigationStackProp } from 'react-navigation-stack';
import { TouchableWithoutFeedback, TouchableHighlight } from 'react-native';


import View from '@src/components/View';
import Button from '@src/components/Button';
import Text from '@src/components/Text';
import CheckBox from '@src/components/Checkbox';

import { updateUser } from '@src/store/actions/UserAction';

import useStore from '@src/hooks/useStore';


const qualificationOptions = [
  'Neck',
  'Shoulder',
  'Elbow',
  'Low Back',
  'Knee',
  'Ankle/Foot',
  'Other',
];

type Props = {
  navigation?: NavigationStackProp;
  modal?: boolean;
  closeInputModal?: () => void;
}

const QualificationsContent = (
  { navigation, modal, closeInputModal }: Props,
) => {
  const { store, dispatch } = useStore();
  const { firstName, preferredAilments } = store.user;
  const isButtonDisabled = preferredAilments.length <= 0;

  const handleCheckBoxClick = (checked: boolean, value: string) => {
    if (checked) {
      preferredAilments.push(value);
    } else {
      const index = preferredAilments.findIndex((item) => item === value);
      if (index) delete preferredAilments[index];
    }

    dispatch(updateUser({ preferredAilments }));
  };

  const handleButtonPress = () => {
    if (modal) {
      closeInputModal();
    } else { navigation.navigate('AddressScreen', { title: 'Address' }); }
  };

  return (
    <View scroll>
      <TouchableWithoutFeedback>
        <TouchableHighlight>
          <View flex={1}>
            <View safeArea spacing={{ pt: 3 }}>
              <View spacing={{ mx: 3 }}>
                {!modal
                  ? (
                    <View>
                      <View row wrap justifyCenter>
                        <Text variant="title" spacing={{ mt: 3 }}>Thanks for signing up,</Text>
                        <Text variant="title" spacing={{ mt: 3, ml: 1 }}>{firstName}</Text>
                      </View>
                      <View alignCenter spacing={{ mt: 4 }} wrap>
                        <Text variant="regular" typography={{ align: 'center' }}>
                            What are your preferred treatment
                            areas and advanced certifications” should
                            read “What are your preferred treatment areas?
                        </Text>
                      </View>
                    </View>
                  )
                  : null}
                <View spacing={{ mt: 3 }}>
                  {qualificationOptions.map((item, index) => (
                    <View
                      key={item}
                      row
                      justifyBetween
                      alignCenter
                      {...(modal && index === 0 ? '' : { variant: 'borderTop' })}
                      spacing={{ mb: 3 }}
                      width="100%"
                    >
                      <Text variant="titleSmall" spacing={{ mb: 2, mt: 3 }}>{item}</Text>
                      <CheckBox
                        value={item}
                        isChecked={preferredAilments.includes(item)}
                        onClick={handleCheckBoxClick}
                      />
                    </View>
                  ))}
                </View>
                <View row>
                  <View flex={1}>
                    <Button
                      variant={isButtonDisabled ? 'primaryDisabled' : 'primary'}
                      onPress={handleButtonPress}
                      disabled={isButtonDisabled}
                    >
                      {!modal ? 'Continue' : 'update' }
                    </Button>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </TouchableHighlight>
      </TouchableWithoutFeedback>
    </View>
  );
};


export default QualificationsContent;
