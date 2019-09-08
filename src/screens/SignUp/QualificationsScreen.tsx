import React from 'react';

import BackButton from '@src/components/BackButton';
import View from '@src/components/View';
import Button from '@src/components/Button';
import Text from '@src/components/Text';
import HeaderTitle from '@src/components/HeaderTitle';
import CheckBox from '@src/components/Checkbox';

import SelectedItemsArray from '@src/components/SelecteditemsArray';

import useStore from '@src/hooks/useStore';
import useNavigation from '@src/hooks/useNavigation';

import { updateUserInfomation } from '@src/store/actions/RegistrationAction';

import { Views, Spacing, Colors } from '@src/styles';

const QualifactionsScreen = () => {
  const navigation = useNavigation();
  const name = navigation.getParam('name', '');
  const [, dispatch] = useStore();
  const selectedArrayOBJ = new SelectedItemsArray();
  const CheckBoxItems = ['Neck', 'Shoulder', 'Elbow', 'Wrist/Hand', 'Low Back', 'Hip/Pelvis', 'Knee', 'Ankle/Foot', 'Other'];

  const handleButtonPress = () => {
    const qualifications = selectedArrayOBJ.getArray().map((item) => (
      item.value
    ));

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
              // eslint-disable-next-line react/no-array-index-key
              checkBoxKey={index}
              selectedArrayObject={selectedArrayOBJ}
              value={item}
              width={30}
              height={30}
            />
          </View>
        ))}
      </View>
      <View spacing={{ mx: 3, mt: 3 }}>
        <Button onPress={handleButtonPress}>
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
