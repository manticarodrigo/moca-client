import React, { useState, useEffect } from 'react';

import BackButton from '@src/components/BackButton';
import View from '@src/components/View';
import Button from '@src/components/Button';
import Text from '@src/components/Text';
import HeaderTitle from '@src/components/HeaderTitle';
import CheckBox from '@src/components/Checkbox';

import useStore from '@src/hooks/useStore';
import useNavigation from '@src/hooks/useNavigation';

import { updateUserInfomation } from '@src/store/actions/RegistrationAction';

import { Views, Spacing, Colors } from '@src/styles';

const QualifactionsScreen = () => {
  const navigation = useNavigation();
  const name = navigation.getParam('name', '');
  const [selectedCheckBoxItems, setSelectedCheckBoxItems] = useState([]);
  const [{ registrationState: { userInformation } }, dispatch] = useStore();
  const isPreviouslyChecked = Object.prototype.hasOwnProperty.call(userInformation, 'qualifications');


  const CheckBoxItems = [
    'Neck',
    'Shoulder',
    'Elbow',
    'Low Back',
    'Hip/Pelvis',
    'Knee',
    'Ankle/Foot',
    'Other',
  ];

  useEffect(() => {
    if (isPreviouslyChecked) setSelectedCheckBoxItems([...userInformation.qualifications]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCheckBoxClick = (value: string, checked: boolean) => {
    if (checked) {
      setSelectedCheckBoxItems([...selectedCheckBoxItems, value]);
    } else {
      const newState = [...selectedCheckBoxItems];
      newState.splice(newState.findIndex((x) => x === value), 1);
      setSelectedCheckBoxItems(newState);
    }
  };

  const handleButtonPress = () => {
    const qualifications = [...selectedCheckBoxItems];
    dispatch(updateUserInfomation({ qualifications }));
    navigation.navigate('AddressScreen');
  };

  return (
    <View safeArea flex={1} width="100%" spacing={{ mt: 3 }}>
      <View alignCenter>
        <View row>
          <Text variant="title" spacing={{ mt: 3 }}>Thanks for signing up, </Text>
          <Text variant="title" spacing={{ mt: 3 }}>{name}</Text>
        </View>
        <View alignCenter spacing={{ m: 4 }}>
          <Text variant="regular" spacing={{ mt: 1 }}>
            What are your preferred treatment
            areas and advanced certifications” should
            read “What are your preferred treatment areas?
          </Text>
        </View>
      </View>
      <View spacing={{ mt: 3, mx: 4 }} scroll>

        {CheckBoxItems.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <View key={index} row justifyBetween alignCenter variant="borderTop" spacing={{ mb: 3 }} width="100%">
            <Text variant="titleSmall" spacing={{ mb: 2, mt: 3 }}>{item}</Text>
            <CheckBox
              isChecked={selectedCheckBoxItems.includes(item)}
              value={item}
              width={30}
              height={30}
              handleCheckBoxClick={handleCheckBoxClick}
            />
          </View>
        ))}
      </View>
      <View spacing={{ mx: 3, mt: 3 }}>
        <Button
          variant={selectedCheckBoxItems.length === 0 ? 'primaryDisabled' : 'primary'}
          {...(selectedCheckBoxItems.length === 0 ? '' : { onPress: handleButtonPress })}
        >
          Continue
        </Button>
      </View>
    </View>
  );
};


QualifactionsScreen.navigationOptions = () => ({
  headerTitle: <HeaderTitle title="Qualifications" />,
  headerBackImage: BackButton,
  headerLeftContainerStyle: { ...Spacing.getStyles({ pt: 2, pl: 3 }) },
  headerStyle: {
    ...Views.borderBottom,
    backgroundColor: Colors.white,
    height: 80,
  },
});

export default QualifactionsScreen;
