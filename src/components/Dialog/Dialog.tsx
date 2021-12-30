import React, { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { closeForm } from "../../store/slices/formSlice";
import { addUser } from "../../store/slices/usersSlice";
import Button from "../UI/Button/Button";
import "./Dialog.scss";

const Dialog: React.FC = () => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState<"DEVELOPER" | "MENTOR">("DEVELOPER");

  const reset = () => {
    setName("");
    setEmail("");
    setType("DEVELOPER");
    dispatch(closeForm());
  };

  const handleCancelClick = () => {
    dispatch(closeForm());
  };

  const handleConfirmClick = () => {
    if (name.trim() && email.trim() && type) {
      const newUser = {
        name,
        email,
        type,
      };

      dispatch(addUser(newUser));
      reset();
    }
  };

  return (
    <div className="dialog">
      <div className="modal">
        <div className="modal__content">
          <p className="modal__title">Modal title</p>
          <p className="modal__subtitle">Modal subtitle</p>
          <form className="modal__form form">
            <div className="text-field">
              <input
                autoComplete="off"
                type="text"
                name="name"
                id="name"
                required={true}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="name">Name</label>
              <span></span>
            </div>
            <div className="text-field">
              <input
                autoComplete="off"
                type="text"
                name="email"
                id="email"
                required={true}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email">Email</label>
              <span></span>
            </div>

            <div className="checkbox">
              <input
                className="checkbox__input"
                type="radio"
                name="type"
                id="type_developer"
                value={"DEVELOPER"}
                checked={type === "DEVELOPER"}
                onChange={(e) => setType(e.target.value as "DEVELOPER")}
              />
              <span className="checkbox__style"></span>
              <label htmlFor="type_developer">Developer</label>
            </div>
            <div className="checkbox">
              <input
                className="checkbox__input"
                type="radio"
                name="type"
                id="type_mentor"
                value={"MENTOR"}
                checked={type === "MENTOR"}
                onChange={(e) => setType(e.target.value as "MENTOR")}
              />
              <span className="checkbox__style"></span>
              <label htmlFor="type_mentor">Mentor</label>
            </div>
          </form>
          <div className="modal__actions">
            <Button
              onClick={handleCancelClick}
              text="Cancel"
              type="outlined"
            />
            <Button
              onClick={handleConfirmClick}
              text="Confirm"
              type="contained"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
