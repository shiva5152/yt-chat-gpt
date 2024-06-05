"use client";
import Image from "next/image";
import ThemeSwitch from "@/components/ThemeSwitch";
import Sidebar from "@/components/Sidebar";
import Chat from "@/components/Chat";
import Navbar from "@/components/Navbar";
import AddVideo from "@/components/AddVideo";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isAddVideo, setAddVideo] = useState(false);
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  if (!isSignedIn && isLoaded) {
    router.push("/sign-up");
    return;
  }

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
