import { useEffect, useRef, useState } from "react";
import Avatar from "./avatar";
import { MessageType } from "../types/types";
import getBgColor from "../helpers/getbgColor";

const Messages = ({
  userID,
  messages,
  selectedRoomName
}: {
  userID: string;
  messages: MessageType[];
  selectedRoomName: string;
}) => {
  const [colorState, setColorState] = useState<any>({});
  const messageRef = useRef<HTMLDivElement>(null);

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

  return (
    <>
      <h2 className="text-center text-md font-medium text-gray-700 py-1 capitalize">
        {selectedRoomName}
      </h2>
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
                  id={id}
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
