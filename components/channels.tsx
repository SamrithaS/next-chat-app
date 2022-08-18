import React, { useEffect, useRef } from "react";
import { supabase } from "../helpers/supabase";
import { RoomType } from "../types/types";

type SetStateAction<S> = S | ((prevState: S) => S);
type Dispatch<A> = (value: A) => void;

const Channels = ({
  isInputTrue,
  setIsInputTrue,
  rooms,
  setRoomListData,
  selectedRoom,
  setSelectedRoom,
}: {
  isInputTrue: boolean;
  setIsInputTrue: (i: boolean) => void;
  rooms: RoomType[];
  setSelectedRoom: Dispatch<SetStateAction<string>>;
  selectedRoom: string;
  setRoomListData: () => void;
}) => {
  const inputRef = useRef(null);

  const createChannel = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.target.value && e.target.value.trim().length) {
      const { data, error } = await supabase
        .from("rooms")
        .insert({ name: e.target.value }, { returning: "minimal" });
      if (!error) {
        setRoomListData();
      }
      setIsInputTrue(false);
      if (error) alert(error);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        inputRef &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setIsInputTrue(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputRef]);

  return (
    <div className="m-2 ">
      {rooms?.map((room: RoomType, id: number) => {
        return (
          <div
            key={id}
            onClick={() => setSelectedRoom(room.id)}
            className={`capitalize  p-3 text-gray-500 font-medium rounded-lg my-2 cursor-pointer ${
              room.id === selectedRoom ? "bg-blue-100" : "bg-gray-100 "
            }`}
          >
            {room.name}
          </div>
        );
      })}
      {isInputTrue ? (
        <input
          ref={inputRef}
          className="w-full flex bg-gray-100 rounded-lg my-2 h-11 outline-0 px-3 capitalize text-gray-500 font-medium"
          onKeyDown={(e) => createChannel(e)}
          autoFocus
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Channels;
