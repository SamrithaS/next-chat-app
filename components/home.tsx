import Nav from "./nav";
import { supabase } from "../helpers/supabase";
import React, { useState, useEffect } from "react";
import { userType } from "../types/types";
import Messages from "./messages";
import SideBar from "./sideBar";
import { RoomType } from "../types/types";
import { MessageType } from "../types/types";
import { getMessages, getRooms } from "../helpers/supabaseApiCalls";

const Home = ({
  user,
  messageSession,
}: {
  user: userType;
  messageSession: any;
}) => {
  const [typedText, setTypedText] = useState<string>("");
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const [messages, setMessages] = useState<MessageType[]>([]);

  const setRoomListData = async () => {
    let data = await getRooms();
    setSelectedRoom(data?.[0]?.id || "");
    setRooms(data);
  };

  useEffect(() => {
    setRoomListData();
  }, []);

  const setMessageListData = async () => {
    setMessages(await getMessages(selectedRoom));
  };

  useEffect(() => {
    setMessageListData();
  }, [messageSession, selectedRoom]);

  const onSignOut = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const { error } = await supabase.auth.signOut();
    if (error) alert(error);
  };

  const handleEnter = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (typedText !== "") {
      const { error } = await supabase.from("message").insert([
        {
          content: typedText,
          username: user.user_metadata.username,
          room_id: selectedRoom,
        },
      ]);
      setTypedText("");
      if (error) alert(error);
    }
  };
  return (
    <div className="h-screen">
      <Nav Name={user.user_metadata.username} onSignOut={onSignOut} />
      <div className="bg-white max-w-5xl m-auto flex h-5/6 mt-8 rounded-2xl shadow-sm justify-between items-stretch">
        <SideBar
          rooms={rooms}
          setRoomListData={setRoomListData}
          selectedRoom={selectedRoom}
          setSelectedRoom={setSelectedRoom}
        />
        <div
          className="flex flex-col justify-between pt-3 px-4 pb-4 py-1"
          style={{ flex: 2 }}
        >
          {messages && rooms ? (
            <Messages
              userID={user.id}
              messages={messages}
              selectedRoomName={
                rooms.filter((i) => selectedRoom === i.id)?.[0]?.name || ""
              }
            />
          ) : (
            <div className="flex items-center justify-center bg-gray-100 h-full">
              <p className="text-2xl font-normal text-gray-400">
                Create a room to chat
              </p>
            </div>
          )}
          {rooms ? (
            <div className="bg-gray-100 rounded-b-lg p-2 relative pb-3">
              <input
                type="text"
                value={typedText}
                onKeyPress={(e) => handleEnter(e)}
                autoFocus
                onChange={(e) => setTypedText(e.target.value)}
                className="bg-white outline-none py-2 pl-4 pr-10 rounded-3xl shadow-md w-full"
              />
              <svg
                width="30"
                height="20"
                id="svg"
                onClick={handleSendMessage}
                className="cursor-pointer absolute right-5 top-4"
                viewBox="0 0 61 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M60 1L1.5 38L24 45.5L48 20.5L32 50L57 62.5L60 1Z"
                  fill="rgb(29 78 216)"
                  stroke="rgb(29 78 216)"
                />
                <path
                  d="M36.5 54L31 51.5L32 62L36.5 54Z"
                  fill="rgb(29 78 216)"
                  stroke="rgb(29 78 216)"
                />
              </svg>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
export default Home;
