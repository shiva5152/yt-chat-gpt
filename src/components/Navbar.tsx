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
import { SignedOut } from "@clerk/nextjs";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  return (
    <nav className="h-[12vh] w-full px-10 text-black  bg-[#f2f8fd] flex justify-between items-center">
      <div className="font-semibold text-lg flex  items-center gap-2">
        <span>
          <FiYoutube />
        </span>
        <span>What is Abstract Aljebra...</span>
      </div>
      <div className="flex items-center">
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
        <Menu as="div" className="relative ml-3">
          <div>
            <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Open user menu</span>
              <img
                className="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </MenuButton>
          </div>
          <Transition
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <MenuItem>
                {({ focus }) => (
                  <a
                    href="#"
                    className={classNames(
                      focus ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700"
                    )}
                  >
                    Your Profile
                  </a>
                )}
              </MenuItem>
              <MenuItem>
                {({ focus }) => (
                  <a
                    href="#"
                    className={classNames(
                      focus ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700"
                    )}
                  >
                    Settings
                  </a>
                )}
              </MenuItem>
              <MenuItem>
                {({ focus }) => (
                  // <a
                  //   href="#"
                  //   className={classNames(
                  //     focus ? "bg-gray-100" : "",
                  //     "block px-4 py-2 text-sm text-gray-700"
                  //   )}
                  // >

                  // </a>
                  <SignedOut />
                )}
              </MenuItem>
            </MenuItems>
          </Transition>
        </Menu>
      </div>
    </nav>
  );
};

export default Navbar;
