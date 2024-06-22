import React from "react";
import Image from "next/image";
import LandingInput from "./LandingInput";

const Landing = () => {
  return (
    <div className="flex h-full max-md:justify-between px-2 w-full flex-col items-center justify-center">
      <div className="flex h-full px-2 w-full flex-col items-center justify-center">
        <div>
          <Image src="/img/chat.png" alt="landing" width={75} height={75} />
        </div>
        <p className="max-md:w-full  text-center text-[#6e7191] w-[65%] mt-10">
          Welcome to TubeTalk Elevate your YouTube experience with our
          AI-powered chat, offering insightful conversations based on the video
          content. Dive into deeper discussions, get instant clarifications, and
          enjoy a smarter way to engage with your favorite videos.
        </p>
      </div>
      <div className="max-md:w-full max-md:mb-2 align-bottom mt-16  rounded-[20px] bg-white shadow-md  w-[50%] mx-auto p-1 mb-5">
        <LandingInput />
      </div>
    </div>
  );
};

export default Landing;
