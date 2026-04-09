import { useState } from "react";
import Button from "./Button";
import Textarea from "./Textarea";

export default function Footer({ onSubmit }) {
  const [text, setText] = useState("");

  function handleClick() {
    setText("");
    if (onSubmit) {
      onSubmit(text);
    }
  }

  return (
    <div className="bg-white rounded-b-lg sticky bottom-0 px-5 py-2.5 border-t border-t-slate-200">
      <div className="flex items-end gap-2 h-full">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxRows={4}
          className="h-full rounded-lg outline-0 border border-slate-300 bg-slate-100 focus:ring-2 focus:ring-slate-300 ring-offset-2 p-2 grow text-sm"
        ></Textarea>
        <Button variant="outline" onClick={handleClick}>
          Submit
        </Button>
      </div>
    </div>
  );
}
