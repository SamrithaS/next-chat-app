import { useEffect, useState, useCallback, useRef } from "react";
import { ProfileType } from "../types/types";
import { validateEmail } from "../helpers/regex";
import { addMemberToChannel } from "../helpers/supabaseApiCalls";
const MemberList = ({
  selectedRoom,
  profiles,
}: {
  selectedRoom: string;
  profiles: ProfileType[];
}) => {
  const [emailId, setEmailId] = useState<string>("");

  const addButtonClickHandler = () => {
    if (validateEmail(emailId)) {
      if (profiles.filter((i) => i.email_id === emailId).length > 0) {
        addMemberToChannel(selectedRoom, profiles[0].uid);
      } else {
        alert("Email id doesn't match");
      }
    } else {
      alert("Enter a valid email id!");
    }
  };
  return (
    <div className="absolute bg-white p-3 w-full rounded-b-md shadow-sm top-8 right-0 min-w-max outline-none cursor-auto">
      <p className="text-left text-sm font-medium text-gray-500 capitalize pb-2">
        email id{" "}
      </p>
      <div className="flex">
        <input
          value={emailId}
          onChange={(e) => {
            setEmailId(e.target.value);
          }}
          className="outline-none px-3 py-2 rounded-md bg-gray-100 shadow-sm w-full text-sm font-medium text-gray-500 "
          onKeyDown={(e) => {
            if (e.key === "Enter") addButtonClickHandler();
          }}
        />
        {/* <button onClick={addButtonClickHandler}>add</button> */}
      </div>
    </div>
  );
};

export default MemberList;
