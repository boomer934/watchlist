import { io } from "socket.io-client";
import { useContext, useEffect, useState } from 'react'
import { RealTimeChatContext } from '../App'
import { Search } from'lucide-react'

export default function Chat() {
    const {realTimeChat, setRealTimeChat} = useContext(RealTimeChatContext)
    const [message,setMessage] = useState("")
    const [messages,setMessages] = useState([])
      useEffect(() => {
    // Connessione al server
    const socket = io("http://localhost:5000");

    socket.on("connect", () => {
      socket.on("message",(data) => {
        console.log(data)
      })
    });

  }, []);
  return (
    <>
        {realTimeChat &&(
            <div className='absolute w-full h-full bg-black/25 flex justify-center items-start'>
                <div className="fixed mt-[150px] z-[500] w-[400px] h-[600px] bg-white rounded-xl flex flex-col justify-end">
                    <div className=" flex flex-col overflow-y-scroll flex-1">
                        {messages && messages.map((mess,index)=>(
                            <p key={index}
                            className="">
                                {mess}
                            </p>
                        ))}
                    </div>
                    <div className=" bg-gray-300 w-full rounded-b-xl">
                        <input 
                        type="text"
                        onKeyDown={(e)=>e.key === "Enter" && setMessages(prev=>[...prev,message])}
                        value={message}
                        onChange={(e)=>setMessage(e.target.value)} 
                        className="w-[300px] h-[50px] bg-amber-400 m-6 mb-3"/>
                        <button 
                        onClick={()=>setMessages(prev=>[...prev,message])}>
                            <Search/>
                        </button>
                    </div>
                    
                </div>
            </div>
        )}
    </>
    
  )
}
