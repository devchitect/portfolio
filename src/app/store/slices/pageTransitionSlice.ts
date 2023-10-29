import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  type: string,
  endpath: string
}

const initialState: CounterState = {
    type: '',
    endpath: 'Devchitect'
}

export const transitionSlice = createSlice({
  name: 'transition',
  initialState,

  reducers: {
    transition: (state, action) => {
      state.type = action.payload.type;
      state.endpath = action.payload.endpath;
    },

  
  },
})

// Action creators are generated for each case reducer function
export const { transition } = transitionSlice.actions

export default transitionSlice.reducer


 // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes