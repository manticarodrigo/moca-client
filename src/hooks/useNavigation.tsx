import { useContext, useCallback } from 'react';
import { NavigationContext } from 'react-navigation';

const useNavigation = () => {
  const navigation = useContext(NavigationContext);

  // memoize setParams for use in effects
  const setParams = useCallback(navigation.setParams, []);

  navigation.setParams = setParams;

  return navigation;
};

export default useNavigation;
