import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center bg-white min-h-screen">
      <SignUp />
    </div>
  );
}
