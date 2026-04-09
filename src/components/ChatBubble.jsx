import React from "react";
import Avatar from "./Avatar"; // use the Avatar component we made earlier

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
      {!isUser && avatarSrc && (
        <Avatar src={avatarSrc} alt={avatarAlt} size="sm" />
      )}

      {/* Bubble */}
      <div
        className={`max-w-xs sm:max-w-md px-3 py-2 rounded-lg wrap-break-word ${
          isUser
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-slate-200 text-slate-900 rounded-bl-none"
        }`}
      >
        {children && children}
        {!children && (
          <>
            <p dangerouslySetInnerHTML={{ __html: message }} />
            {timestamp && (
              <div className="text-xs text-slate-400 mt-1 text-right">
                {timestamp}
              </div>
            )}
          </>
        )}
      </div>

      {/* Optional avatar for user messages */}
      {isUser && (avatarSrc || avatarAlt) && (
        <Avatar src={avatarSrc} alt={avatarAlt} size="sm" />
      )}
    </div>
  );
}
