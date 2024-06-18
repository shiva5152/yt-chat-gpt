"use client";
import AddVideo from "@/components/AddVideo";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { notifyError } from "@/utils/toast";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ChatProvider = ({ children }: { children: React.ReactNode }) => {
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
    console.log(user, "user in route");

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
          <Sidebar />
          <div className="flex flex-col w-full">
            <Navbar />
            {/* <Chat /> */}
            {children}
            {isAddVideo && <AddVideo />}
          </div>
        </>
      )}
    </main>
  );
};

export default ChatProvider;
