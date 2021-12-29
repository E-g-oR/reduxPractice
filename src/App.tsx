import React from "react";
import "./index.scss";
import UserCard from "./components/UI/UserCard/UserCard";
import Button from "./components/UI/Button/Button";
import { Developer } from "./types/users";
import "./app.scss";
import MentorList from "./components/MentorList/MentorList";
import DeveloperList from "./components/DeveloperList/DeveloperList";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { openForm, selectIsOpen } from "./store/slices/formSlice";
import Dialog from "./components/Dialog/Dialog";
import {
  getDevelopers,
  getMentors,
  selectUsers,
} from "./store/slices/usersSlice";
import UserList from "./components/UserList";

function App() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);

  const mentors = getMentors(state);
  // const developers = getDevelopers(state);
  const users = useAppSelector((state) => state.users);
  // const users = selectUsers(state);
  const isFormOpen = selectIsOpen(state.form);

  const handleClick = () => {
    dispatch(openForm());
  };

  return (
    <>
      <div className="app">
        <div className="container">
          <Button text={"Create user"} onClick={handleClick} />
          <h1>Заголовок</h1>
          <h2>Заголовок</h2>
          <h3>Заголовок</h3>
          <h4>Заголовок</h4>
          <h5>Заголовок</h5>
          <h6>Заголовок</h6>
          <div className="users">
            <MentorList />
            <DeveloperList />
          </div>
        </div>
      </div>
      {isFormOpen && <Dialog />}
    </>
  );
}

export default App;
