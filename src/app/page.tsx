"use client";
import AddVideo from "@/components/AddVideo";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { notifyError } from "@/utils/toast";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Landing from "@/components/Landing";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { getUser } from "@/redux/features/user/api";

const ChatProvider = () => {
  const { isAddVideoPopup } = useAppSelector((state) => state.ui);
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const dispatch = useAppDispatch();

  const router = useRouter();
  if (!isSignedIn && isLoaded) {
    router.push("/sign-up");
    return;
  }

  // useEffect(() => {
  //   const isUserExit = JSON.parse(localStorage.getItem("isUserExit") || "0");
  //   console.log(user, "user in route");

  //   if (!isUserExit && user) {
  //     const addUser = async () => {
  //       try {
  //         const response = await fetch("/api/user", {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             email: user.primaryEmailAddress?.emailAddress,
  //             userId: user.id,
  //           }),
  //         });

  //         const data = await response.json();
  //         console.log(data);
  //         localStorage.setItem("isUserExit", "1");
  //       } catch (error: any) {
  //         console.log(error);
  //         notifyError(error.message);
  //       }
  //     };
  //     addUser();
  //   }
  // }, [user]);

  useEffect(() => {
    getUser(dispatch);
  }, []);

  return (
    <main className="min-h-screen flex bg-[#f2f8fd]">
      {!isLoaded ? (
        <div>Loading...</div>
      ) : (
        <>
          <Sidebar />
          <div className="flex flex-col w-full">
            <Navbar />
            <Landing />
            {isAddVideoPopup && <AddVideo />}
          </div>
        </>
      )}
    </main>
  );
};

export default ChatProvider;
