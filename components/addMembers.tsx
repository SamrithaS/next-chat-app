import { useState } from "react";
import { ProfileType } from "../types/types";
import { validateEmail } from "../helpers/regex";
import { addMemberToChannel } from "../helpers/supabaseApiCalls";
import { getMembers } from "../helpers/supabaseApiCalls";
const MemberList = ({
  selectedRoom,
  profiles,
  setMemberList,
}: {
  selectedRoom: string;
  profiles: ProfileType[];
  setMemberList: any;
}) => {
  const [emailId, setEmailId] = useState<string>("");

  const addButtonClickHandler = async () => {
    let res;
    if (validateEmail(emailId)) {
      let filteredProfiles = profiles.filter((i) => i.email_id === emailId);
      if (filteredProfiles.length > 0) {
        res = await addMemberToChannel(selectedRoom, filteredProfiles[0].uid);
        if (res) {
          setMemberList(await getMembers(selectedRoom));
        }
      } else {
        alert("Email id doesn't match");
      }
    } else {
      alert("Enter a valid email id!");
    }
  };
  return (
    <div className="absolute right-0 w-full p-3 bg-white shadow-sm outline-none cursor-auto rounded-b-md top-8 min-w-max">
      <p className="pb-2 text-sm font-medium text-left text-gray-500 capitalize">
        email id{" "}
      </p>
      <div className="flex">
        <input
          value={emailId}
          onChange={(e) => {
            setEmailId(e.target.value);
          }}
          className="w-full px-3 py-2 text-sm font-medium text-gray-500 bg-gray-100 rounded-md shadow-sm outline-none "
          onKeyDown={(e) => {
            if (e.key === "Enter") addButtonClickHandler();
          }}
        />
      </div>
    </div>
  );
};

export default MemberList;
