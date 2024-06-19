"use client";
import AddVideo from "@/components/AddVideo";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Landing from "@/components/Landing";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { getUser } from "@/redux/features/user/api";

const ChatProvider = () => {
  const { isAddVideoPopup } = useAppSelector((state) => state.ui);
  const { tokenLeft } = useAppSelector((state) => state.user);

  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const dispatch = useAppDispatch();

  const router = useRouter();
  if (!isSignedIn && isLoaded) {
    router.push("/sign-up");
    return;
  }
  useEffect(() => {
    getUser(dispatch);
  }, []);

  return (
    <main className="min-h-screen flex bg-[#f2f8fd]">
      {!isLoaded ? (
        <div className="text-black">Loading...</div>
      ) : (
        <>
          <Sidebar />
          <div className="flex flex-col w-full">
            <Navbar tokenLeft={tokenLeft} />
            <Landing />
            {isAddVideoPopup && <AddVideo />}
          </div>
        </>
      )}
    </main>
  );
};

export default ChatProvider;
