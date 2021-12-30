import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { closeEditMode, closeForm } from "../../store/slices/formSlice";
import { addUser, editUser, getUserById } from "../../store/slices/usersSlice";
import { CreateUser, Developer, EditUserInfo, Mentor } from "../../types/users";
import Button from "../UI/Button/Button";
import "./Dialog.scss";

const Dialog: React.FC = () => {
  const dispatch = useAppDispatch();
  const editingUserId = useAppSelector((state) => state.form.editingItemId);
  const users = useAppSelector((state) => state.users);
  const [editingUser, setEditingUser] = useState<Developer | Mentor | null>(
    null
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState<"DEVELOPER" | "MENTOR">("DEVELOPER");

  useEffect(() => {
    if (editingUserId) {
      const eU = getUserById(users, editingUserId);
      if (eU) {
        setEditingUser(eU);
        setName(eU.name);
        setType(eU.type);
        setEmail(eU.email);
      }
    }
  }, [editingUserId]);

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
      const newUser: CreateUser = {
        name,
        email,
        type,
      };

      if (editingUserId) {
        const editUserInfo: EditUserInfo = {
          newInfo: newUser,
          userId: editingUserId,
        };
        dispatch(editUser(editUserInfo));
        dispatch(closeEditMode());
      } else {
        dispatch(addUser(newUser));
      }

      reset();
    }
  };

  return (
    <div className="dialog">
      <div className="modal">
        <div className="modal__content">
          <p className="modal__title">
            {editingUser ? editingUser.name : "Create user"}
          </p>
          <p className="modal__subtitle">
            {editingUser ? editingUser.type : null}
          </p>
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
            <Button onClick={handleCancelClick} text="Cancel" type="outlined" />
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
