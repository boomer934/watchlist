import { useEffect } from "react";
import { io } from "socket.io-client";

export default function RealTimeChat() {

  useEffect(() => {
    // Connessione al server
    const socket = io("http://localhost:5000");

    socket.on("connect", () => {
      console.log("✅ Connected to server");
    });

    // Cleanup quando il componente viene smontato
    return () => {
      socket.disconnect();
    };
  }, []); // <-- array vuoto qui, fuori da socket.on

  return (
    <div>
      <h1>RealTimeChat</h1>
    </div>
  );
}
