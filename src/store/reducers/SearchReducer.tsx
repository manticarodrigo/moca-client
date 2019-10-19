import { SearchAction } from '@src/store/actions/SearchAction';

type Result = {
  id: string;
  name: string;
  rating: string;
  sessionDuration: string;
  sessionPrice: string;
  experience: string;
  licenseNumber: string;
}

export type FilterParams = {
  gender?: 'M' | 'F';
  ailments?: string[];
  maxPrice?: number;
}

export type SearchState = Result[]

const reducer = (state: SearchState, action: SearchAction): SearchState => {
  switch (action.type) {
    case 'GET_SEARCH_SUCCESSFUL':
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
