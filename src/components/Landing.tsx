import React from "react";
import Image from "next/image";

const Landing = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div>
        <Image src="/img/chat.png" alt="landing" width={100} height={100} />
      </div>
      <p className="text-center text-[#6e7191] w-[65%] mt-10">
        Welcome to TubeTalk Elevate your YouTube experience with our AI-powered
        chat, offering insightful conversations based on the video content. Dive
        into deeper discussions, get instant clarifications, and enjoy a smarter
        way to engage with your favorite videos.
      </p>
      <div className=" align-bottom mt-16  rounded-[20px] bg-white shadow-md  w-[50%] mx-auto p-1 mb-5">
        <div className="w-full flex justify-between px-4 py-2">
          <input
            className="w-[80%] focus:outline-none text-black bg-white focus:ring-transparent"
            placeholder="Start New Conversation"
            type="text"
            name="text"
            //   value={userText}
            //   onKeyDown={handleEnterKeyPress}
            //   onChange={(e) => setUserText(e.target.value)}
          />

          <button onClick={() => {}} id="sendButton" className="p-2">
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
  );
};

export default Landing;
