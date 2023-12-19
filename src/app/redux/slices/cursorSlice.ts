import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  cursorHover: boolean,
  cursorTitle: boolean,
  title: string
}

const initialState: CounterState = {
  cursorHover: false,
  cursorTitle: false,
  title: ''

}

export const cursorSlice = createSlice({
  name: 'cursor',
  initialState,
  reducers: {
    hoverOn: (state) => {
      state.cursorHover = true;
    },
    hoverOff: (state) => {
      state.cursorHover = false;
      state.cursorTitle = false;
      state.title = '';

    },
    hoverTitle: (state, {payload} : PayloadAction<string>) => {
      state.cursorTitle = true;
      state.title = payload;

    }
  
  },
})

// Action creators are generated for each case reducer function
export const { hoverOn, hoverOff, hoverTitle } = cursorSlice.actions

export default cursorSlice.reducer


 // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes