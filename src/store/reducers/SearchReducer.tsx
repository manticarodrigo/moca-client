import { SearchAction } from '@src/store/actions/SearchAction';

import { TherapistSearch as BadTherapistSearch } from '@src/services/openapi';

export type TherapistSearch = Omit<BadTherapistSearch, 'user'> & BadTherapistSearch['user'];

export type FilterParams = {
  gender?: 'M' | 'F';
  ailments?: string[];
  max_price?: string;
  session_durations?: string[];
  review_count?: boolean;
  avg_rating?: boolean;
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
