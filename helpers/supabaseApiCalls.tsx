import { supabase } from "./supabase";
import { MessageType, RoomType } from "../types/types";

export const getMessages = async (
  selectedRoom: string
): Promise<MessageType[]> => {
  const { data } = await supabase
    .from("message")
    .select("*")
    .filter("room_id", "in", `(${selectedRoom})`)
    .order("created_at", { ascending: true });
  return data;
};

export const getRooms = async (): Promise<RoomType[]> => {
  const { data } = await supabase.from("rooms").select("*");
  return data;
};
