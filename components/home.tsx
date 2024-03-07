import Nav from "./nav";
import { supabase } from "../helpers/supabase";
import React, { useState, useEffect, useRef } from "react";
import { userType } from "../types/types";
import Messages from "./messages";
import SideBar from "./sideBar";

import { MessageType, ProfileType, RoomType } from "../types/types";
import EmojiPicker from "emoji-picker-react";
import {
  getMessages,
  getRooms,
  getProfiles,
  onSignOut,
} from "../helpers/supabaseApiCalls";
import { handleClickOutside } from "../helpers/outsideClick";

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
  const [profiles, setProfiles] = useState<ProfileType[]>([]);
  const [isEmojiModalOpen, setIsEmojiModalOpen] = useState<boolean>(false);
  const emojiRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const setRoomListData = async () => {
    let data = await getRooms(user?.id);
    setSelectedRoom(data?.[0]?.id || "");
    setRooms(data);
  };
  const setProfileData = async () => {
    setProfiles(await getProfiles());
  };

  const setMessageListData = async () => {
    setMessages(await getMessages(selectedRoom));
  };

  const handleEnter = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (typedText && typedText.trim().length) {
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

  useEffect(() => {
    setRoomListData();
    setProfileData();
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      handleClickOutside(event, emojiRef, () => {
        setIsEmojiModalOpen(false);
      });
    });
    return () => {
      document.removeEventListener("mousedown", (event) => {
        handleClickOutside(event, emojiRef, () => {
          setIsEmojiModalOpen(false);
        });
      });
    };
  }, [emojiRef, setIsEmojiModalOpen]);

  useEffect(() => {
    setMessageListData();
  }, [messageSession, selectedRoom]);

  return (
    <div className="h-screen">
      <Nav Name={user.user_metadata.username} onSignOut={onSignOut} />
      <div className="flex items-stretch justify-between max-w-6xl m-auto mt-8 bg-white shadow-sm h-5/6 rounded-2xl">
        <SideBar
          rooms={rooms}
          setRoomListData={setRoomListData}
          selectedRoom={selectedRoom}
          setSelectedRoom={setSelectedRoom}
        />
        <div
          className="flex flex-col justify-between px-5 py-1 pt-3 pb-4"
          style={{ flex: 2 }}
        >
          {rooms?.length ? (
            <Messages
              userID={user.id}
              messages={messages}
              profiles={profiles}
              selectedRoom={selectedRoom}
              selectedRoomName={
                rooms.filter((i) => selectedRoom === i.id)?.[0]?.name || ""
              }
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-100">
              <p className="text-2xl font-normal text-gray-400">
                Create a room to chat
              </p>
            </div>
          )}
          {rooms?.length ? (
            <div className="relative p-2 pb-3 bg-gray-100 rounded-b-lg">
              <input
                type="text"
                value={typedText}
                ref={inputRef}
                onKeyDown={(e) => handleEnter(e)}
                autoFocus
                onChange={(e) => setTypedText(e.target.value)}
                className="w-full py-2 pl-4 pr-10 bg-white shadow-md outline-none rounded-2xl"
              />
              <button
                onClick={() => {
                  setIsEmojiModalOpen(!isEmojiModalOpen);
                }}
              >
                <img
                  src="emoji.svg"
                  className="absolute cursor-pointer right-14 top-4"
                />
              </button>

              <img
                src="arrow.svg"
                className="absolute cursor-pointer right-5 top-4"
                onClick={handleSendMessage}
              />

              {isEmojiModalOpen ? (
                <div className="absolute bottom-14 right-2 " ref={emojiRef}>
                  <EmojiPicker
                    onEmojiClick={(props) => {
                      setTypedText(inputRef.current.value + props.emoji);
                    }}
                  />
                </div>
              ) : (
                <></>
              )}
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
