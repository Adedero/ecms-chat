import useLocalStorage from "../hooks/use-local-storage";
import Button from "./Button";

export default function Header() {
  const [, , removeMessages] = useLocalStorage("messages");

  function handleClick() {
    removeMessages();
    window.location.reload();
  }

  return (
    <header className="px-5 py-2 border-b border-b-slate-200 h-16">
      <div className="flex items-center gap-2">
        <div className="size-10 overflow-hidden rounded-full">
          <img src="bot.png" className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="font-bold">ECMS Support Bot</h1>
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-green-500"></div>
            <p className="text-slate-300 text-sm">online</p>
          </div>
        </div>

        <Button size="sm" className="ml-auto" onClick={handleClick}>
          Clear Messages
        </Button>
      </div>
    </header>
  );
}
