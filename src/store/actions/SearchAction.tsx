import { Dispatch } from 'react';

import api from '@src/services/api';
import { FilterParams, SearchState } from '@src/store/reducers/SearchReducer';


export type SearchAction =
  | { type: 'GET_SEARCH_SUCCESSFUL'; payload: SearchState }


const getSearchResults = (params?: FilterParams) => async (
  dispatch: Dispatch<SearchAction>,
  store,
) => {
  const headers = { Authorization: `Token ${store.user.token}` };
  const options = { query: params, headers };

  const { data } = await api.user.userTherapistSearchList(options);

  dispatch({ type: 'GET_SEARCH_SUCCESSFUL', payload: data });
};

export {
  getSearchResults,
};
