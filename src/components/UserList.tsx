import React, { useEffect } from "react";
import { Developer, Mentor } from "../types/users";
import UserCard from "./UI/UserCard/UserCard";
type UserListProps = {
  list: (Developer | Mentor)[];
};

const UserList: React.FC<UserListProps> = ({ list }) => {

  return (
    <div>
      {list.map((user) => <UserCard key={user.id} user={user} />)}
    </div>
  );
};

export default UserList;
