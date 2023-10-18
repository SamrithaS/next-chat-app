import { useEffect, useRef, useState } from "react";
import Avatar from "./avatar";
import { MessageType, ProfileType } from "../types/types";
import getBgColor from "../helpers/getbgColor";
import MemberList from "./memberList";
import AddMembers from "./addMembers";
import { handleClickOutside } from "../helpers/outsideClick";
import { getMembers } from "../helpers/supabaseApiCalls";

const Messages = ({
  userID,
  messages,
  selectedRoomName,
  selectedRoom,
  profiles,
}: {
  userID: string;
  messages: MessageType[];
  selectedRoomName: string;
  selectedRoom: string;
  profiles: ProfileType[];
}) => {
  const memberRef = useRef<number | null>(null);
  const allMembersRef = useRef<number | null>(null);
  const [colorState, setColorState] = useState<any>({});
  const messageRef = useRef<HTMLDivElement>(null);
  const [isMembersModalOpen, setIsMembersModalOpen] = useState<boolean>(false);
  const [isMemberListModalOpen, setisMemberListModalOpen] =
    useState<boolean>(false);
  const [memberList, serMemberList] = useState();
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
    let obj: any = {};
    let count = 1;
    messages.map((i: MessageType) => {
      obj[i.profile_id] = getBgColor(count);
      setColorState(obj);
      count++;
    });
  }, [messages]);

  const getMembersList = async () => {
    serMemberList(await getMembers(selectedRoom));
  };
  useEffect(() => {
    getMembersList();
  }, [selectedRoom]);

  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      handleClickOutside(event, memberRef, setIsMembersModalOpen);
      handleClickOutside(event, allMembersRef, setisMemberListModalOpen);
    });
    return () => {
      document.removeEventListener("mousedown", (event) => {
        handleClickOutside(event, memberRef, setIsMembersModalOpen);
        handleClickOutside(event, allMembersRef, setisMemberListModalOpen);
      });
    };
  }, [memberRef, setIsMembersModalOpen]);

  return (
    <>
      <div className="py-1 flex items-center justify-between">
        <h2 className="text-center text-md font-medium text-gray-700 capitalize">
          {selectedRoomName}
        </h2>
        <div className="flex items-center justify-between space-x-5 ">
          <div className="relative" ref={memberRef}>
            <button
              className="flex items-start px-2 space-x-1 py-1 bg-blue-100 rounded-md justify-between "
              onClick={() => setIsMembersModalOpen(!isMembersModalOpen)}
            >
              <svg
                width="16"
                height="17"
                viewBox="0 0 15 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 14V12.25C14 11.3217 13.6313 10.4315 12.9749 9.77513C12.3185 9.11875 11.4283 8.75 10.5 8.75H3.5C2.57174 8.75 1.6815 9.11875 1.02513 9.77513C0.368749 10.4315 0 11.3217 0 12.25V14"
                  fill="#3b82f6"
                />
                <path
                  d="M7 7C8.933 7 10.5 5.433 10.5 3.5C10.5 1.567 8.933 0 7 0C5.067 0 3.5 1.567 3.5 3.5C3.5 5.433 5.067 7 7 7Z"
                  fill="#3b82f6"
                />
              </svg>
              <p className="text-blue-500 font-normal text-sm">Members</p>
            </button>
            {isMembersModalOpen ? (
              <MemberList
                selectedRoom={selectedRoom}
                profiles={profiles}
                memberList={memberList}
              />
            ) : (
              <></>
            )}
          </div>
          <div className="relative" ref={allMembersRef}>
            <button
              className="flex items-start px-2 space-x-1 py-1 bg-blue-100 rounded-md justify-between"
              onClick={() => setisMemberListModalOpen(!isMemberListModalOpen)}
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 16 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 17V15.25C14 14.3217 13.6313 13.4315 12.9749 12.7751C12.3185 12.1187 11.4283 11.75 10.5 11.75H3.5C2.57174 11.75 1.6815 12.1187 1.02513 12.7751C0.368749 13.4315 0 14.3217 0 15.25V17"
                  fill="#4D74F9"
                />
                <path
                  d="M7 10C8.933 10 10.5 8.433 10.5 6.5C10.5 4.567 8.933 3 7 3C5.067 3 3.5 4.567 3.5 6.5C3.5 8.433 5.067 10 7 10Z"
                  fill="#4D74F9"
                />
                <path d="M12 0H13V5H12V0Z" fill="#4D74F9" />
                <rect x="10" y="2" width="5" height="1" fill="#4D74F9" />
              </svg>
              <p className="text-blue-500 font-normal text-sm">Add Members</p>
            </button>
            {isMemberListModalOpen ? (
              <AddMembers selectedRoom={selectedRoom} profiles={profiles} />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div
        className="overflow-scroll bg-gray-100 h-full mt-2 p-4 rounded-t-lg "
        ref={messageRef}
      >
        <div>
          <ul id="messages">
            {messages.map((message: MessageType, id: number) => {
              return (
                <li
                  key={id}
                  id={`${id}`}
                  className={`flex p-2 space-x-3 items-start ${
                    message.profile_id === userID
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  {message.profile_id !== userID ? (
                    <Avatar
                      Name={message.username}
                      bgColor={colorState[`${message.profile_id}`]}
                    />
                  ) : (
                    <></>
                  )}
                  <div>
                    {message.profile_id !== userID ? (
                      <h4 className="text-gray-700 font-medium text-md mb-1 capitalize">
                        {message.profile_id !== userID
                          ? message.username
                          : "You"}
                      </h4>
                    ) : (
                      <></>
                    )}
                    <p
                      className={` py-1 rounded-lg px-2 shadow-sm max-w-md ${
                        message.profile_id === userID
                          ? "bg-blue-500 text-white"
                          : "bg-white text-gray-500"
                      }`}
                    >
                      {message.content}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};
export default Messages;
