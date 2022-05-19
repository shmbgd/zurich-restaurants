const INITIAL_STATE = {
  favorites: [] as string[]
};

export type RootState = typeof INITIAL_STATE;

export default (state = INITIAL_STATE, action: any): typeof INITIAL_STATE => {
  switch (action.type) {
  case "SET_FAVORITES":
    return {
      ...state,
      favorites: action.payload,
    };
  case "ADD_TO_FAVORITES":
    return {
      ...state,
      favorites: [...state.favorites, action.payload],
    };
  case "REMOVE_FROM_FAVORITES":
    return {
      ...state,
      favorites: state.favorites.filter(e => e !== action.payload),
    };
  default:
    return state;
  }
};
