import React from "react";
import SearchUser from "./SearchUser";

interface SearchForEditUserProps {}

const SearchForEditUser: React.FC<SearchForEditUserProps> = ({}) => {
  return (
    <div>
      <SearchUser customURL="/users/edituser/" />
    </div>
  );
};

export default SearchForEditUser;
