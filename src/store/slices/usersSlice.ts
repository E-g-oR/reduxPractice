import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "..";
import { CreateUser, Developer, Mentor } from "../../types/users";

type UsersState = (Developer | Mentor)[];

const initialState: UsersState = [];

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<CreateUser>) => {
      const newUserInfo = action.payload;

      let newUser = {
        ...newUserInfo,
        id: Date.now(),
      } as Developer | Mentor;

      if (newUser.type === "DEVELOPER") {
        newUser.mentorId = null;
      } else if (newUser.type === "MENTOR") {
        newUser.developers = [];
      }

      state.push(newUser);
      console.log(newUser); // TODO remove
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      const deletingIndex = state.findIndex(
        (user) => user.id === action.payload
      );
      if (deletingIndex !== -1) {
        console.log(deletingIndex); // TODO remove
        state.splice(deletingIndex, 1);
      }
    },
  },
});

export const { addUser, deleteUser } = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users;

export const getMentors = (users: UsersState) =>
  users.filter((user) => user.type === "MENTOR");

export const getDevelopers = (users: UsersState) =>
  users.filter((user) => user.type === "DEVELOPER");

export const getUserById = (users: UsersState, id: number) =>
  users.find((user) => user.id === id);

export default usersSlice.reducer;
