"use client";
import Image from "next/image";
import { useEffect } from "react";
import ThemeSwitch from "@/components/ThemeSwitch";
import Sidebar from "@/components/Sidebar";
import Chat from "@/components/Chat";
import Navbar from "@/components/Navbar";
import AddVideo from "@/components/AddVideo";
import { useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { notifyError } from "@/utils/toast";

export default function Home() {
  const [isAddVideo, setAddVideo] = useState(false);
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();

  const router = useRouter();
  if (!isSignedIn && isLoaded) {
    router.push("/sign-up");
    return;
  }

  useEffect(() => {
    const isUserExit = JSON.parse(localStorage.getItem("isUserExit") || "0");

    if (!isUserExit && user) {
      const addUser = async () => {
        try {
          const response = await fetch("/api/user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: user.primaryEmailAddress?.emailAddress,
              userId: user.id,
            }),
          });

          const data = await response.json();
          console.log(data);
          localStorage.setItem("isUserExit", "1");
        } catch (error: any) {
          console.log(error);
          notifyError(error.message);
        }
      };
      addUser();
    }
  }, [user]);

  return (
    <main className="min-h-screen flex bg-[#f2f8fd]">
      {!isLoaded ? (
        <div>Loading...</div>
      ) : (
        <>
          <Sidebar setAddVideo={setAddVideo} />
          <div className="flex flex-col w-full">
            <Navbar />
            <Chat />
            {isAddVideo && <AddVideo setAddVideo={setAddVideo} />}
          </div>
        </>
      )}
    </main>
  );
}
