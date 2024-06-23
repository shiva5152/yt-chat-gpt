"use client";
import AddVideo from "@/components/AddVideo";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { getUser } from "@/redux/features/user/api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import useDocumentHeight from "./hooks/useDocHeight";
import useWindowSize from "./hooks/useWindowSize";
import { setIsSidebarVisible } from "@/redux/features/ui/slice";

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
  useDocumentHeight();
  const { width } = useWindowSize();
  const videoId = params?.videoId;
  const { isLoaded } = useAuth();
  const dispatch = useAppDispatch();
  const { isAddVideoPopup, isSidebarVisible } = useAppSelector(
    (state) => state.ui
  );
  const { tokenLeft, videos } = useAppSelector((state) => state.user);
  const currentVideo = videos.find((video) => video.videoId === videoId);

  const chatClass = isSidebarVisible ? "chat-collapsed" : "chat-expanded";

  useEffect(() => {
    getUser(dispatch);
  }, []);
  useEffect(() => {
    width > 768 && dispatch(setIsSidebarVisible(true));
  }, [width]);
  return (
    <main className="h-full flex bg-[#f2f8fd]">
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
