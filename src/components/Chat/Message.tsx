import Image from "next/image";
import { useUser } from "@clerk/nextjs";

const Message = ({
  message,
}: {
  message: {
    user: string;
    msg: string | React.JSX.Element;
  };
}) => {
  const { user } = useUser();
  return (
    <div
      className={`flex flex-row items-start gap-1 ${
        message.user === "gpt" ? "justify-start" : "justify-end"
      }`}
    >
      {message.user === "gpt" && (
        <div className="avatar mt-2">
          <div className="h-8 w-8 ">
            <Image
              src={"/img/robot.png"}
              className="object-contain mx-auto rounded-lg"
              alt="pdfGpt"
              width={25}
              height={25}
            />
          </div>
        </div>
      )}
      <div
        className={`question max-md:max-w-full flex max-w-[50%] shadow-md  py-2 px-4 rounded-lg ${
          message.user === "client"
            ? "bg-[#1a4fba] text-white"
            : "bg-white text-black"
        }`}
      >
        <p className="">{message.msg}</p>
      </div>
      {message.user === "client" && (
        <div className="avatar mt-2">
          <div className="h-8 w-8">
            <Image
              src={user?.imageUrl || "/img/avatar.png"}
              className="object-contain mx-auto rounded-full"
              alt="user"
              width={35}
              height={35}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
