import React from 'react';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import View from '@src/components/View';
import Button from '@src/components/Button';
import Text from '@src/components/Text';
import CheckBox from '@src/components/Checkbox';

import useStore from '@src/hooks/useStore';

import { updateUserInfomation } from '@src/store/actions/RegistrationAction';

const QualifiactionsScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const { store, dispatch } = useStore();
  const { name, qualifications } = store.registrationState;
  const isButtonDisabled = !(qualifications.filter((x) => x.value === true).length > 0);


  const handleCheckBoxClick = (checked: boolean, index: number) => {
    const newState = qualifications.map((x) => ({ ...x }));
    newState[index].value = checked;
    dispatch(updateUserInfomation({ qualifications: newState }));
  };

  const handleButtonPress = () => {
    navigation.navigate('AddressScreen', { title: 'Address' });
  };

  return (
    <View safeArea spacing={{ pt: 3 }}>
      <View spacing={{ mx: 3 }}>
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
        <View spacing={{ mt: 3 }} scroll>
          {qualifications.map((item, index) => (
            <View
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              row
              justifyBetween
              alignCenter
              variant="borderTop"
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
              Continue
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

QualifiactionsScreen.navigationOptions = {
  title: 'Qualifications',
};

export default QualifiactionsScreen;