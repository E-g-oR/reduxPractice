import React from "react";
import { useAppSelector } from "../../store/hooks";
import { getDevelopers } from "../../store/slices/usersSlice";
import UserList from "../UserList";

function DeveloperList() {
  const state = useAppSelector((state) => state);
  const mentors = getDevelopers(state);
  return (
    <div className="developers-list">
      <UserList list={mentors} />
    </div>
  );
}

export default DeveloperList;
