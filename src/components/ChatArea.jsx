import React, { useRef, useEffect } from "react";
import ChatBubble from "./ChatBubble";

export default function ChatArea({ messages, loading }) {
  const containerRef = useRef(null);

  function scrollToBottom() {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight; // scroll to bottom
    }
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // triggers every time messages change

  return (
    <div
      ref={containerRef}
      className="h-[calc(100%-7.8rem)] overflow-y-auto p-2 flex flex-col gap-2"
    >
      {messages.map((msg, idx) => (
        <ChatBubble key={idx} {...msg} />
      ))}
      {loading && (
        <ChatBubble
          message={"ECMS Support bot is typing..."}
          sender="ai"
          avatarSrc="/bot.png"
        />
      )}
    </div>
  );
}
