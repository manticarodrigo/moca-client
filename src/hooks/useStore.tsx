import { useContext } from 'react';
import { StoreContext } from '@src/StoreProvider';

const useStore = () => useContext(StoreContext);

export default useStore;
