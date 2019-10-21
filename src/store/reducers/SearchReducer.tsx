import { SearchAction } from '@src/store/actions/SearchAction';

import { TherapistSearch as BadTherapistSearch } from '@src/services/openapi';

export type TherapistSearch = Omit<BadTherapistSearch, 'user'> & BadTherapistSearch['user'];

export type FilterParams = {
  gender?: 'M' | 'F';
  ailments?: string[];
  maxPrice?: string;
}

export type SearchState = TherapistSearch[]

const reducer = (state: SearchState, action: SearchAction): SearchState => {
  switch (action.type) {
    case 'GET_SEARCH_SUCCESSFUL':
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
