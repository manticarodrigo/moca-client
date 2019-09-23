import React, { useEffect } from 'react';

import { RouteProp } from '@react-navigation/core';
import {
  createStackNavigator,
  StackNavigationProp,
  StackNavigationOptions,
} from '@react-navigation/stack';

import { login } from '@src/store/actions/UserActions';
import useStore from '@src/hooks/useStore';

import { Colors, Texts } from '@src/styles';

import { BackButtonIcon } from '@src/icons';

import View from '@src/components/View';
import Text from '@src/components/Text';
import BackButton from '@src/components/BackButton';

import ConversationListScreen from '@src/screens/ConversationListScreen';
import ConversationScreen from '@src/screens/ConversationScreen';


export type ConversationParamList = {
  conversationListScreen: undefined;
  conversationScreen: { conversation: Conversation };
};

export type ScreenProps<ScreenName extends keyof ConversationParamList> = {
  navigation: StackNavigationProp<ConversationParamList, ScreenName>;
  route: RouteProp<ConversationParamList, ScreenName>;
}

const Stack = createStackNavigator<ConversationParamList>();

const screenOptions: StackNavigationOptions = {
  // eslint-disable-next-line react/display-name
  // header: ({ scene, previous, navigation }) => {
  //   const { options } = scene.descriptor;

  //   return (
  //     <View row justifyCenter={!previous} alignCenter spacing={{ pt: 5, pb: 3 }} bgColor="primary">
  //       {previous && (
  //         <View onPress={navigation.goBack}>
  //           <View shadow={{ color: 'secondary', blur: 2, alpha: 0.16 }}>
  //             <BackButtonIcon />
  //           </View>
  //         </View>
  //       )}
  //       <Text variant="titleSmallWhite">
  //         {options.title || scene.route.name}
  //       </Text>
  //     </View>
  //   );
  // },
  headerBackImage: () => BackButton,
  headerBackTitleVisible: false,
  headerStyle: {
    borderBottomWidth: 0,
    height: 100,
    backgroundColor: Colors.primary,
  },
  headerLeftContainerStyle: {
    position: 'relative',
    justifyContent: 'center',
    alignContent: 'center',
    // ...Spacing.getStyles({ p: 1 }),
  },
  headerTitleContainerStyle: {
    position: 'relative',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  headerTitleStyle: {
    ...Texts.titleSmallWhite,
  },
};

const ConversationStack = () => {
  const { dispatch } = useStore();

  useEffect(() => {
    dispatch(login());
  }, []);

  return (
    <Stack.Navigator initialRouteName="conversationListScreen" screenOptions={screenOptions}>
      <Stack.Screen name="conversationListScreen" component={ConversationListScreen} />
      <Stack.Screen name="conversationScreen" component={ConversationScreen} />
    </Stack.Navigator>
  );
};

export default ConversationStack;
