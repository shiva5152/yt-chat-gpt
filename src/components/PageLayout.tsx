"use client";
import AddVideo from "@/components/AddVideo";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { getUser } from "@/redux/features/user/api";

type TParams = {
  videoId: string;
};

const PageLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params?: TParams;
}) => {
  const videoId = params?.videoId;
  const { isLoaded, isSignedIn } = useAuth();
  const dispatch = useAppDispatch();
  const { isAddVideoPopup, isSidebarVisible } = useAppSelector(
    (state) => state.ui
  );
  const { tokenLeft, videos } = useAppSelector((state) => state.user);
  const currentVideo = videos.find((video) => video.videoId === videoId);

  //   const router = useRouter();
  //   if (!isSignedIn && isLoaded) {
  //     router.push("/sign-up");
  //     return;
  //   }
  const chatClass = isSidebarVisible ? "chat-collapsed" : "chat-expanded";

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
          <div className={`flex flex-col w-full ${chatClass}`}>
            <Navbar tokenLeft={tokenLeft} title={currentVideo?.title} />
            {children}
            {isAddVideoPopup && <AddVideo />}
          </div>
        </>
      )}
    </main>
  );
};

export default PageLayout;
