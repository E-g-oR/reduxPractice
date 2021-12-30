import React from "react";
import "./index.scss";
import Button from "./components/UI/Button/Button";
import "./app.scss";
import MentorList from "./components/MentorList/MentorList";
import DeveloperList from "./components/DeveloperList/DeveloperList";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { openForm, selectIsOpen } from "./store/slices/formSlice";
import Dialog from "./components/Dialog/Dialog";

function App() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  // const users = useAppSelector((state) => state.users);

  const isFormOpen = selectIsOpen(state.form);

  const handleClick = () => {
    dispatch(openForm());
  };

  return (
    <>
      <div className="app">
        <div className="container">
          <Button text={"Create user"} onClick={handleClick} />
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
