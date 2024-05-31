"use client";
import Image from "next/image";
import ThemeSwitch from "@/components/ThemeSwitch";
import Sidebar from "@/components/Sidebar";
import Chat from "@/components/Chat";
import Navbar from "@/components/Navbar";
import AddVideo from "@/components/AddVideo";
import { useState } from "react";

export default function Home() {
  const [isAddVideo, setAddVideo] = useState(false);
  return (
    <main className="min-h-screen flex bg-[#f2f8fd]">
      <Sidebar setAddVideo={setAddVideo} />
      <div className="flex flex-col w-full">
        <Navbar />
        <Chat />
        {isAddVideo && <AddVideo setAddVideo={setAddVideo} />}
      </div>
    </main>
  );
}
