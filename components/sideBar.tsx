import { useState } from "react";
import Channels from "./channels";
import { RoomType } from "../types/types";

type SetStateAction<S> = S | ((prevState: S) => S);
type Dispatch<A> = (value: A) => void;

const SideBar = ({
  rooms,
  getRooms,
  selectedRoom,
  setSelectedRoom,
}: {
  rooms: RoomType[];
  selectedRoom: string;
  setSelectedRoom: Dispatch<SetStateAction<string>>;
  getRooms: () => void;
}) => {
  const [isInputTrue, setIsInputTrue] = useState<boolean>(false);

  const createInputElement = () => {
    setIsInputTrue(true);
  };

  return (
    <div className="flex flex-1 flex-col p-3  border-gray-100 border-r ">
      <div className="flex items-center justify-between space-x-2 px-3 py-1">
        <h2 className="text-center text-md font-medium text-gray-700">Rooms</h2>
        <button className="" onClick={createInputElement}>
          {" "}
          <svg
            width="27"
            height="27"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="25" cy="25" r="25" fill="#DBEAFE" />
            <rect x="12" y="23" width="26" height="4" rx="1" fill="#3B82F6" />
            <rect
              x="27"
              y="12"
              width="26"
              height="4"
              rx="1"
              transform="rotate(90 27 12)"
              fill="#3B82F6"
            />
          </svg>
        </button>
      </div>
      <div className="overflow-scroll h-full">
        <Channels
          isInputTrue={isInputTrue}
          setIsInputTrue={setIsInputTrue}
          rooms={rooms}
          getRooms={getRooms}
          selectedRoom={selectedRoom}
          setSelectedRoom={setSelectedRoom}
        />
      </div>
    </div>
  );
};

export default SideBar;
