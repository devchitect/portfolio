import { configureStore } from '@reduxjs/toolkit'
import cursorSlice from './slices/cursorSlice'
import themeSlice from './slices/themeSlice'
import transitionSlice from './slices/pageTransitionSlice'

export const store = configureStore({
  reducer: {
    cursor: cursorSlice,
    theme: themeSlice,
    transition : transitionSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch