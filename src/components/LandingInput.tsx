"use client";
import React, { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setIsAddVideoPopup } from "@/redux/features/ui/slice";
import { text } from "stream/consumers";

const LandingInput = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="w-full flex justify-between px-4 py-2">
      <input
        className="w-[80%] focus:outline-none text-black bg-white focus:ring-transparent"
        placeholder="Start New Conversation"
        type="text"
        name="text"
        onFocus={() => dispatch(setIsAddVideoPopup(true))}
      />

      <button
        onClick={() => dispatch(setIsAddVideoPopup(true))}
        id="sendButton"
        className="p-2"
      >
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
  );
};

export default LandingInput;
