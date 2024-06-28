import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center min-h-screen dark:bg-[#323232] items-center bg-white">
      <SignIn />
    </div>
  );
}
