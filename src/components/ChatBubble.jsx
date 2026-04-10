import React from "react";
import Avatar from "./Avatar";

export default function ChatBubble({
  message,
  sender = "ai", // "user" or "ai"
  avatarSrc,
  avatarAlt,
  timestamp,
  className = "",
  children,
}) {
  const isUser = sender === "user";

  return (
    <div
      className={`flex items-end gap-2 mb-2 ${
        isUser ? "justify-end" : "justify-start"
      } ${className}`}
    >
      {/* Avatar for messages from others */}
      {!isUser && (avatarSrc || avatarAlt) && (
        <Avatar
          src={avatarSrc}
          alt={avatarAlt}
          size="sm"
          className="shrink-0"
        />
      )}

      {/* Bubble */}
      <div
        className={`max-w-xs sm:max-w-md px-3 py-2 rounded-lg wrap-break-word ${
          isUser
            ? "bg-green-600 text-white rounded-br-none"
            : "bg-slate-200 text-slate-900 rounded-bl-none"
        }`}
      >
        {children && children}
        {!children && (
          <>
            <div
              className="whitespace-pre-wrap chat_bubble"
              dangerouslySetInnerHTML={{ __html: message }}
            />
            {timestamp && (
              <p
                className={`text-xs mt-1 text-right ${isUser ? "text-slate-200" : "text-slate-500"}`}
              >
                {timestamp}
              </p>
            )}
          </>
        )}
      </div>

      {/* Optional avatar for user messages */}
      {isUser && (avatarSrc || avatarAlt) && (
        <Avatar
          src={avatarSrc}
          alt={avatarAlt}
          size="sm"
          className="shrink-0"
        />
      )}
    </div>
  );
}
