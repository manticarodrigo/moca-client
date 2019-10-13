import React from 'react';
import { NavigationStackProp } from 'react-navigation-stack';
import { TouchableWithoutFeedback, TouchableHighlight } from 'react-native';


import View from '@src/components/View';
import Button from '@src/components/Button';
import Text from '@src/components/Text';
import CheckBox from '@src/components/Checkbox';

import { updateUserInfomation } from '@src/store/actions/RegistrationAction';
import { updateUser } from '@src/store/actions/UserAction';

import useStore from '@src/hooks/useStore';


type QualificationsContentProps = {
  navigation?: NavigationStackProp;
  modal?: boolean;
  closeInputModal?: () => void;
}

const QualificationsContent = (
  { navigation, modal, closeInputModal }: QualificationsContentProps,
) => {
  const { store, dispatch } = useStore();
  const { qualifications } = !modal ? store.registrationState : store.user;
  const { name } = store.registrationState;
  const isButtonDisabled = !(qualifications.filter((x) => x.value === true).length > 0);

  const handleCheckBoxClick = (checked: boolean, index: number) => {
    const newState = qualifications.map((x) => ({ ...x }));
    newState[index].value = checked;
    if (modal) {
      dispatch(updateUser({ qualifications: newState }));
    } else {
      dispatch(updateUserInfomation({ qualifications: newState }));
    }
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
                        <Text variant="title" spacing={{ mt: 3, ml: 1 }}>{name}</Text>
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
                  {qualifications.map((item, index) => (
                    <View
              // eslint-disable-next-line react/no-array-index-key
                      key={index}
                      row
                      justifyBetween
                      alignCenter
                      {...(modal && index === 0 ? '' : { variant: 'borderTop' })}
                      spacing={{ mb: 3 }}
                      width="100%"
                    >
                      <Text variant="titleSmall" spacing={{ mb: 2, mt: 3 }}>{item.name}</Text>
                      <CheckBox
                        isChecked={item.value}
                        index={index}
                        handleCheckBoxClick={handleCheckBoxClick}
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
