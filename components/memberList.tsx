import { ProfileType } from "../types/types";

const MemberList = ({
  selectedRoom,
  profiles,
  memberList,
}: {
  selectedRoom: string;
  profiles: ProfileType[];
  memberList: any;
}) => {
  return (
    <>
      {memberList.length && profiles.length ? (
        <div className="absolute left-0 bg-white p-3 w-full rounded-b-md shadow-sm top-8 right-0 min-w-max outline-none cursor-auto">
          <ul>
            {memberList.map((member: { profile_id: string }, id: number) => {
              return (
                <li
                  className="text-left text-sm font-medium text-gray-500 capitalize pb-2"
                  key={id}
                >
                  {
                    profiles.filter((i) => i.uid === member.profile_id)?.[0]
                      ?.username
                  }
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default MemberList;
