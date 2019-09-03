
const reducer = (state: {}, action: ChatAction) => {
  switch (action.type) {
    case 'REGESTER_USER':
      return {
        ...state,
        userInfo: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
