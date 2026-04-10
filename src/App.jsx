import { useState } from "react";
import ChatArea from "./components/ChatArea";
import Footer from "./components/Footer";
import Header from "./components/Header";

import { generateText } from "ai";
import { systemPrompt } from "./constants/prompts";
import { formatDate } from "./utils/format-date";
import { markdownToHTML } from "./utils/markdownToHTML";
import useLocalStorage from "./hooks/use-local-storage";
import { createXai } from "@ai-sdk/xai";
import { createModel, getModel } from "./utils/ai-utils";

const model = createModel(import.meta.env.VITE_MODEL);
// const xai = createXai({ apiKey: import.meta.env.VITE_API_KEY });

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
        model: model(getModel(import.meta.env.VITE_MODEL)),
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
    <div className="p-5 h-dvh overflow-hidden relative">
      <div className="mx-auto max-w-2xl h-full rounded-lg border border-slate-300 backdrop-blur-md">
        <Header />
        <ChatArea messages={messages} loading={loading} />
        <Footer onSubmit={handleSubmit} />
      </div>
      <img
        src="/bg.webp"
        className="-z-1 absolute w-dvw h-dvh left-0 top-0 object-cover brightness-75"
      />
    </div>
  );
}
