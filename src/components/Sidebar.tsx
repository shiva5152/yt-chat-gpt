"use client";
import React from "react";
import { FiColumns, FiEdit3, FiYoutube } from "react-icons/fi";
import { MdCardMembership } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setIsAddVideoPopup,
  setIsSidebarVisible,
} from "@/redux/features/ui/slice";
import Link from "next/link";
import { notifySuccess } from "@/utils/toast";
import { useAuth, SignedIn, UserButton, useUser } from "@clerk/nextjs";
import useWindowSize from "./hooks/useWindowSize";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { videos } = useAppSelector((state) => state.user);
  const { width } = useWindowSize();
  const { isSidebarVisible, currentVideoId } = useAppSelector(
    (state) => state.ui
  );
  const { user } = useUser();

  const sidebarClass = isSidebarVisible ? "sidebar-visible" : "sidebar-hidden";
  const handleGetMoreToken = () => {
    console.log("Get More Tokens");
    return notifySuccess("Soon we are Adding paid plans. Stay Tuned!");
  };

  const handleAddVideo = () => {
    dispatch(setIsAddVideoPopup(true));
    width < 768 && dispatch(setIsSidebarVisible(false));
  };
  return (
    <div
      onClick={() => dispatch(setIsSidebarVisible(false))}
      className={`max-md:absolute max-sm:z-10 full-window-height max-md:w-[35%] backdrop-blur-[5px] max-sm:w-full relative w-[20%] ${sidebarClass}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`full-window-height w-full max-sm:w-[80%] bg-white shadow-md flex justify-between flex-col`}
      >
        <div>
          <div>
            <div className="px-5 h-[10vh] flex justify-between items-center bg-white ">
              <Link href="/">
                <h1 className="text-[1.5rem] text-[#1a4fba]  font-semibold">
                  TubeTalk
                </h1>
              </Link>
              <button onClick={() => dispatch(setIsSidebarVisible(false))}>
                <FiColumns className=" h-5 w-5 text-[#6e7191]" />
              </button>
            </div>
          </div>
          <div className="bg-[#eaeaea]  rounded-md mx-3 py-2 px-3">
            <button
              onClick={handleAddVideo}
              className="flex text-[#6e7191] font-xl justify-between w-full items-center"
            >
              <span className="font-semibold"> Add New Video </span>
              <span>
                <FiEdit3 className="h-6 w-6 " />
              </span>
            </button>
          </div>
          <div className="styled-scrollbar overflow-x-hidden">
            <ul className="max-md:gap-1 flex px-3 flex-col mt-10 gap-2 w-full">
              {videos.map((video, index) => {
                return (
                  <li key={index}>
                    <Link
                      onClick={() =>
                        width < 768 ? dispatch(setIsSidebarVisible(false)) : {}
                      }
                      title={video.title}
                      href={`/chat/${video.videoId}`}
                      className={`${
                        currentVideoId == video.videoId && "bg-[#eaeaea]"
                      } text-start px-3 text-md py-2 transition-all duration-200 ease-in-out rounded-md hover:bg-[#eaeaea] whitespace-nowrap overflow-x-hidden flex  item-center gap-2 text-[#6e7191]`}
                    >
                      <span className="mt-1">
                        <FiYoutube />
                      </span>
                      <span>{video.title.slice(0, 30)}...</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="h-[12vh] max-md:flex-col max:md:gap-3 relative bottom-0 flex  px-5">
          <div className="md:hidden w-full  flex items-center gap-4 h-8">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <span className="text-black ">{user?.fullName}</span>
          </div>
          <button
            onClick={handleGetMoreToken}
            className="flex items-center gap-1 text-black "
          >
            <span className="h-6 w-6 mt-2">
              <MdCardMembership />
            </span>
            <span>Get More Tokens</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

const chats = [
  {
    id: 1,
    title:
      "In C++, pointers are variables that store the memory address of another variable",
  },
  {
    id: 2,
    title: " the memory address of another variable",
  },
  {
    id: 3,
    title:
      " Pointers are powerful but can be tricky to use, so it's important to un",
  },
  {
    id: 4,
    title:
      " Pointers are powerful but can be tricky to use, so it's important to un",
  },
];
