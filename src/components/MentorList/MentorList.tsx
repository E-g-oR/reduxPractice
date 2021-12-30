import React from "react";
import { useAppSelector } from "../../store/hooks";
import { getMentors } from "../../store/slices/usersSlice";
import UserList from "../UserList";

function MentorList() {
  const users = useAppSelector((state) => state.users);
  const mentors = getMentors(users);
  
  return (
    <div className="mentor-list">
      <UserList list={mentors} />
    </div>
  );
}

export default MentorList;
