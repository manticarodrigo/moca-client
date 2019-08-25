import { useContext, useCallback } from 'react';
import { StoreContext, StoreState, ProviderDispatch } from '@src/StoreProvider';

type StoreHook = [StoreState, ProviderDispatch];

const useStore = (): StoreHook => {
  const [state, dispatch] = useContext(StoreContext);

  // memoize dispatch to use in effects
  const memoDispatch = useCallback(dispatch, []);

  return [state, memoDispatch];
};

export default useStore;
