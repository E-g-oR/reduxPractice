import React from "react";
import { useAppSelector } from "../../store/hooks";
import { getMentors } from "../../store/slices/usersSlice";
import UserList from "../UserList";

function MentorList() {
  const state = useAppSelector((state) => state);

  const mentors = getMentors(state);
  return (
    <div className="mentor-list">
      <UserList list={mentors} />
    </div>
  );
}

export default MentorList;
