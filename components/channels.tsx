import React, { useEffect, useRef } from "react";
import { supabase } from "../helpers/supabase";
import { RoomType } from "../types/types";
import { createChannel } from "../helpers/supabaseApiCalls";
import { handleClickOutside } from "../helpers/outsideClick";

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
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.addEventListener("mousedown", (event) =>
      handleClickOutside(event, inputRef, setIsInputTrue)
    );
    return () => {
      document.removeEventListener("mousedown", (event) =>
        handleClickOutside(event, inputRef, setIsInputTrue)
      );
    };
  }, [inputRef]);

  const handleRoom = async (event) => {
    let res = await createChannel(event, setRoomListData, setIsInputTrue);
    if (res) {
      setIsInputTrue(false);
      // setSelectedRoom(event.target.value);
    }
  };

  return (
    <div className="m-2">
      {rooms?.map((room: RoomType, id: number) => {
        return (
          <div
            data-testid={`box`}
            id="box"
            draggable="true"
            onDrag={() => {}}
            key={id}
            onClick={() => setSelectedRoom(room.id)}
            className={`capitalize p-3 text-gray-500 font-medium rounded-lg my-2 cursor-pointer ${
              room.id === selectedRoom ? "bg-blue-100" : "bg-gray-100 "
            }`}
          >
            <div>{room.name}</div>
          </div>
        );
      })}
      {isInputTrue ? (
        <input
          ref={inputRef}
          className="flex w-full px-3 my-2 font-medium text-gray-500 capitalize bg-gray-100 rounded-lg h-11 outline-0"
          onKeyDown={(e) => handleRoom(e)}
          autoFocus
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Channels;
