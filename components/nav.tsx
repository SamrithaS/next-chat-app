import React from "react";
import Avatar from "./avatar";

const Nav = ({
  Name,
  onSignOut,
}: {
  Name: string;
  onSignOut: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) => {
  return (
    <div className="w-full shadow-sm py-4 bg-white flex justify-start items-center">
      <div className="max-w-6xl mx-auto flex justify-between items-center w-full">
        <div className="flex items-center justify-between space-x-3">
          <Avatar Name={Name} />
          <p className="block text-lg font-medium text-gray-700 capitalize">
            {Name}
          </p>
        </div>
        <a
          href="#"
          className="px-2 bg-blue-100 py-1 rounded-md text-blue-500"
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => onSignOut(e)}
        >
          Sign Out{" "}
        </a>
      </div>
    </div>
  );
};
export default Nav;
