import { io } from "socket.io-client";
import { useContext, useEffect, useState, useRef } from 'react'
import { RealTimeChatContext, UserNameContext } from '../App'
import { Send , X } from'lucide-react'

const socket = io(`http://localhost:5000`);
export default function Chat() {
    const {realTimeChat, setRealTimeChat} = useContext(RealTimeChatContext)
    const [message,setMessage] = useState({name:"",msg:""})
    const [messages,setMessages] = useState([])
    const {userName,setUserName} = useContext(UserNameContext)
    const chatEnd = useRef(null)
    const token = localStorage.getItem("token")

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connesso al server:", socket.id);
    });

    socket.on("chatMessages", (msg) => {
      setMessages((prev) => [...prev,{name:msg.name,msg:msg.msg}]);
    });

    return () => {
      socket.off("chatMessages");
      socket.off("connect");
    };
  }, []);


  useEffect(() => {
    chatEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = () => {
    if(message.msg.trim() === "") return;
    socket.emit("message", message);
    setMessage({name:"",msg:""})
  };

  return (
    <>
        {realTimeChat && token && (
            <div className='absolute w-full h-full bg-black/25 flex justify-center items-start'>
                <div className="fixed mt-[150px] sm:mt-[20px] sm:h-[350px] sm:w-[600px] z-[500] w-[300px] h-[500px] bg-white rounded-xl flex flex-col justify-end">
                    <div className=" flex flex-col overflow-y-scroll flex-1">
                        {messages && messages.map((mess,index)=>(
                            <p key={index}
                            className="odd:bg-red-100 even:bg-red-200 p-3 first:rounded-t-xl text-gray-800 w-full wrap-break-word">
                                <span className="font-semibold">{mess.name}</span>: {mess.msg}
                            </p>
                        ))}
                        <div className="fixed w-auto h-auto bg-black/25 self-end m-3 p-1 rounded-full cursor-pointer" onClick={()=>setRealTimeChat(false)}>
                            < X/>
                        </div>
                        <div ref={chatEnd}/>
                    </div>
                    <div className="bg-red-50 w-full rounded-b-xl flex items-center p-2">
                        <input 
                            type="text"
                            onKeyDown={(e)=>e.key === "Enter" && handleSubmit()}
                            value={message.msg}
                            onChange={(e)=>setMessage({name:userName,msg:e.target.value})} 
                            className="flex-1 h-[50px] px-3 rounded-2xl border border-red-200 focus:outline-none focus:ring-2 focus:ring-red-300 focus:bg-white"
                        />
                        <button onClick={handleSubmit} className="ml-2 p-2 bg-red-500 rounded-lg text-white hover:bg-red-600">
                            <Send/>
                        </button>
                    </div>
                </div>
                
            </div>
        )}
    </>
    
  )
}
