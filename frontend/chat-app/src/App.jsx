import socketClient, {io} from "socket.io-client";
import React, { useEffect, useState } from "react";
import './styles/App.css'

// var socket = io();
const socket = socketClient("http://localhost:1700");

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);


  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('pong', () => {
      setLastPong(new Date().toISOString());
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, []);

  const sendPing = () => {
    socket.emit('ping');
  }

  return (
    <div>
      <p>Connected: { '' + isConnected }</p>
      <p>Last pong: { lastPong || '-' }</p>
      <button onClick={ sendPing }>Send ping</button>
    </div>
  );
}

// export default App;
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <form>
  //         <input type="text" placeholder="Type a message..." />
  //         <button type="submit">Send</button>          
  //       </form>
  //     </header> 
  //   </div>
  // )
// }

export default App
