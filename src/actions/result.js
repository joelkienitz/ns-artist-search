import {
  SET_ARTISTS,
  ADD_ARTISTS,
} from '../utils/constants';
import { get } from '../utils/api';


export const setArtists = (artists) => ({
  type: SET_ARTISTS,
  artists
});

export const addArtists = (artists) => ({
  type: ADD_ARTISTS,
  artists
});


export const initiateGetResult = (searchTerm) => {
  return async (dispatch) => {
    try {
      const API_URL = `https://api.spotify.com/v1/search?query=${encodeURIComponent(
        searchTerm
      )}&type=artist`;
      const result = await get(API_URL);
      console.log(result);
      const { artists } = result;
      dispatch(setArtists(artists));
    } catch (error) {
      console.log('error', error);
    }
  };
};

export const initiateLoadMoreArtists = (url) => {
  return async (dispatch) => {
    try {
      const result = await get(url);
      return dispatch(addArtists(result.artists));
    } catch (error) {
      console.log('error', error);
    }
  };
};

