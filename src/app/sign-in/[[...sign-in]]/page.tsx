import { SignIn } from "@clerk/nextjs";
import DemoCredentionls from "@/components/DemoCredentionls";

export default function Page() {
  return (
    <div className="flex justify-center flex-col min-h-screen dark:bg-[#323232] items-center bg-white">
      <DemoCredentionls />
      <SignIn />
    </div>
  );
}
