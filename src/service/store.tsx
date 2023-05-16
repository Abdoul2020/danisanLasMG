import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './redux/authExpert/loginSlice'
import forgetPasswordSlice from './redux/authExpert/forgetPasswordSlice'
import user_ExpertSlice from './redux/authExpert/user_ExpertSlice'
import expert_ProfileSlice from './redux/authExpert/getProfileSlice'



export const store= configureStore({


    reducer:{
        loginSlice:loginSlice,
        forgetPasswordSlice: forgetPasswordSlice,
        user_ExpertSlice:user_ExpertSlice,
        expert_ProfileSlice:expert_ProfileSlice
    },


    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
        serializableCheck: false,
    }),

    



})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch