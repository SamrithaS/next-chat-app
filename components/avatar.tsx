const Avatar = ({ Name, bgColor}: { Name: string, bgColor?: string }) => {
  return (
      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-500 " style = {{backgroundColor: bgColor}}>
        <p className="font-normal text-2xl leading-none text-white flex h-6">
          {Name[0].toUpperCase()}
        </p>
      </div>
  );
};

export default Avatar;
