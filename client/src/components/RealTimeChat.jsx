import { useContext } from "react";
import { LucideMessageSquareText } from "lucide-react"
import { RealTimeChatContext } from "../App";

export default function RealTimeChat() {

  const {setRealTimeChat} = useContext(RealTimeChatContext)

  return (
    <div 
    onClick={() => setRealTimeChat(prev=>!prev)}
    className=" fixed bottom-4 right-4 bg-red-500 rounded-full w-16 h-16 flex justify-center items-center">
      <LucideMessageSquareText />
    </div>
  );
}
