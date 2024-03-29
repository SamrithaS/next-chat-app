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

export const getRooms = async (userId): Promise<RoomType[]> => {
  // const { data } = await supabase.from("rooms").select("*");
  const { data } = await supabase
    .from("room_participant")
    .select(`room_id (*)`)
    .eq("profile_id", userId);

  return data?.flat()?.map((item) => item?.room_id);
};

export const getMembers = async (selectedRoom: string) => {
  const { data } = await supabase
    .from("room_participant")
    .select("*")
    .filter("room_id", "in", `(${selectedRoom})`);
  return data;
};

export const getProfiles = async () => {
  const { data } = await supabase.from("profile");
  // const { data2 } = await supabase.from("users");

  return data;
};

export const onSignOut = async (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  const { error } = await supabase.auth.signOut();
  if (error) alert(error);
};

export const signInUser = async (
  e: React.MouseEvent<HTMLButtonElement>,
  userDetails: { name: string | number; email: string; password: string },
  resetState: () => void
) => {
  e.preventDefault();
  if (!userDetails.email || !userDetails.password) {
    return;
  }
  try {
    const { error } = await supabase.auth.signIn({
      email: userDetails.email,
      password: userDetails.password,
    });
    if (error) throw error;
  } catch (error: any) {
    alert(error.error_description || error.message);
  } finally {
    resetState();
  }
};

export const registerNewUser = async (
  e: React.MouseEvent<HTMLButtonElement>,
  userDetails: { name: string | number; email: string; password: string },
  resetState: () => void,
  router
) => {
  e.preventDefault();
  if (!userDetails.email || !userDetails.password || !userDetails.name) {
    return;
  }
  try {
    const { user, session, error } = await supabase.auth.signUp(
      {
        email: userDetails.email,
        password: userDetails.password,
      },
      {
        data: {
          username: userDetails.name,
        },
      }
    );
    if (error) throw error;
    const profile = await supabase.from("profile").insert([
      {
        username: userDetails.name,
        uid: user.id,
        email_id: userDetails.email,
      },
    ]);

    if (user && session && profile.data) {
      router.push("/");
    }

    if (profile.error) throw profile.error;
  } catch (error: any) {
    alert(error.error_description || error.message);
  } finally {
    resetState();
  }
};

export const createChannel = async (
  e: React.KeyboardEvent<HTMLInputElement>,
  setRoomListData: () => void,
  setIsInputTrue: (i: boolean) => void
) => {
  let res;
  if (e.key === "Enter" && e.target.value && e.target.value.trim().length) {
    const { data, error } = await supabase
      .from("rooms")
      .insert({ name: e.target.value }, { returning: "minimal" });
    if (!error) {
      setRoomListData();
      res = data;
    }
    setIsInputTrue(false);
    if (error) alert(error);
  }
  return res;
};

export const addMemberToChannel = async (roomId, profileId) => {
  const { data, error } = await supabase
    .from("room_participant")
    .insert({ room_id: roomId, profile_id: profileId });
  if (error) alert(error.message);
  else alert(`The member is added to the channel successfully`);
  return data;
};
