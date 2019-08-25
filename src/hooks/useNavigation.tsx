import { useContext, useCallback } from 'react';
import { NavigationContext } from 'react-navigation';

const useNavigation = () => {
  const navigation = useContext(NavigationContext);

  // memoize functions to use in effects
  const setParams = useCallback(navigation.setParams, []);
  const navigate = useCallback(navigation.navigate, []);
  const push = useCallback(navigation.push, []);

  return {
    state: navigation.state,
    setParams,
    navigate,
    push,
  };
};

export default useNavigation;
