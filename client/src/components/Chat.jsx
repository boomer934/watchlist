import { io } from "socket.io-client";
import { useContext, useEffect, useState } from 'react'
import { RealTimeChatContext, UserNameContext } from '../App'
import { Search } from'lucide-react'

const socket = io("http://localhost:5000");
export default function Chat() {
    const {realTimeChat, setRealTimeChat} = useContext(RealTimeChatContext)
    const [message,setMessage] = useState({name:"",msg:""})
    const [messages,setMessages] = useState([])
    const {userName,setUserName} = useContext(UserNameContext)

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


  const handleSubmit = () => {
    socket.emit("message", message);
    setMessage({name:"",msg:""})
  };

  return (
    <>
        {realTimeChat &&(
            <div className='absolute w-full h-full bg-black/25 flex justify-center items-start'>
                <div className="fixed mt-[150px] z-[500] w-[400px] h-[600px] bg-white rounded-xl flex flex-col justify-end">
                    <div className=" flex flex-col overflow-y-scroll flex-1">
                        {messages && messages.map((mess,index)=>(
                            <p key={index}
                            className="">
                                {mess.name} : {mess.msg}
                            </p>
                        ))}
                    </div>
                    <div className=" bg-gray-300 w-full rounded-b-xl">
                        <input 
                        type="text"
                        onKeyDown={(e)=>e.key === "Enter" && handleSubmit()}
                        value={message.msg}
                        onChange={(e)=>setMessage({name:userName,msg:e.target.value})} 
                        className="w-[300px] h-[50px] bg-amber-400 m-6 mb-3"/>
                        <button 
                        onClick={()=>handleSubmit()}>
                            <Search/>
                        </button>
                    </div>
                    
                </div>
            </div>
        )}
    </>
    
  )
}
