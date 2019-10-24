import React, { useState } from 'react';
import { NavigationStackProp } from 'react-navigation-stack';
import { TouchableWithoutFeedback, TouchableHighlight } from 'react-native';

import View from '@src/components/View';
import Button from '@src/components/Button';
import Text from '@src/components/Text';
import { Checkbox } from '@src/components/Checkbox';

import { updateUser } from '@src/store/actions/UserAction';

import useStore from '@src/hooks/useStore';


export const qualificationOptions = [
  'Neck',
  'Shoulder',
  'Elbow',
  'Wrist/Hand',
  'Low Back',
  'Hip/Pelvis',
  'Knee',
  'Ankle/Foot',
];

type Props = {
  navigation?: NavigationStackProp;
  modal?: boolean;
  onClose?: () => void;
}

const QualificationsContent = ({ navigation, modal, onClose }: Props) => {
  const { store, dispatch } = useStore();

  const [preferredAilments, setPreferredAilments] = useState(store.user.preferredAilments);

  const isButtonDisabled = !preferredAilments.length;

  const onCheckboxChange = (value: string) => (checked: boolean) => {
    let updated = [...preferredAilments];

    if (checked) {
      updated.push(value);
    } else {
      updated = updated.filter((v) => v !== value);
    }

    setPreferredAilments(updated);
  };

  const onPressSubmit = async () => {
    try {
      dispatch(updateUser({ preferredAilments }));

      if (modal) {
        onClose();
      } else {
        navigation.navigate('AddressScreen', { title: 'Address' });
      }
    } catch (error) {
      // console.log(error.message);
    }
  };

  return (
    <View safeArea>
      {modal && (
        <View variant="borderBottom" alignCenter justifyCenter spacing={{ py: 4 }}>
          <Text variant="titleSmall">
            Qualifications
          </Text>
        </View>
      )}
      <View scroll>
        <TouchableWithoutFeedback>
          <TouchableHighlight>
            <View spacing={{ px: 3 }}>
              {!modal && (
                <View spacing={{ py: 5 }}>
                  <Text variant="title" typography={{ align: 'center' }} numberOfLines={2}>
                    {`Thanks for signing up, ${store.user.firstName}`}
                  </Text>
                  <View spacing={{ pt: 3 }}>
                    <Text variant="regular" typography={{ align: 'center' }}>
                      What are your preferred treatment areas?
                    </Text>
                  </View>
                </View>
              )}
              <View>
                <>
                  {qualificationOptions.map((item, index) => (
                    <View
                      key={item}
                      row
                      justifyBetween
                      alignCenter
                      {...(modal && index === 0 ? '' : { variant: 'borderTop' })}
                      spacing={{ py: 3 }}
                      width="100%"
                    >
                      <Text variant="titleSmall">{item}</Text>
                      <Checkbox
                        checked={preferredAilments.includes(item)}
                        onChange={onCheckboxChange(item)}
                      />
                    </View>
                  ))}
                </>
              </View>
              <View row spacing={{ py: 4, mb: 6 }} variant="borderTop">
                <Button
                  width="100%"
                  variant={isButtonDisabled ? 'primaryDisabled' : 'primary'}
                  onPress={onPressSubmit}
                  disabled={isButtonDisabled}
                >
                  {!modal ? 'Continue' : 'Update' }
                </Button>
              </View>
            </View>
          </TouchableHighlight>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};


export default QualificationsContent;
