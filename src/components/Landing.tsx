import React from "react";
import Image from "next/image";
import LandingInput from "./LandingInput";

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
        <LandingInput />
      </div>
    </div>
  );
};

export default Landing;
