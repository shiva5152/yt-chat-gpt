"use client";
import { FiYoutube } from "react-icons/fi";
import { MdGeneratingTokens } from "react-icons/md";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useAuth, SignedIn, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { FiColumns, FiEdit3 } from "react-icons/fi";
import {
  setIsSidebarVisible,
  setIsAddVideoPopup,
} from "@/redux/features/ui/slice";

const Navbar = ({
  title,
  tokenLeft,
}: {
  title?: string;
  tokenLeft: number;
}) => {
  const dispatch = useAppDispatch();
  const { isSidebarVisible } = useAppSelector((state) => state.ui);
  return (
    <nav className="max-md:px-2  h-[10vh] px-10 text-black  bg-[#f2f8fd] flex justify-between items-center">
      {!isSidebarVisible ? (
        <div className=" flex gap-5 items-center">
          <Link href="/">
            <h1 className="text-[1.5rem] text-[#1a4fba]  font-semibold">
              TubeTalk
            </h1>
          </Link>
          <button onClick={() => dispatch(setIsSidebarVisible(true))}>
            <FiColumns className=" h-5 w-5 text-[#6e7191]" />
          </button>
          <button
            onClick={() => dispatch(setIsAddVideoPopup(true))}
            className="flex text-[#6e7191] font-xl justify-between w-full items-center"
          >
            <span>
              <FiEdit3 className="h-6 w-6 " />
            </span>
          </button>
        </div>
      ) : null}
      <div>
        {title ? (
          <div className="max-md:hidden font-semibold text-lg flex  items-center gap-2">
            <span>
              <FiYoutube />
            </span>
            <span title={title}>{title.split("|")[0]}</span>
          </div>
        ) : null}
      </div>
      <div className="flex items-center gap-3">
        <div className="gap-1 p-2 rounded-md flex items-center bg-[#eaeaea] ">
          <div className="h-fit">
            <MdGeneratingTokens className="h-8 w-8 text-black" />
          </div>
          <div className="flex flex-col ">
            <p className="text-[0.7rem] -mt-[3px] text-black">
              <span
                className={`font-bold ${tokenLeft <= 1000 && "text-red-500"}`}
              >
                {tokenLeft}
              </span>{" "}
              Tokens left
            </p>
          </div>
        </div>
        <div className="max-md:hidden h-8 w-8">
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
