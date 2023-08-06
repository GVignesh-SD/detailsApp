// index.js
import { combineReducers } from '@reduxjs/toolkit';
import detailSlice from './details/detailSlice';

const rootReducer = combineReducers({
  details: detailSlice,
});

export default rootReducer;
