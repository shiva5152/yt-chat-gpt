"use client";
import { FiYoutube } from "react-icons/fi";
import { MdGeneratingTokens } from "react-icons/md";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useAuth, SignedIn, UserButton, useUser } from "@clerk/nextjs";
import { FiColumns } from "react-icons/fi";
import { setIsSidebarVisible } from "@/redux/features/ui/slice";

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
    <nav className="h-[12vh] px-10 text-black  bg-[#f2f8fd] flex justify-between items-center">
      {!isSidebarVisible ? (
        <div className=" flex gap-5 items-center">
          <h1 className="text-[1.5rem] text-[#1a4fba]  font-semibold">
            TubeTalk
          </h1>
          <button onClick={() => dispatch(setIsSidebarVisible(true))}>
            <FiColumns className=" h-5 w-5 text-[#6e7191]" />
          </button>
        </div>
      ) : null}
      <div>
        {title ? (
          <div className="font-semibold text-lg flex  items-center gap-2">
            <span>
              <FiYoutube />
            </span>
            <span>{title}</span>
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
              <span className=" font-bold">{tokenLeft}</span> Tokens left
            </p>
          </div>
        </div>
        <div className="h-8 w-8">
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
