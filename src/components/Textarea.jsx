import React, { useRef, useEffect } from "react";

export default function Textarea({
  rows = 1,
  maxRows,
  value,
  onChange,
  placeholder,
  className = "",
}) {
  const textareaRef = useRef(null);

  const resize = () => {
    const node = textareaRef.current;
    if (!node) return;

    const computedStyle = window.getComputedStyle(node);
    const lineHeight = parseFloat(computedStyle.lineHeight);

    node.style.height = "auto";

    let newHeight = node.scrollHeight;

    if (maxRows) {
      const maxHeight = lineHeight * maxRows;

      if (newHeight > maxHeight) {
        newHeight = maxHeight;
        node.style.overflowY = "auto";
      } else {
        node.style.overflowY = "hidden";
      }
    }

    node.style.height = newHeight + "px";
  };

  useEffect(() => {
    resize();
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      rows={rows}
      placeholder={placeholder}
      className={`resize-none block w-full ${className}`}
      style={{ minHeight: "40px", overflowY: "hidden" }}
      onChange={(e) => {
        resize();
        if (onChange) onChange(e);
      }}
    />
  );
}
