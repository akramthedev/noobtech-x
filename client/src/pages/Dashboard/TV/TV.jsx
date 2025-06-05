import React, { useRef, useState, useEffect } from "react";
import ColorThief from "colorthief";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./index.css";
import Carousel from "../../../components/Carousel/Carousel";
import Ads2 from "../../../assets/ads2.png";
import Ads3 from "../../../assets/ads3.png";
import Ads1 from "../../../assets/ads4.png";
import Navbar from "../../../components/Navbar/NavbarTv";
import axios from "axios"
import { ENVIRONMENT } from "../../../environments"; 
import WebSocketClient from '../../../Websocket/WebSocketClient';


const TV = () => {
 const imgRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mainColor, setMainColor] = useState("rgba(0,0,0,1)");
  const [shadowColor, setShadowColor] = useState("rgba(0,0,0,0.3)");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);
  const [carouselKey, setCarouselKey] = useState(0);
  const [images, setImages] = useState([Ads1, Ads2, Ads3]);

  const user = localStorage.getItem("user");
  const userString = JSON.parse(user);
  const userId = userString._id;
  const establishmentId = localStorage.getItem('establishmentId');

  const [loading, setLoading] = useState(true);
  const [colorTitle, setcolorTitle] = useState("");
  const [description, setdescription] = useState("");
  const [slogan, setslogan] = useState("");
  const [title, settitle] = useState("");



  const extractColors = (imgElement) => {
    if (!imgElement) return;
    const colorThief = new ColorThief();
    if (imgElement.complete && imgElement.naturalWidth !== 0) {
      try {
        const [r, g, b] = colorThief.getColor(imgElement);
        setMainColor(`rgba(${r}, ${g}, ${b}, 1)`);
        setShadowColor(`
          0 8px 16px rgba(${r}, ${g}, ${b}, 0.4),
          0 16px 32px rgba(${r}, ${g}, ${b}, 0.4),
          0 24px 48px rgba(${r}, ${g}, ${b}, 0.4)
        `);
      } catch (err) {
        console.error("Color extraction failed:", err);
      }
    }
  };



  useEffect(() => {
    const imgEl = imgRefs.current[activeIndex];
    if (imgEl) {
      if (imgEl.complete) {
        extractColors(imgEl);
      } else {
        imgEl.addEventListener("load", () => extractColors(imgEl), { once: true });
      }
    }
  }, [activeIndex]);

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

      setTimeout(() => {
        setCarouselKey((prev) => prev + 1);
      }, 300);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
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




  const fetchEstablishmentData = async ()=>{
    try{
      setLoading(true);
      const establishmentId = localStorage.getItem("establishmentId");
      const resp = await axios.get(`${ENVIRONMENT.ENDPOINT}/establishment/${establishmentId}`);
      console.log(resp.status);
      console.log(resp.data);
      if(resp.status === 200){
        const {colorTitle, description, slogan, title, images: imagesX} = resp.data;
        setcolorTitle(colorTitle);
        setdescription(description);
        setslogan(slogan);
        settitle(title);
        setImages(imagesX);
        setTimeout(()=>{
          setLoading(false);
        }, 666);
      } 
      else{
        setLoading(false);
        alert("Oups, une erreur est survenue.")
      }
    }
    catch(e){
      setLoading(false);
      alert("Oups, une erreur est survenue.")
      console.log(e.message);
    }
  }




  useEffect(()=>{
    fetchEstablishmentData();
  },[]);
  

  return (
      <div className="containerTv" ref={containerRef} >

          <div className={`loading-overlay ${loading ? 'show' : ''}`}>
            <div className="loader"></div>
          </div>

          <Navbar
            isFullscreen={isFullscreen}
            toggleFullscreenOnClick={toggleFullscreenOnClick}
          />

          <div className="coneifso">


            <div className="containerHero">
              <div
                className="containerImage"
                style={{
                  boxShadow: shadowColor,
                  transition: "box-shadow 0.6s ease", 
                  borderRadius : "1.3rem"
                }}
              >
                <Carousel
                  key={carouselKey}
                  images={images}
                  interval={5000}
                  activeIndex={activeIndex}
                  onChange={setActiveIndex}
                />
              </div>

              <div className="containerTimeWatherAndDescription">
                <h5 style={{ color: colorTitle }}>
                {
                  slogan ? slogan : "---"
                }
                </h5>
                <p>
                {
                  description ? description : "---"
                }
                </p>
              </div>
            </div>

            <div className="containerServices">
              <div className="helloWorld0" style={{color : colorTitle ? colorTitle : "#303030"}} >
                {
                  title ? title : "---"
                }
              </div>
              <div className="helloWorld">
                <div className="hello2">
                  <div className="firstPart">
                    <div className="sohfwdfxh">
                      Ciel nuageux
                    </div>
                    <div className="ofswdoxd" >
                      20°
                    </div>
                  </div>
                  <div className="secondePart">
                    <div>
                      Mercredi, 4 Juin
                    </div>
                    <div 
                      style={{
                        display : "flex", 
                        alignItems : "center"
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin-icon lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
                      &nbsp;Agadir, Maroc
                    </div>
                  </div>
                  <div className="thirdPart">
                    <img src="/sun.png" alt="" />
                  </div>
                </div>
              </div>
              <div className="containerGridOfServices">
                  
                  <div className="serviceItem" >
                    <div className="serviceTitle" >
                      Polytechnique / Bureau 1
                    </div>
                    <div className="serviceNumber serviceNumber4" >
                      D03
                    </div>
                    <div className="serviceNext">
                      Suivant : D04
                    </div>
                  </div>


                  <div className="serviceItem" >
                    <div className="serviceTitle" >
                      Polytechnique / Bureau 2
                    </div>
                    <div className="serviceNumber serviceNumber4" >
                      D05
                    </div>
                    <div className="serviceNext">
                      Suivant : D06
                    </div>
                  </div>


                  <div className="serviceItem" >
                    <div className="serviceTitle" >
                      Polytechnique / Bureau 3
                    </div>
                    <div className="serviceNumber serviceNumber4" >
                      D07
                    </div>
                    <div className="serviceNext">
                      Suivant : D08
                    </div>
                  </div>


                  <div className="serviceItem" >
                    <div className="serviceTitle" >
                      ISIAM / Bureau 1
                    </div>
                    <div className="serviceNumber serviceNumber4" >
                      A67
                    </div>
                    <div className="serviceNext">
                      Suivant : A68
                    </div>
                  </div>


                  <div className="serviceItem" >
                    <div className="serviceTitle" >
                      ISIAM / Bureau 2
                    </div>
                    <div className="serviceNumber serviceNumber4" >
                      A69
                    </div>
                    <div className="serviceNext">
                      Suivant : A70
                    </div>
                  </div>

                  <div className="serviceItem" >
                    <div className="serviceTitle" >
                      ISIAM / Bureau 2
                    </div>
                    <div className="serviceNumber serviceNumber4" >
                      A69
                    </div>
                    <div className="serviceNext">
                      Suivant : A70
                    </div>
                  </div>



              </div>
              
            </div>
          </div>    
        {
          userId &&  establishmentId && 
          <WebSocketClient
            userId={userId}
            establishmentId={establishmentId} 
            functionRefresh={fetchEstablishmentData}
          />
        }

        </div>      
  );
};

export default TV;
