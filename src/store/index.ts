import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slices/usersSlice";
import formReducer from "./slices/formSlice";

const store = configureStore({
  reducer: {
    //   posts: postsReducer,
    //   comments: commentsReducer,
    users: usersReducer,
    form: formReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
