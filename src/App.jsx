import { useState } from "react";
import ChatArea from "./components/ChatArea";
import Footer from "./components/Footer";
import Header from "./components/Header";

import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { systemPrompt } from "./constants/prompts";
import { formatDate } from "./utils/format-date";
import { markdownToHTML } from "./utils/markdownToHTML";
import useLocalStorage from "./hooks/use-local-storage";

const gemini = createGoogleGenerativeAI({
  apiKey: import.meta.env.VITE_API_KEY
});

export default function App() {
  const [messages, setMessages] = useLocalStorage("messages", []);
  // const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(input) {
    const message = input?.trim();
    if (!message) {
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        message: input,
        sender: "user",
        avatarSrc: undefined,
        avatarAlt: "Anonymous User",
        timestamp: formatDate(new Date()),
      },
    ]);

    setLoading(true);

    try {
      const { text } = await generateText({
        model: gemini("gemini-2.5-flash"),
        system: systemPrompt,
        prompt: message,
      });

      setMessages((prev) => [
        ...prev,
        {
          message: markdownToHTML(text),
          sender: "ai",
          avatarSrc: "/bot.png",
          avatarAlt: "ECMS Support Bot",
          timestamp: formatDate(new Date()),
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          message: error.message,
          sender: "ai",
          avatarSrc: "/bot.png",
          avatarAlt: "ECMS Support Bot",
          timestamp: formatDate(new Date()),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="p-5 h-screen overflow-hidden relative">
      <div className="mx-auto max-w-2xl h-full rounded-lg border border-slate-300 backdrop-blur-md">
        <Header/>
        <ChatArea messages={messages} loading={loading} />
        <Footer onSubmit={handleSubmit} />
      </div>
      <img
        src="/bg-1.webp"
        className="-z-1 absolute w-screen h-screen left-0 top-0 object-cover"
      />
    </div>
  );
}
