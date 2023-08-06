// reducers.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  details : [],
};

const detailSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    addDetails: (state, action) => {
      state.details.push(action.payload);

    },
    updateDetails: (state, action) => {
      const index = state.details.findIndex(item => item.name === action.payload.name);
      state.details[index] = action.payload;
    },
    deleteDetails: (state, action) => {
      const index = state.details.findIndex(item => item.name === action.payload.name);
    
      if (index !== -1) {
        const updatedDetails = [...state.details];
        updatedDetails.splice(index, 1);
    
        return {
          ...state,
          details: updatedDetails,
        };
      }
    
      return state; // If the object with the given name is not found, return the original state
    }
  },
});

export const { addDetails, updateDetails, deleteDetails } = detailSlice.actions;
export default detailSlice.reducer;
