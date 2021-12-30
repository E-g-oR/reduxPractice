import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { CreateUser, Developer, EditUserInfo, Mentor } from "../../types/users";

export const getUserById = (users: UsersState, id: number) =>
  users.find((user) => user.id === id);

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
    editUser: (state, action: PayloadAction<EditUserInfo>) => {
      const editngUser = getUserById(state, action.payload.userId);
      if (editngUser) {
        const { email, name, type } = action.payload.newInfo;
        editngUser.email = email;
        editngUser.name = name;
        editngUser.type = type;
      }
    },
  },
});

export const { addUser, deleteUser, editUser } = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users;

export const getMentors = (users: UsersState) =>
  users.filter((user) => user.type === "MENTOR");

export const getDevelopers = (users: UsersState) =>
  users.filter((user) => user.type === "DEVELOPER");

export default usersSlice.reducer;
