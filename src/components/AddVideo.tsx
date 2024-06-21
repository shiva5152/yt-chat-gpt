"use client";
import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { notifyError, notifyInfo } from "@/utils/toast";
import { MdOutlineIntegrationInstructions } from "react-icons/md";
import { extractYouTubeVideoID, isYouTubeVideoLink } from "@/helpers/helper";
import { useAppDispatch } from "@/redux/hooks";
import { setIsAddVideoPopup } from "@/redux/features/ui/slice";
import { addVideoToPinecone } from "@/redux/features/user/api";
import { useRouter } from "next/navigation";

import Loader from "./Loader";
const AddVideo = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error) setError("");
    setLink(e.target.value);
  };

  const handleSubmit = async () => {
    if (!isYouTubeVideoLink(link)) {
      setError("Invalid YouTube video link.");
      return;
    }
    setLoading(true);
    const videoId = extractYouTubeVideoID(link);
    if (!videoId) {
      notifyError("Invalid YouTube video link.");
      setLoading(false);
      return;
    }
    const response = await addVideoToPinecone(videoId);
    if (response.success) {
      notifyInfo("Video added successfully");
      dispatch(setIsAddVideoPopup(false));
      router.push(`/chat/${videoId}`);
    } else {
      notifyError(response?.message || "Something went wrong try again.");
    }
    setLoading(false);
  };

  return (
    <div className=" h-screen transition-all duration-500 ease-in-out fixed inset-0 backdrop-blur-[5px] w-full  flex justify-center items-center">
      <div className="flex relative border-[1px] border-[#d3d3d3] p-10 rounded-lg bg-white justify-center items-center">
        <div className="absolute top-5 right-5">
          <button onClick={() => dispatch(setIsAddVideoPopup(false))}>
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
          <div className="text-[#6e7191]">
            <h4 className="flex items-center gap-2 text-lg mb-4">
              <span>
                <MdOutlineIntegrationInstructions />
              </span>
              <span>Instructions</span>
            </h4>
            <p>*Currently, we offer support in English.</p>
            <p>*The video should be around 10 minutes or less.</p>
          </div>
          <input
            type="text"
            value={link}
            className="w-full rounded-[20px] px-4 py-2  bg-gray-100 focus:ring  text-black  focus:blue-500 focus:outline-none"
            placeholder="video url"
            onChange={handleLink}
          />
          {error ? <p className="text-red-500">{error}</p> : null}
          <button
            type="submit"
            disabled={loading}
            onClick={handleSubmit}
            className="text-white h-10 w-[12rem] flex justify-center items-center bg-[#1a4fba] rounded-[20px] px-4 py-2  "
          >
            {loading ? <Loader /> : "Start Conversation"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddVideo;
