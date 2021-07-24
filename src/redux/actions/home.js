import AsyncStorage from '@react-native-async-storage/async-storage';
//Remove bottom
import {isSameDay} from '../../utils';
import dayjs from 'dayjs';
const images = [
  'https://images.unsplash.com/photo-1575762087983-f1c1893455a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1052&q=80',
  'https://images.unsplash.com/photo-1557401622-cfc0aa5d146c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1051&q=80',
  'https://images.unsplash.com/photo-1422486025716-2a54cdd0989a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  'https://images.unsplash.com/photo-1501619593928-bef49688c888?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80',
  'https://images.unsplash.com/23/lions-tigers-and-leopards-oh-my.JPG?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  'https://images.unsplash.com/photo-1439577873450-389044ffc989?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80',
  'https://images.unsplash.com/photo-1486688680290-be46662593bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80',
];

const locations = ['Pune, India', 'Kochi, India', 'Mumbai, India'];

const records = [];

for (var i = 0; i < 7; ++i) {
  let rand = Math.floor(6 * Math.random());
  let locrand = Math.floor(2 * Math.random());
  records.push({
    date: dayjs().subtract(15 - i, 'days'),
    picture: images[i],
    temperature: 27 + Math.floor(5 * Math.random()),
    location: locations[locrand],
    description: '',
  });
}

const initialState = {
  installedDate: dayjs().subtract(15, 'days'),
  rows: records,
};

// Define action types
export const INIT_STATE = 'INIT_STATE';
export const ADD_PICTURE = 'ADD_PICTURE';
export const SET_LOCATION = 'SET_LOCATION';

const STORAGE_KEY = '@picaday';

export const initialiseState = () => async dispatch => {
  try {
    let store = await JSON.parse(await AsyncStorage.getItem(STORAGE_KEY));
    if (store === null) {
      const data = initialState;
      store = initialState;
      const jsonString = JSON.stringify(data);
      await AsyncStorage.setItem(STORAGE_KEY, jsonString);
    }
    dispatch({
      type: INIT_STATE,
      payload: store,
    });
  } catch (err) {
    console.error('Error:', err);
  }
};

export const addOrUpdatePicture = picture => async dispatch => {
  let picturesData;
  try {
    picturesData = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY));
    const index = picturesData.rows.findIndex(row =>
      isSameDay(row.date, picture.date),
    );
    if (index >= 0) {
      picturesData.rows[index] = picture;
    } else {
      picturesData.rows.push(picture);
    }
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(picturesData));
  } catch (e) {
    // error reading value
    console.error(e);
  }
  return dispatch({
    type: ADD_PICTURE,
    payload: picturesData,
  });
};

export const setLocation = location => async dispatch => {
  dispatch({
    type: SET_LOCATION,
    payload: location,
  });
};
