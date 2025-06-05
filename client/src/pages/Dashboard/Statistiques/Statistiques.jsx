import React, {useEffect, useRef, useState} from 'react'
import "./index.css";
import NavbarTv from '../../../components/Navbar/NavbarTv';
import WebSocketClient from "../../../Websocket/WebSocketClient"




const Statistiques = () => {


    const [isFullscreen, setIsFullscreen] = useState(false);
    const containerRef = useRef(null);


  
  const user = localStorage.getItem("user");
  const userString = JSON.parse(user);
  const userId = userString._id;
  const establishmentId = localStorage.getItem("establishmentId");


   useEffect(() => {
    const handleKeyDown = async (e) => {
      if (e.key === "f" && !document.fullscreenElement && containerRef.current) {
        await containerRef.current.requestFullscreen();
      } else if (e.key === "Escape" && document.fullscreenElement) {
        await document.exitFullscreen();
      }
    };

    const handleFullscreenChange = () => {
      const isFs = !!document.fullscreenElement;
      setIsFullscreen(isFs);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Permettre aussi le clic pour basculer en fullscreen
  const toggleFullscreenOnClick = async () => {
    if (!document.fullscreenElement && containerRef.current) {
      await containerRef.current.requestFullscreen();
    } else if (document.fullscreenElement) {
      await document.exitFullscreen();
    }
  };



  return (
    <div ref={containerRef} style={{background : "white"}} >
      <NavbarTv 
        isFullscreen={isFullscreen}
        toggleFullscreenOnClick={toggleFullscreenOnClick}
      />
      
      {
        userId && establishmentId &&
        <WebSocketClient
            userId={userId}
                        establishmentId={establishmentId} functionRefresh={()=>{alert("MongoDb Changed")}}

          />
      }
      Statistiques 
    </div>
  )
}

export default Statistiques
