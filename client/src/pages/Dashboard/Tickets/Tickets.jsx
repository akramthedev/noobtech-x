import React, {useEffect, useRef, useState} from 'react'
import "./index.css";
import NavbarTv from '../../../components/Navbar/NavbarTv';
import axios from "axios";
import { ENVIRONMENT } from "../../../environments";
import ErrorPopUp from "../../../components/ErrorPopUp/ErrorPopUp"
import WebSocketClient from '../../../Websocket/WebSocketClient';


const Tickets = () => {


  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loader, setloader] = useState(true);
  const containerRef = useRef(null);
  const [Error,setError] = useState(null);
  const [services,setservices] = useState(null);
  const [dataOfEstablishment,setdataOfEstablishment] = useState(null);

  const user = localStorage.getItem("user");
  const userString = JSON.parse(user);
  const userId = userString._id;
  const establishmentId = localStorage.getItem("establishmentId");




  const fetchDataUser = async ()=>{
      try{

        setloader(true);
        
        let user = localStorage.getItem('user');
        let establishmentId = localStorage.getItem('establishmentId')
        let userStringified = JSON.parse(user);
        let userId = userStringified._id;

        const resp1 = await axios.get(`${ENVIRONMENT.ENDPOINT}/service/all/${userId}`);
        if(resp1.status === 200){
          setservices(resp1.data);
          const resp2 = await axios.get(`${ENVIRONMENT.ENDPOINT}/establishment/${establishmentId}`);
          if(resp2.status === 200){
            console.log(resp2.data)
            setdataOfEstablishment(resp2.data);
          }
          else{
            setdataOfEstablishment(null);
          }
          setloader(false);
        }
        else{
          setdataOfEstablishment(null);
          setservices([]);
          setloader(false);
          setError("Oups, une erreur est survenue.")
        }

      }
      catch(e){
        setservices([]);
        setloader(false);
        setError("Oups, une erreur est survenue.")
        console.log(e.message);
      }
    }



    useEffect(()=>{
      fetchDataUser();
    },[]);

 


    useEffect(() => {
    const handleFullscreenChange = () => {
      const isFs = !!document.fullscreenElement;
      setIsFullscreen(isFs);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);
  const toggleFullscreenOnClick = async () => {
    if (!document.fullscreenElement && containerRef.current) {
      await containerRef.current.requestFullscreen();
    } else if (document.fullscreenElement) {
      await document.exitFullscreen();
    }
  };


const gradientFunction = () => {
  if (!dataOfEstablishment) return "";

  const color = dataOfEstablishment.colorTitle;
  let gradient = "";

  switch (color) {
    case "#1975f5": // Bleu vif
    
      gradient = "linear-gradient(135deg, #1975f5 0%, #00d4ff 40%, #ff6ec4 100%)";
      break;

    case "#eab308": // Jaune / Or
      gradient = "linear-gradient(135deg, #eab308 0%, #ff6f61 50%, #8e44ad 100%)";
      break;

    case "#22c55e": // Vert
      gradient = "linear-gradient(135deg, #22c55e 0%, #22c55e 50%, #3b82f6  100%)";
      break;

    case "#6366f1": // Indigo
      gradient = "linear-gradient(135deg, #6366f1 0%, #6366f1 50%, #f97316 100%)";
      break;

    case "#ec4799": // Rose
      gradient = "linear-gradient(135deg, #ec4799 0%, #f59e0b 50%, #ec4799 100%)";
      break;

    case "#64748b": // Bleu-gris
      gradient = "linear-gradient(135deg, #64748b 0%, #facc15 40%, #64748b 100%)";
      break;

    case "#15B99B": // Turquoise / teal
      gradient = "linear-gradient(135deg, #15B99B 0%, #15B99B 40%, #6366f1 100%)";
      break;

    case "#303030": // Gris foncé

      gradient = "linear-gradient(135deg, #303030 0%, #6366f1 40%, #6366f1 100%)";
      break;

    default:
      gradient = "linear-gradient(135deg, #999999 0%, #999999 50%, #ec4899 100%)";
  }

  return gradient;
};




  

  return (
    <div ref={containerRef} className='ticketsContainer' style={{background : gradientFunction()}}  >
      <ErrorPopUp
        message={Error}
        setMessage={setError}
      />
      <NavbarTv 
        isFullscreen={isFullscreen}
        toggleFullscreenOnClick={toggleFullscreenOnClick}
      />
      {
        dataOfEstablishment && 
        <div className="insiderTicket">
          <div className="containerOfLogo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Universiapolis.png/800px-Universiapolis.png" alt="" className='logoOfTickets' />
          </div>
          <div className="rowTicketsContainer">
            <div className="containerTitle98">
            {
              dataOfEstablishment.slogan ? dataOfEstablishment.slogan : "--"
            }
            </div>
            <div className="containerDesc98">
            {
              dataOfEstablishment.description ? dataOfEstablishment.description : "--"
            }
            </div>
            <div className="containerOfRowTicketsJJ">
              {
                (services && services.length !== 0) &&
                <>
                {
                  [...services]
                  .sort(() => Math.random() - 0.5)
                  .map((service, index) => {
                    return(
                      <div className="rowServiceTicket">
                        <div className="caseLogoOfService">
                          <img src={service.logoUrl} alt=""  />
                        </div>
                        <div className="containerTitleAndDesOfService">
                          <div className="titleXXX">
                          {service.name ? service.name : "--"}
                          </div>
                          <div className="descXXX">
                          {service.description ? service.description : "-- --"}
                          </div>
                        </div>
                        <div className="caseForward">
                          <i className='fa-solid fa-chevron-right' ></i>
                        </div>
                      </div>
                    )
                  })
                }
                
                </> 
              }
            </div>
            <div className="containerMobileAndEmail">
              <div>
              {
                dataOfEstablishment.email ? dataOfEstablishment.email : "contact@universiapolis.ma"
              }
              </div>
              <div>
                +212 528 230 230
              </div>
            </div>
            <div className="containerWebsite">
              {dataOfEstablishment.website && dataOfEstablishment.website !== "" ? dataOfEstablishment.website : "www.universiapolis.ma"}
            </div>
          </div>
        </div>
      }

      {
        userId && establishmentId && 
          <WebSocketClient
            userId={userId}
                        establishmentId={establishmentId} functionRefresh={()=>{alert("MongoDb Changed")}}

          />
      }


    </div>
  )
}

export default Tickets
