import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  cursorEffect: boolean,
  title: string,
  blend : boolean
}

const initialState: CounterState = {
    cursorEffect: false,
    title: '',
    blend : true

}

export const cursorSlice = createSlice({
  name: 'cursor',
  initialState,
  reducers: {
    hoverOn: (state, {payload} : PayloadAction<string>) => {
      state.cursorEffect = true;
      state.title = payload;
    },
    hoverOff: (state) => {
      state.cursorEffect = false;
      state.title = '';


    },
  
  },
})

// Action creators are generated for each case reducer function
export const { hoverOn, hoverOff } = cursorSlice.actions

export default cursorSlice.reducer


 // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes