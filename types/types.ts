export type userType = {
  user_metadata: { username: string };
  id: string;
};

export type MessageType = {
  content: string;
  username: string;
  profile_id: string;
};

export type RoomType = {
  name: string;
  id: string;
};

export type ProfileType = {
  id: string;
  username: string;
  uid: string;
  email_id: string;
};
