import React from "react";
import PageLayout from "@/components/PageLayout";
import Chat from "@/components/Chat";

type TParams = {
  videoId: string;
};

const page = ({ params }: { params: TParams }) => {
  return (
    <PageLayout params={params}>
      <Chat videoId={params.videoId} />
    </PageLayout>
  );
};

export default page;
