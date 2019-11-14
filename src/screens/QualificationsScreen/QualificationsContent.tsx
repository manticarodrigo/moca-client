import React, { useState } from 'react';
import { NavigationStackProp } from 'react-navigation-stack';
import { TouchableWithoutFeedback, TouchableHighlight } from 'react-native';

import View from '@src/components/View';
import Button from '@src/components/Button';
import Text from '@src/components/Text';
import Checkbox from '@src/components/Checkbox';
import Toast from '@src/components/Toast';

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
  const [activeToast, setActiveToast] = useState<'success' | 'error'>();

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
      await dispatch(updateUser({ preferredAilments }));

      setActiveToast('success');

      setTimeout(() => {
        if (modal) {
          onClose();
        } else {
          navigation.navigate('AddressScreen', { title: 'Address' });
        }
      }, 2000);
    } catch {
      setActiveToast('error');
    }
  };

  return (
    <>
      {!!activeToast && (
        <Toast error={activeToast === 'error'} onClose={() => setActiveToast(undefined)}>
          {activeToast === 'success' ? 'Update successful.' : 'Update failed.'}
        </Toast>
      )}

      <View safeArea>
        {modal && (
          <View alignCenter justifyCenter py={4} variant="borderBottom">
            <Text variant="semiBoldLarge">
              Preferred Treatment Areas
            </Text>
          </View>
        )}
        <View scroll>
          <TouchableWithoutFeedback>
            <TouchableHighlight>
              <View px={3}>
                {!modal && (
                  <View py={5}>
                    <Text variant="title" align="center" numberOfLines={2}>
                      {`Thanks for signing up, ${store.user.firstName}`}
                    </Text>
                    <View pt={3}>
                      <Text variant="regular" align="center">
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
                        py={3}
                        width="100%"
                        {...(modal && index === 0 ? '' : { variant: 'borderTop' })}
                      >
                        <Text variant="semiBoldLarge">{item}</Text>
                        <Checkbox
                          checked={preferredAilments.includes(item)}
                          onChange={onCheckboxChange(item)}
                        />
                      </View>
                    ))}
                  </>
                </View>
                <View row mb={6} py={5} variant="borderTop">
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
    </>
  );
};


export default QualificationsContent;
