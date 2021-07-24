import {ADD_PICTURE, INIT_STATE, SET_LOCATION} from '../actions/home';

const initialState = {
  pictures: {
    isFetching: true,
    fetched: false,
    data: null,
  },
  location: null,
};

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case INIT_STATE:
      return {
        ...state,
        pictures: {isFetching: false, fetched: true, data: action.payload},
      };
    case ADD_PICTURE:
      return {...state, pictures: {...state.pictures, data: action.payload}};
    case SET_LOCATION:
      return {...state, location: action.payload};
    default:
      return state;
  }
}

export default homeReducer;
