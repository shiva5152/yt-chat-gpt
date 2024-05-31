"use client";
import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { notifyError } from "@/utils/toast";
const AddVideo = ({
  setAddVideo,
}: {
  setAddVideo: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [link, setLink] = useState("");
  function extractYouTubeVideoID(url: string) {
    const regex = /[?&]v=([^&#]*)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/transcript", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: link }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log(result, "result");
    } catch (err) {
      console.log(err, "err");
      // notifyError(err.message);
    }
  };
  return (
    <div className=" h-screen transition-all duration-500 ease-in-out fixed inset-0 backdrop-blur-[5px] w-full  flex justify-center items-center">
      <div className="flex relative p-10 rounded-lg bg-[#eaeaea] justify-center items-center">
        <div className="absolute top-5 right-5">
          <button onClick={() => setAddVideo(false)}>
            <IoCloseOutline className="h-6 w-6 text-black" />
          </button>
        </div>
        <div>
          <iframe
            width="600"
            height="339"
            src={`https://www.youtube.com/embed/${extractYouTubeVideoID(link)}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        </div>
        <div className="flex justify-end h-full gap-5 flex-col px-5">
          <input
            type="text"
            value={link}
            className="w-full rounded-[20px] px-4 py-2 focus:outline-none text-black bg-white focus:ring-transparent"
            placeholder="video url"
            onChange={(e) => setLink(e.target.value)}
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="text-white bg-[#1a4fba] mx-auto rounded-[20px] px-4 py-2 w-fit  "
          >
            Start Conversation
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddVideo;
