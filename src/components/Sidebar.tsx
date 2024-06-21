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

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { videos } = useAppSelector((state) => state.user);
  const { isSidebarVisible } = useAppSelector((state) => state.ui);

  const sidebarClass = isSidebarVisible ? "sidebar-visible" : "sidebar-hidden";

  return (
    <div
      className={`h-screen relative w-[20%] bg-white flex justify-between flex-col ${sidebarClass}`}
    >
      <div>
        <div>
          <div className="px-5 h-[12vh] flex justify-between items-center bg-white ">
            <h1 className="text-[1.5rem] text-[#1a4fba]  font-semibold">
              TubeTalk
            </h1>
            <button onClick={() => dispatch(setIsSidebarVisible(false))}>
              <FiColumns className=" h-5 w-5 text-[#6e7191]" />
            </button>
          </div>
        </div>
        <div className="hover:bg-[#eaeaea]  rounded-md mx-5 p-2">
          <button
            onClick={() => dispatch(setIsAddVideoPopup(true))}
            className="flex text-[#6e7191] font-xl justify-between w-full items-center"
          >
            <span className="font-semibold"> Add New Video </span>
            <span>
              <FiEdit3 className="h-6 w-6 " />
            </span>
          </button>
        </div>
        <div className="styled-scrollbar overflow-x-hidden">
          <ul className="flex px-3 flex-col mt-10 gap-4 w-full">
            {videos.map((video, index) => {
              return (
                <li key={index}>
                  <Link
                    href={`/chat/${video.videoId}`}
                    className={`text-start px-2 py-1 transition-all duration-200 ease-in-out rounded-md hover:bg-[#eaeaea] whitespace-nowrap overflow-x-hidden flex  item-center gap-2 text-[#6e7191]`}
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
      <div className="h-[10vh] relative bottom-0 flex items-center px-5">
        <button className="flex items-center gap-1 text-black ">
          <span className="h-6 w-6 mt-2">
            <MdCardMembership />
          </span>
          <span>Get More Tokens</span>
        </button>
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
