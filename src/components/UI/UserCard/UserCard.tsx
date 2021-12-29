
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  addUser,
  deleteUser,
  selectUsers,
} from "../../../store/slices/usersSlice";
import { Developer, Mentor } from "../../../types/users";
import Button from "../Button/Button";
import IconButton from "../IconButton/IconButton";
import Delete from "../icons/Delete";
import Edit from "../icons/Edit";
import "./usercard.scss"

interface UserCardProps {
  user: Developer | Mentor;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const state = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const users = selectUsers;
  const { type, id, name, email } = user;

  const handleEditClick = () => {
    console.log(users(state));
    dispatch(addUser({ name: "Hello", email: "world", type: "DEVELOPER" }));
  };

  const handleDeleteClick = () => dispatch(deleteUser(user.id));

  return (
    <div className="card card_user user-card">
      <div className="card__header user-card__header">
        <div className="card__preview">
          <div className="card__image">
            <p>{name[0]}</p>
          </div>
          <div className="card__header-text">
            <p className="card__title h6"> {name} </p>
            <p className="card__subtitle body2"> {email} </p>
          </div>
        </div>
        <div className="card__actions">
          <IconButton title={"Edit"} onClick={handleEditClick}>
            <Edit />
          </IconButton>
          <IconButton title={"Delete"} onClick={handleDeleteClick}>
            <Delete />
          </IconButton>
        </div>
      </div>
      <div className="card__content">
        <p>{`${type}`}</p>
        <p>{type === "DEVELOPER" && `${user.mentorId}`}</p>
        <p>{type === "MENTOR" && `${user.developers}`}</p>
      </div>
    </div>
  );
};

export default UserCard;
