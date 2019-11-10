import { Dispatch } from 'react';

import api from '@src/services/api';
import { FilterParams, SearchState } from '@src/store/reducers/SearchReducer';


export type SearchAction =
  | { type: 'GET_SEARCH_SUCCESSFUL'; payload: SearchState }


const getSearchResults = (params?: FilterParams) => async (dispatch: Dispatch<SearchAction>) => {
  const { ailments = [], ...rest } = params;

  // eslint-disable-next-line quotes
  const query = { ...rest, ...(ailments.length && { ailments: `["${ailments.join(", ")}"]` }) };

  const { data } = await api.user.userTherapistSearchList({ query });

  dispatch({ type: 'GET_SEARCH_SUCCESSFUL', payload: data });
};

export {
  getSearchResults,
};
