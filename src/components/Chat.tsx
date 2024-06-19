"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import ChatLoader from "./ChatLoader";
import useChatScroll from "./hooks/useChatScroll";
import { useUser } from "@clerk/nextjs";

const ChatMessage = ({ message }: { message: any }) => {
  const { user } = useUser();
  return (
    <div
      className={`flex flex-row items-start gap-1 ${
        message.user === "gpt" ? "justify-start" : "justify-end"
      }`}
    >
      {message.user === "gpt" && (
        <div className="avatar mt-2">
          {/* <div className="h-6 w-6 bg-green-500 rounded-full mr-7"></div> */}
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
        className={`question flex max-w-[50%] shadow-md  py-2 px-4 rounded ${
          message.user === "client"
            ? "bg-[#1a4fba] text-white"
            : "bg-white text-black"
        }`}
      >
        <p className="">{message.msg}</p>
      </div>
      {message.user === "client" && (
        <div className="avatar mt-2">
          {/* <div className="h-6 w-6 bg-green-500 rounded-full mr-7"></div> */}
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
interface ChildProps {
  setTokens: React.Dispatch<React.SetStateAction<any>>;
}
//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
const page = ({ videoId }: { videoId: string }) => {
  const [tokns, setTokens] = useState();
  const [userText, setUserText] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatLog, setChatLog] = useState<
    { user: string; msg: string | React.JSX.Element }[]
  >([]);
  const chatContainerRef = useChatScroll(chatLog);

  const handleSubmit = async () => {
    if (userText === "") return;
    setChatLog((prev) => [
      ...prev,
      { user: "client", msg: userText },
      // { userMessage: userText, gptResponse: res.result.text },
    ]);
    setChatLog((prev) => [
      ...prev,
      { user: "gpt", msg: <ChatLoader /> },
      // { userMessage: userText, gptResponse: res.result.text },
    ]);
    setUserText("");
    console.log(userText);
    setLoading(true); //_0D5lXDjNpw
    const res = await postData(`/api/chat/${videoId}?query=${userText}`);
    // setTokens(res.token_count);
    console.log(res);

    setLoading(false);

    setChatLog((prev) => [
      ...prev.slice(0, -1),
      { user: "gpt", msg: res.response },
      // { userMessage: userText, gptResponse: res.result.text },
    ]);
  };

  useEffect(() => {
    getChatLog(videoId).then((data) => {
      setChatLog(
        data.chatLog.flatMap((obj: any) => [
          { user: "client", msg: obj.query },
          { user: "gpt", msg: obj.gptReply },
        ])
      );
    });
  }, [videoId]);

  const router = useRouter();
  const handleEnterKeyPress = (event: any) => {
    if (event.key === "Enter") {
      // The "Enter" key was pressed
      handleSubmit();
    }
  };

  // useEffect(() => {
  //   // router.push("/login");
  // }, []);

  return (
    <section
      style={{ height: "calc(100vh - 12vh)" }}
      className=" w-full bg-[#f2f8fd] items-center justify-between   flex flex-col "
    >
      <div
        ref={chatContainerRef}
        style={{ scrollBehavior: "smooth" }}
        className="styled-scrollbar px-20 py-6 overflow-x-hidden flex flex-col gap-3 w-[100%] mt-4 "
      >
        {chatLog?.length > 0 ? (
          chatLog.map((obj, index) => {
            return <ChatMessage key={index} message={obj} />;
          })
        ) : (
          <div className="h-full flex gap-5 mt-20 flex-col justify-center items-center">
            <div>
              <Image
                src="/img/light-bulb.png"
                alt="light-bulb"
                width={100}
                height={100}
              />
            </div>
            <p className="text-[#6e7191]">
              Start the conversation now! Ask TubeTalk anything about the video.
            </p>
          </div>
        )}
      </div>

      <div className="w-full pt-2">
        <div className=" align-bottom rounded-[20px] bg-white shadow-md  w-[50%] mx-auto p-1 mb-5">
          <div className="w-full flex justify-between px-4 py-2">
            <input
              className="w-[80%] focus:outline-none text-black bg-white focus:ring-transparent"
              placeholder="Ask the Shiller"
              type="text"
              name="text"
              value={userText}
              onKeyDown={handleEnterKeyPress}
              onChange={(e) => setUserText(e.target.value)}
              id="questionInput"
            />

            <button onClick={handleSubmit} id="sendButton" className="p-2">
              <svg
                stroke="#272d34"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 mr-1"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const postData = async (url: string) => {
  try {
    const response = await fetch(url);

    const responseData = await response.json();
    console.log(responseData, "responseData");
    return responseData;
  } catch (error) {
    if (error instanceof Error && error.message.includes("429")) {
      alert("Rate limit, 2 queries per minute only.");
    }
    console.error("Error:", error);
    throw error;
  }
};

const getChatLog = async (videoId: string) => {
  try {
    const response = await fetch(`/api/chat?videoId=${videoId}`);
    const data = await response.json();
    console.log(data, "data");
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
export default page;
