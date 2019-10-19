import { Dispatch } from 'react';

// import api from '@src/services/api';
import { FilterParams, SearchState } from '@src/store/reducers/SearchReducer';


export type SearchAction =
  | { type: 'GET_SEARCH_SUCCESSFUL'; payload: SearchState }


const getSearchResults = (params?: FilterParams) => async (dispatch: Dispatch<SearchAction>) => {
  // const { data } = await api.user.userTherapistRead('');

  // dispatch({ type: 'GET_SEARCH_SUCCESSFUL', payload: data });

  const _randomIntInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const initialResults = Array.from({ length: 56 }, (_, i) => {
    const names = ['John', 'Mary', 'Tim', 'Sally', 'Joe'];
    const index = _randomIntInRange(0, names.length - 1);

    return {
      id: i.toString(),
      name: `${names[index]} Doe`,
      rating: '5',
      sessionDuration: '30/45/60',
      sessionPrice: '$$',
      licenseNumber: '4675934',
    };
  });

  dispatch({ type: 'GET_SEARCH_SUCCESSFUL', payload: initialResults });
};

export {
  getSearchResults,
};
