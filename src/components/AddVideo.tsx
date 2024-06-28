"use client";
import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { notifyError, notifyInfo, notifySuccess } from "@/utils/toast";
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
      notifySuccess("Video added successfully");
      dispatch(setIsAddVideoPopup(false));
      router.push(`/chat/${videoId}`);
    } else {
      notifyError(response?.message || "Something went wrong try again.");
    }
    setLoading(false);
  };

  return (
    <div
      onClick={() => dispatch(setIsAddVideoPopup(false))}
      className=" h-screen transition-all z-20 duration-500 ease-in-out fixed inset-0 backdrop-blur-[5px] w-full  flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-md:flex-col max-md:gap-4 max-md:px-4 max-md:mx-1 flex relative border-[1px] dark:border-[#a8a8a8] border-[#d3d3d3] p-10 rounded-lg dark:bg-[#323232]  bg-white justify-center items-center"
      >
        <div className="max-md:top-2 max-md:right-2 absolute top-5 right-5">
          <button onClick={() => dispatch(setIsAddVideoPopup(false))}>
            <IoCloseOutline className="h-6 w-6 text-black dark:text-[#a8a8a8]" />
          </button>
        </div>
        <div className="max-md:w-full">
          <iframe
            className="max-md:w-full max-md:h-auto h-[339px] w-[600px] aspect-video"
            src={`https://www.youtube.com/embed/${extractYouTubeVideoID(link)}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        </div>
        <div className="max-md:px-0 flex justify-end h-full gap-5 flex-col px-5">
          <div className="text-[#6e7191] dark:text-[#a8a8a8]">
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
            className="w-full rounded-[20px] px-4 py-2  dark:text-[#555555] bg-gray-100 focus:ring  text-black  focus:blue-500 focus:outline-none"
            placeholder="video url"
            onChange={handleLink}
          />
          {error ? <p className="text-red-500">{error}</p> : null}
          <button
            type="submit"
            disabled={loading}
            onClick={handleSubmit}
            className="text-white h-10 w-[12rem] flex justify-center items-center bg-[#5f4dec] rounded-[20px] px-4 py-2  "
          >
            {loading ? <Loader /> : "Start Conversation"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddVideo;
