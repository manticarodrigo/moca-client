import { useContext, useCallback } from 'react';
import { StoreContext, StoreState, ProviderDispatch } from '@src/StoreProvider';

type StoreHook = { store: StoreState; dispatch: ProviderDispatch }

const useStore = (): StoreHook => {
  const [store, dispatch] = useContext(StoreContext);

  // memoize dispatch to use in effects
  const memoDispatch = useCallback(dispatch, []);

  return { store, dispatch: memoDispatch };
};

export default useStore;
