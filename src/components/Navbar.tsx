"use client";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { FiYoutube } from "react-icons/fi";
import { MdGeneratingTokens } from "react-icons/md";
import {
  SignOutButton,
  useAuth,
  SignedIn,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { useEffect } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const auth = useAuth();
  const { user } = useUser();
  console.log(auth, "auth");
  console.log(user, "user");

  useEffect(() => {
    const fetchUser = async () => {
      console.log(user);
    };
    fetchUser();
  }, []);

  return (
    <nav className="h-[12vh] w-full px-10 text-black  bg-[#f2f8fd] flex justify-between items-center">
      <div className="font-semibold text-lg flex  items-center gap-2">
        <span>
          <FiYoutube />
        </span>
        <span>What is Abstract Aljebra...</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="gap-1 p-2 rounded-md flex items-center bg-[#eaeaea] ">
          <div className="h-fit">
            <MdGeneratingTokens className="h-8 w-8 text-black" />
          </div>
          <div className="flex flex-col ">
            <p className="text-[0.7rem] -mt-[3px] text-black">
              <span className=" font-bold">3000</span> Tokens left
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
