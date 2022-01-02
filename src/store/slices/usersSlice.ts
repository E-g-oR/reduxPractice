import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { CreateUser, Developer, EditUserInfo, Mentor } from "../../types/users";

type UsersState = Array<Developer | Mentor>;

export const getMentors = (users: UsersState): Mentor[] =>
  users.filter((user) => user.type === "MENTOR") as Mentor[];

export const getUserById = (users: UsersState, id: number) =>
  users.find((user) => user.id === id);

const getFreeMentor = (users: UsersState): Mentor | undefined => {
  const mentors = getMentors(users);
  const sorted = mentors.sort((a, b) => {
    if (a.developers.length > b.developers.length) return 1;
    else if (a.developers.length < b.developers.length) return -1;
    else return 0;
  });
  const freeMentor = sorted[0];
  return freeMentor;
};

const getUnassignedDevelopers = (users: UsersState): Array<Developer> =>
  users.filter(
    (user) => user.type === "DEVELOPER" && user.mentorId === null
  ) as Array<Developer>;

const assignDeveloper = (users: UsersState, developerId: number) => {
  const freeMentor = getFreeMentor(users);
  if (freeMentor) {
    freeMentor.developers.push(developerId);
    const developer = getUserById(users, developerId) as Developer;
    developer.mentorId = freeMentor.id;
  } else {
    throw new Error("There is no any single Mentor yet")
  }
};

// const assignDeveloper = (users: UsersState, action: PayloadAction<number>) => {
//   const developerId = action.payload;
//   const freeMentor = getFreeMentor(users);
//   freeMentor.developers.push(developerId);
//   const developer = getUserById(users, developerId) as Developer;
//   developer.mentorId = freeMentor.id;
// };

const initialState: UsersState = [];

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // assignDeveloper: assignDeveloper,

    addUser: (state, action: PayloadAction<CreateUser>) => {
      const newUserInfo = action.payload;
      const userId = Date.now();

      let newUser = {
        ...newUserInfo,
        id: userId,
      } as Developer | Mentor;

      if (newUser.type === "DEVELOPER") {
        newUser.mentorId = null;
        state.push(newUser); // TODO change logic
        assignDeveloper(state, userId);
        // usersSlice.actions.assignDeveloper(userId)
      } else if (newUser.type === "MENTOR") {
        newUser.developers = [];
        state.push(newUser); // TODO change logic
      }
    },

    deleteUser: (state, action: PayloadAction<number>) => {
      const deletingIndex = state.findIndex(
        (user) => user.id === action.payload
      );

      if (deletingIndex !== -1) {
        state.splice(deletingIndex, 1);
      }
    },

    editUser: (state, action: PayloadAction<EditUserInfo>) => {
      const editngUser = getUserById(state, action.payload.userId);
      if (editngUser) {
        const { email, name, type } = action.payload.newInfo;
        editngUser.email = email;
        editngUser.name = name;
      }
    },
  },
});

export const { addUser, deleteUser, editUser } = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users;

export const getDevelopers = (users: UsersState) =>
  users.filter((user) => user.type === "DEVELOPER");

export default usersSlice.reducer;
