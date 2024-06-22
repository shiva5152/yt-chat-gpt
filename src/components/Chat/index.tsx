"use client";
import { useGetChatLogQuery } from "@/redux/features/chatlog/chatApi";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import ChatLoader from "../ChatLoader";
import Loader from "../Loader";
import useChatScroll from "../hooks/useChatScroll";
import Message from "./Message";
import { setCurrentVideoId } from "@/redux/features/ui/slice";
import { useAppDispatch } from "@/redux/hooks";
import { askQuery } from "@/redux/features/user/api";

const page = ({ videoId }: { videoId: string }) => {
  const dispatch = useAppDispatch();
  const [tokens, setTokens] = useState();
  const [userText, setUserText] = useState("");
  const { data, error, isLoading } = useGetChatLogQuery(videoId);

  const [chatLog, setChatLog] = useState<
    { user: string; msg: string | React.JSX.Element }[]
  >([]);

  const chatContainerRef = useChatScroll(chatLog);

  const handleSubmit = async () => {
    if (userText === "") return;
    setChatLog((prev) => [...prev, { user: "client", msg: userText }]);
    setChatLog((prev) => [...prev, { user: "gpt", msg: <ChatLoader /> }]);
    setUserText("");
    const res = await askQuery(`/chat/${videoId}?query=${userText}`, dispatch);

    setChatLog((prev) => [
      ...prev.slice(0, -1),
      {
        user: "gpt",
        msg: res.success ? res.response : res,
      },
    ]);
  };

  const handleEnterKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  useEffect(() => {
    if (!isLoading && !error && data) {
      setChatLog(
        data.chatLog.flatMap((obj: any) => [
          { user: "client", msg: obj.query },
          { user: "gpt", msg: obj.gptReply },
        ])
      );
    }
  }, [isLoading]);

  useEffect(() => {
    dispatch(setCurrentVideoId(videoId));
    return () => {
      dispatch(setCurrentVideoId(""));
    };
  }, []);

  return (
    <section
      style={{ height: "calc(100vh - 10vh)" }}
      className=" w-full bg-[#f2f8fd] items-center justify-between   flex flex-col "
    >
      <div
        ref={chatContainerRef}
        style={{ scrollBehavior: "smooth" }}
        className="max-md:px-2 max-md:mt-0 styled-scrollbar px-20 py-6 overflow-x-hidden flex flex-col gap-3 w-[100%] mt-4 "
      >
        {isLoading ? (
          <div className="h-full flex gap-5 mt-20 flex-col justify-center items-center">
            <Loader />
          </div>
        ) : chatLog?.length > 0 ? (
          chatLog.map((obj, index) => <Message key={index} message={obj} />)
        ) : (
          <div className="h-full fade-in flex gap-5 mt-20 flex-col justify-center items-center">
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

      <div className="w-full pt-2 max-md:px-2 max-md:py-0">
        <div className=" max-md:w-full max-md:mb-2 align-bottom rounded-[20px] bg-white shadow-md  w-[50%] mx-auto p-1 mb-5">
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

export default page;
