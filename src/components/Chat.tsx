"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import ChatLoader from "./ChatLoader";
import useChatScroll from "./hooks/useChatScroll";

const ChatMessage = ({ message }: { message: any }) => {
  return (
    <div
      className={`flex flex-row items-start gap-1 ${
        message.user === "gpt" ? "justify-start" : "justify-end"
      }`}
    >
      {message.user === "gpt" && (
        <div className="avatar mt-2">
          {/* <div className="h-6 w-6 bg-green-500 rounded-full mr-7"></div> */}
          <div className="h-8 w-8 ">
            <Image
              src={"/img/robot.png"}
              className="object-contain mx-auto rounded-lg"
              alt="pdfGpt"
              width={25}
              height={25}
            />
          </div>
        </div>
      )}
      <div
        className={`question flex max-w-[50%] shadow-md  py-2 px-4 rounded ${
          message.user === "client"
            ? "bg-[#1a4fba] text-white"
            : "bg-white text-black"
        }`}
      >
        <p className="">{message.msg}</p>
      </div>
      {message.user === "client" && (
        <div className="avatar mt-2">
          {/* <div className="h-6 w-6 bg-green-500 rounded-full mr-7"></div> */}
          <div className="h-8 w-8">
            <Image
              src={"/img/avatar.png"}
              className="object-contain mx-auto rounded-lg"
              alt="user"
              width={35}
              height={35}
            />
          </div>
        </div>
      )}
    </div>
  );
};
interface ChildProps {
  setTokens: React.Dispatch<React.SetStateAction<any>>;
}
//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
const page = () => {
  const [tokns, setTokens] = useState();
  const [userText, setUserText] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatLog, setChatLog] = useState<
    { user: string; msg: string | React.JSX.Element }[]
  >([
    {
      user: "client",
      msg: "How are you.",
    },
    {
      user: "gpt",
      msg: "How i can help you.",
    },
    {
      user: "client",
      msg: "how to write pointers in cpp",
    },
    {
      user: "gpt",
      msg: "In C++, pointers are variables that store the memory address of another variable. Pointers are powerful but can be tricky to use, so it's important to understand the basics of how to declare, initialize, and use them. Here’s a step-by-step guide on how to work with pointers in C++:.",
    },
    {
      user: "client",
      msg: "give me an example",
    },
    {
      user: "gpt",
      msg: "This example demonstrates pointer declaration, initialization, pointer arithmetic, using pointers with arrays, and dynamic memory allocation. Understanding these basics will help you effectively use pointers in C++.",
    },
    {
      user: "gpt",
      msg: "This example demonstrates pointer declaration, initialization, pointer arithmetic, using pointers with arrays, and dynamic memory allocation. Understanding these basics will help you effectively use pointers in C++.",
    },
    {
      user: "client",
      msg: "give me an example",
    },
    {
      user: "gpt",
      msg: "This example demonstrates pointer declaration, initialization, pointer arithmetic, using pointers with arrays, and dynamic memory allocation. Understanding these basics will help you effectively use pointers in C++.",
    },
    {
      user: "gpt",
      msg: "This example demonstrates pointer declaration, initialization, pointer arithmetic, using pointers with arrays, and dynamic memory allocation. Understanding these basics will help you effectively use pointers in C++.",
    },
  ]);
  const chatContainerRef = useChatScroll(chatLog);

  const handleSubmit = async () => {
    if (userText === "") return;
    setChatLog((prev) => [
      ...prev,
      { user: "client", msg: userText },
      // { userMessage: userText, gptResponse: res.result.text },
    ]);
    setChatLog((prev) => [
      ...prev,
      { user: "gpt", msg: <ChatLoader /> },
      // { userMessage: userText, gptResponse: res.result.text },
    ]);
    setUserText("");
    console.log(userText);
    setLoading(true); //_0D5lXDjNpw
    const res = await postData(
      `/api/chat?query=${userText}&videoId=${"_0D5lXDjNpw"}`
    );
    // setTokens(res.token_count);
    console.log(res);

    setLoading(false);

    setChatLog((prev) => [
      ...prev.slice(0, -1),
      { user: "gpt", msg: res.response },
      // { userMessage: userText, gptResponse: res.result.text },
    ]);
  };

  const router = useRouter();
  const handleEnterKeyPress = (event: any) => {
    if (event.key === "Enter") {
      // The "Enter" key was pressed
      handleSubmit();
    }
  };

  // useEffect(() => {
  //   // router.push("/login");
  // }, []);

  return (
    <section
      style={{ height: "calc(100vh - 12vh)" }}
      className=" w-full bg-[#f2f8fd] items-center  flex flex-col "
    >
      <div
        ref={chatContainerRef}
        style={{ scrollBehavior: "smooth" }}
        className="styled-scrollbar  px-20 py-6 overflow-x-hidden flex flex-col gap-3 w-[100%] mt-4 "
      >
        {chatLog?.length > 0 &&
          chatLog.map((obj, index) => {
            return <ChatMessage key={index} message={obj} />;
          })}
      </div>

      <div className=" rounded-[20px] bg-white shadow-md  w-[50%] mx-auto p-1 mb-5">
        <div className="w-full flex justify-between px-4 py-2">
          <input
            className="w-[80%] focus:outline-none text-black bg-white focus:ring-transparent"
            placeholder="Ask the Shiller"
            type="text"
            name="text"
            value={userText}
            onKeyDown={handleEnterKeyPress}
            onChange={(e) => setUserText(e.target.value)}
            id="questionInput"
          />

          <button onClick={handleSubmit} id="sendButton" className="p-2">
            <svg
              stroke="#272d34"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 mr-1"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

const postData = async (url: string) => {
  try {
    const response = await fetch(url);

    // if (!response.ok) {
    //   throw new Error(`Request failed with status: ${response.status}`);
    // }

    const responseData = await response.json();
    console.log(responseData, "responseData");
    return responseData;
  } catch (error) {
    if (error instanceof Error && error.message.includes("429")) {
      alert("Rate limit, 2 queries per minute only.");
    }
    console.error("Error:", error);
    throw error;
  }
};
export default page;
