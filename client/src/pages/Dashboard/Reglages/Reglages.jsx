import React, {useEffect, useRef, useState} from 'react'
import "./index.css";
import NavbarTv from '../../../components/Navbar/NavbarTv';
import axios from "axios";
import { ENVIRONMENT } from "../../../environments"
import ErrorPopUp from "../../../components/ErrorPopUp/ErrorPopUp";
import SuccessPopUp from "../../../components/SuccessPopUp/SuccessPopUp";
import WebSocketClient from '../../../Websocket/WebSocketClient';



function formatDateTime(isoString) {
  const date = new Date(isoString);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}




const colors = [
  { name: 'Bleu', code: '#1975f5' },
  { name: 'Jaune', code: '#eab308' },
  { name: 'Vert', code: '#22c55e' },
  { name: 'Bleuviolet', code: '#6366f1' },
  { name: 'Rose', code: '#ec4799' },
  { name: 'Bleu-Marin', code: '#64748b' },
  { name: 'Emeraude', code: '#15B99B' },
  { name: 'Noir', code: '#303030' },
];



const Reglages = () => {


    const [isFullscreen, setIsFullscreen] = useState(false);
    const [navigationIndex, setnavigationIndex] = useState(0);
    const containerRef = useRef(null);
    const [isModified, setisModified] = useState(false);
    const [isProfileModified, setisProfileModified] = useState(false);
    const [loader, setloader] = useState(true);
    const [loaderUser, setloaderUser] = useState(true);
    const [loaderBureaux, setloaderBureaux] = useState(true);
    const [loaderServices, setloaderServices] = useState(true);
    const [NewBureauClicked, setNewBureauClicked] = useState(false);
    const [NewServiceClicked, setNewServiceClicked] = useState(false);
    const [services, setservices] = useState(null);
    const [bureaux, setbureaux] = useState(null);
    const [bureauToModify, setbureauToModify] = useState(null);

    const [NewserviceName, setNewserviceName] = useState('');
    const [NewServiceDescription, setNewServiceDescription] = useState('');


    const [idToDelete, setIdToDelete] = useState(null);
    const [nameToDelete, setNameToDelete] = useState(null);

    const [IdServiceToDelete, setIdServiceToDelete] = useState(null);
    const [NameServiceToDelete, setNameServiceToDelete] = useState(null);
    const [NameServiceToModify, setNameServiceToModify] = useState(null);
    const [descriptionServiceToModify, setdescriptionServiceToModify] = useState(null);
    const [ServiceToModify, setServiceToModify] = useState(null);


    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
  
  
    const [uploadedImages, setUploadedImages] = useState([]);

    //  old data 
    const [selectedColorOld, setSelectedColorOld] = useState(null);
    const [etablissementOld, setEtablissementOld] = useState("");
    const [titreOld, settitreOld] = useState("");
    const [descriptionOld, setdescriptionOld] = useState("");
    const [websiteOld, setwebsiteOld] = useState("");
    const [imagesOld, setimagesOld] = useState([]);
    const [emailEtablissementOld, setemailEtablissementOld] = useState("")

    const [firstNameOld, setfirstNameOld] = useState("");
    const [lastNameOld, setlastNameOld] = useState("");
    const [emailOld, setemailOld] = useState("");
    const [websitePersonalOld, setwebsitePersonalOld] = useState("");
    const [mobileOld, setmobileOld] = useState("");



    
    //  new data 
    const [selectedColor, setSelectedColor] = useState(null);
    const [etablissement, setEtablissement] = useState("");
    const [titre, settitre] = useState("");
    const [description, setdescription] = useState("");
    const [website, setwebsite] = useState("");
    const [images, setimages] = useState([]);
    const [emailEtablissement, setemailEtablissement] = useState("")


    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setemail] = useState("");
    const [websitePersonal, setwebsitePersonal] = useState("");
    const [mobile, setmobile] = useState("");







    const [bureauName, setBureauName] = useState('');
    const [bureauNameToModify, setbureauNameToModify] = useState("");

    const [selectedColorForBureau, setselectedColorForBureau] = useState('#1975f5');
    const [selectedColorForBureauToModify, setselectedColorForBureauToModify] = useState('#1975f5');
    
    const [isOpen, setIsOpen] = useState('ouvert'); 
    const [isOpenToModify, setIsOpenToModify] = useState('ouvert'); 
  
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedServicesToModify, setselectedServicesToModify] = useState([]);








    

  const user = localStorage.getItem("user");
  const userString = JSON.parse(user);
  const userId = userString._id;
  const establishmentId = localStorage.getItem("establishmentId");

 
  





    const toggleService = (serviceId) => {
      setSelectedServices((prev) =>
        prev.includes(serviceId)
          ? prev.filter((id) => id !== serviceId)
          : [...prev, serviceId]
      );
    };



    const toggleServiceToModify = (serviceId) => {
      setselectedServicesToModify((prev) =>
        prev.includes(serviceId)
          ? prev.filter((id) => id !== serviceId)
          : [...prev, serviceId]
      );
    };
 
        
  // useEffect(() => {
  //   if (!bureauToModify) return;
  //   const existingServiceIds = bureauToModify.services
  //     .map((srv) => srv.id?._id)    
  //     .filter((id) => Boolean(id));  

  //   setselectedServicesToModify(existingServiceIds);
  // }, [bureauToModify]);



  useEffect(() => {
    if (!bureauToModify || bureauToModify.services.length === 0) return;

    const existingServiceIds = [];

    for (let i = 0; i < bureauToModify.services.length; i++) {
      const srvEntry = bureauToModify.services[i];
      console.log(srvEntry);

      if (!srvEntry) {
        continue;
      }

      const maybeIdObject = srvEntry.id;
      if (maybeIdObject === null || maybeIdObject === "" || maybeIdObject === undefined) {
        console.log("Empty id → skipping");
        continue;
      }

      const realId = maybeIdObject._id;
      if (realId) {
        console.log("Found valid _id:", realId);
        existingServiceIds.push(realId);
      } else {
        console.log("srvEntry.id was an object but _id is missing → skipping");
      }
    }

    console.table(existingServiceIds);

    setselectedServicesToModify(existingServiceIds);
  }, [bureauToModify]);


  


    useEffect(() => {
      return () => {
        uploadedImages.forEach((file) => URL.revokeObjectURL(file));
      };
    }, [uploadedImages]);




    const handleAnnuler = ()=>{
      setSelectedColor(selectedColorOld);
      setEtablissement(etablissementOld);
      settitre(titreOld);
      setdescription(descriptionOld);
      setwebsite(websiteOld);
      setUploadedImages([]);
      setimages(imagesOld);
      setemailEtablissement(emailEtablissementOld);
      setisModified(false);
    }


    const fetchDataEtablissement = async ()=>{
      try{

        setloader(true);
        
        let establishmentId = localStorage.getItem('establishmentId');

        const resp = await axios.get(`${ENVIRONMENT.ENDPOINT}/establishment/${establishmentId}`);
        if(resp.status === 200){
          console.warn(resp.data);
          const {
            colorTitle : colorTitleRESPONSE, 
            description : descriptionRESPONSE, 
            slogan : sloganRESPONSE, 
            title : titleRESPONSE, 
            website : websiteRESPONSE, 
            images: imagesRESPONSE, 
            email : emailRESPONSE
          } = resp.data;
          setSelectedColor(colorTitleRESPONSE);
          setSelectedColorOld(colorTitleRESPONSE);
          //-------
          setEtablissement(titleRESPONSE);
          setEtablissementOld(titleRESPONSE);
          //-------
          settitre(sloganRESPONSE);
          settitreOld(sloganRESPONSE);
          //-------
          setdescription(descriptionRESPONSE);
          setdescriptionOld(descriptionRESPONSE);
          //-------
          setwebsite(websiteRESPONSE);
          setwebsiteOld(websiteRESPONSE);
          //-------
          setemailEtablissementOld(emailRESPONSE);
          setemailEtablissement(emailRESPONSE);
          //-------
          setimages(imagesRESPONSE);
          setimagesOld(imagesRESPONSE);
          //-------
            setloader(false);

          }
        else{
          setloader(false);
          setError("Oups, une erreur est survenue.")
        }

      }
      catch(e){
        setloader(false);
        setError("Oups, une erreur est survenue.")
        console.log(e.message);
      }
    }






     const handleAnnulerProfileModification = ()=>{
      setfirstName(firstNameOld);
      setlastName(lastNameOld);
      setemail(emailOld);
      setmobile(mobileOld);
      setwebsitePersonal(websitePersonalOld);
      setisProfileModified(false);
    }


    const fetchDataUser = async ()=>{
      try{

        setloaderUser(true);
        
        let user = localStorage.getItem('user');
        let userStringified = JSON.parse(user);
        let userId = userStringified._id;

        const resp = await axios.get(`${ENVIRONMENT.ENDPOINT}/user/${userId}`);
        if(resp.status === 200){
          console.warn(resp.data);
          const {
            firstName : firstNameRESPONSE, 
            lastName : lastNameRESPONSE, 
            email : emailRESPONSE, 
            mobile : mobileRESPONSE, 
            website : websitePersonalRESPONSE, 
          } = resp.data;
          setfirstName(firstNameRESPONSE);
          setfirstNameOld(firstNameRESPONSE);
          //-------
          setlastName(lastNameRESPONSE);
          setlastNameOld(lastNameRESPONSE);
          //-------
          setemail(emailRESPONSE);
          setemailOld(emailRESPONSE);
          //-------
          setmobile(mobileRESPONSE);
          setmobileOld(mobileRESPONSE);
          //-------
          setwebsitePersonal(websitePersonalRESPONSE);
          setwebsitePersonalOld(websitePersonalRESPONSE);
          setloaderUser(false);
        }
        else{
          setloaderUser(false);
          setError("Oups, une erreur est survenue.")
        }

      }
      catch(e){
        setloaderUser(false);
        setError("Oups, une erreur est survenue.")
        console.log(e.message);
      }
    }



    const fetchAllUserServices = async ()=>{
      try{
        
        setloaderServices(true);
        
        let user = localStorage.getItem('user');
        let userStringified = JSON.parse(user);
        let userId = userStringified._id;

        const resp = await axios.get(`${ENVIRONMENT.ENDPOINT}/service/all/${userId}`);
        if(resp.status === 200){
          console.warn(resp.data);
          setservices(resp.data);
          setloaderServices(false);
        }
        else{
          setloaderServices(false);
          setservices([]);
          setError("Oups, une erreur est survenue.")
        }

      }
      catch(e){
        setloaderServices(false);
        setservices([]);
        setError("Oups, une erreur est survenue.")
        console.log(e.message);
      }
    }






    

    const fecthAllBureaux = async ()=>{
      try{
        
        
        let establishmentId = localStorage.getItem('establishmentId');

        if(!establishmentId || establishmentId === ""){
          setloaderBureaux(false);
          return;
        }
        setloaderBureaux(true);

        const resp = await axios.get(`${ENVIRONMENT.ENDPOINT}/bureau/all/${establishmentId}`);
        if(resp.status === 200){
          console.warn(resp.data);
          setbureaux(resp.data);
          setloaderBureaux(false);
        }
        else{
          setloaderBureaux(false);
          setbureaux([]);
          setError("Oups, une erreur est survenue.")
        }

      }
      catch(e){
        setloaderBureaux(false);
        setbureaux([]);
        setError("Oups, une erreur est survenue.")
        console.log(e.message);
      }
    }





    const uploadImagesToCloudinary = async (images) => {
      const cloudName = ENVIRONMENT.CLOUDINARY_CLOUD_NAME;
      const preset = ENVIRONMENT.CLOUDINARY_PRESET;
      const urls = [];

      for (let image of images) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", preset);

        try {
          const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: "POST",
            body: formData,
          });

          const data = await res.json();
          urls.push(data.secure_url);  
        } catch (err) {
          setError("Erreur de téléchargement sur Cloudinary.");
          console.error("Cloudinary upload error:", err);
        }
      }

      return urls;  
    };




    const modifyBureau = async ()=>{
      try{

                
        let bureauId; 

        if(!bureauToModify){
          setloaderServices(false);
          return;
        }

        bureauId = bureauToModify._id;

        if(!bureauId){
          return;
        }

        setloaderServices(true);

        const resp = await axios.patch(`${ENVIRONMENT.ENDPOINT}/bureau/${bureauId}`, {
          name : bureauNameToModify, 
          isOpen : isOpenToModify === "ouvert" ? true : false, 
          color : selectedColorForBureauToModify ?? "#000000", 
          services : selectedServicesToModify
        });
        if(resp.status === 200){
          setBureauName('');
          setselectedColorForBureauToModify('#1975f5');
          setIsOpenToModify("ouvert");
          setselectedServicesToModify([]);
          setbureauToModify(null);
          setloaderServices(false);
          setSuccess("Données modifiées avec succès.");
          fecthAllBureaux();
        }
        else{
          setloaderServices(false);
          setError("Oups, une erreur est survenue.")
        }
      }
      catch(e){
        setloaderServices(false);
        setError("Oups, une erreur est survenue.")
        console.log(e.message);
      }
    }



    const deleteService = async ()=>{
       try{

        if(!IdServiceToDelete){
          return;
        }

        setloaderServices(true);
      
        const resp = await axios.delete(`${ENVIRONMENT.ENDPOINT}/service/${IdServiceToDelete}`);

        if(resp.status === 200){
          setIdServiceToDelete(null);
          setNameServiceToDelete(null);
          setloaderServices(false);
          fetchAllUserServices();
          fecthAllBureaux();
          setSuccess("Service supprimé avec succès.");
        }
        else{
          setloaderServices(false);
          setError("Oups, une erreur est survenue.")
        }

      }
      catch(e){
        setloaderServices(false);
        setError("Oups, une erreur est survenue.")
        console.log(e.message);
      }
    }


    const deleteBureau = async ()=>{
      try{

        if(!idToDelete){
          return;
        }

        setloaderServices(true);
      
        const resp = await axios.delete(`${ENVIRONMENT.ENDPOINT}/bureau/${idToDelete}`);

        if(resp.status === 200){
          setIdToDelete(null);
          setNameToDelete(null);
          setloaderServices(false);
          fecthAllBureaux();
          setSuccess("Bureau supprimé avec succès.");
        }
        else{
          setloaderServices(false);
          setError("Oups, une erreur est survenue.")
        }

      }
      catch(e){
        setloaderServices(false);
        setError("Oups, une erreur est survenue.")
        console.log(e.message);
      }
    }



    const createNewService = async ()=>{

      try{

                
        let user = localStorage.getItem('user');
        let userStringified = JSON.parse(user);
        let userId = userStringified._id

        if(!userId || userId === ""){
          setloaderServices(false);
          return;
        }

        setloaderServices(true);
        const resp = await axios.post(`${ENVIRONMENT.ENDPOINT}/service/`, {
          name : NewserviceName, 
          description : NewServiceDescription,
          user : userId
        });

        if(resp.status === 200){
          setNewserviceName("");
          setNewServiceDescription("");
          setloaderServices(false);
          setNewServiceClicked(false);
          fetchAllUserServices();
          fecthAllBureaux();
        }
        else{
          setloaderServices(false);
          setError("Oups, une erreur est survenue.")
        }

      }
      catch(e){
        setloaderServices(false);
        setError("Oups, une erreur est survenue.")
        console.log(e.message);
      }
      
    }



     const updateService = async ()=>{

      try{

                
         
        if(!ServiceToModify){
          setloaderServices(false);
          return;
        }

        setloaderServices(true);
        const resp = await axios.patch(`${ENVIRONMENT.ENDPOINT}/service/${ServiceToModify._id}`, {
          name : NameServiceToModify, 
          description : descriptionServiceToModify
        });

        if(resp.status === 200){
          setNameServiceToModify("");
          setdescriptionServiceToModify("");
          setloaderServices(false);
          setServiceToModify(null);
          fetchAllUserServices();
          fecthAllBureaux();
        }
        else{
          setloaderServices(false);
          setError("Oups, une erreur est survenue.")
        }

      }
      catch(e){
        setloaderServices(false);
        setError("Oups, une erreur est survenue.")
        console.log(e.message);
      }
      
    }


    const createNewBureau = async ()=>{
      try{

                
        let establishmentId = localStorage.getItem('establishmentId');

        if(!establishmentId || establishmentId === ""){
          setloaderServices(false);
          return;
        }


        setloaderServices(true);

        const resp = await axios.post(`${ENVIRONMENT.ENDPOINT}/bureau/`, {
          establishmentId : establishmentId, 
          name : bureauName, 
          isOpen : isOpen === "ouvert" ? true : false, 
          color : selectedColorForBureau ?? "#000000", 
          services : selectedServices
        });
        if(resp.status === 200){
          setBureauName('');
          setselectedColorForBureau('#1975f5');
          setIsOpen("ouvert");
          setSelectedServices([]);
          setloaderServices(false);
          setNewBureauClicked(false);
          setSuccess("Données enregistrées avec succès.");
          fecthAllBureaux();
        }
        else{
          setloaderServices(false);
          setError("Oups, une erreur est survenue.")
        }
      }
      catch(e){
        setloaderServices(false);
        setError("Oups, une erreur est survenue.")
        console.log(e.message);
      }
    }




    const UpdateProfileInfos = async ()=>{
      try{

        setloader(true);

                
        let user = localStorage.getItem('user');
        let userStringified = JSON.parse(user);
        let userId = userStringified._id;

        const resp = await axios.patch(`${ENVIRONMENT.ENDPOINT}/user/${userId}`, {
          firstName : firstName, 
          lastName : lastName, 
          email : email, 
          mobile : mobile, 
          website : websitePersonal
        });
        if(resp.status === 200){
          console.warn(resp.data);
          setisProfileModified(false);
          setloader(false);
          setSuccess("Données modifiées avec succès.");
        }
        else{
          setloader(false);
          setisProfileModified(false);
          setError("Oups, une erreur est survenue.")
        }
      }
      catch(e){
        setloader(false);
        setisProfileModified(false);
        setError("Oups, une erreur est survenue.")
        console.log(e.message);
      }
    }



    

    const UpdateEtablissement = async ()=>{
      try{

        setloader(true);

                
        let establishmentId = localStorage.getItem('establishmentId');
        let imageUrls;

        if(uploadedImages && uploadedImages.length !== 0){
          imageUrls = await uploadImagesToCloudinary(uploadedImages);
        }
        else{
          imageUrls = imagesOld;
        }

        setUploadedImages([]);
        setimages(imageUrls);

        const resp = await axios.patch(`${ENVIRONMENT.ENDPOINT}/establishment/${establishmentId}`, {
          titre : etablissement, 
          description :description, 
          slogan : titre, 
          colorTitle : selectedColor , 
          website : website,
          email : emailEtablissement, 
          images : imageUrls
        });
        if(resp.status === 200){
          console.warn(resp.data);
          setisModified(false);
          setloader(false);
          setSuccess("Données enregistrées avec succès.");
        }

        else{
          setloader(false);
          setisModified(false);
          setError("Oups, une erreur est survenue.")
        }
      }
      catch(e){
        setloader(false);
        setisModified(false);
        setError("Oups, une erreur est survenue.")
        console.log(e.message);
      }
    }


    useEffect(()=>{
      fetchDataEtablissement();
      fetchDataUser();
      fetchAllUserServices();
      fecthAllBureaux();
    }, []);




    const selectedColorName = colors.find(c => c.code === selectedColor)?.name || "autre";
   
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
    <div ref={containerRef} className='compteContainer'  >

      <div className={`loading-overlay ${loader || loaderUser || loaderBureaux || loaderServices ? 'show' : ''}`}>
        <div className="loader"></div>
      </div>



      {
        userId && establishmentId &&
        <WebSocketClient
            userId={userId}
                        establishmentId={establishmentId} functionRefresh={()=>{alert("MongoDb Changed")}}

          />
      }

      <ErrorPopUp
        message={error}
        setMessage={setError}
      />
      
      
      <SuccessPopUp
        message={success}
        setMessage={setSuccess}
      />



      <NavbarTv 
        isFullscreen={isFullscreen}
        toggleFullscreenOnClick={toggleFullscreenOnClick}
      />
      <div className="insiderCompte">
        <div className="header">
          <button  style={{color : navigationIndex === 0 ? "#1a75c0" : "#303030"}} onClick={()=>{setnavigationIndex(0);}} >
            <div className="containerI">
              <i className='fa-solid fa-tv' ></i>
            </div>
            Réglages Établissement & TV
          </button>


          <button  style={{color : navigationIndex === 1 ? "#1a75c0" : "#303030"}} onClick={()=>{setnavigationIndex(1);}} >
            <div className="containerI">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-git-pull-request-arrow-icon lucide-git-pull-request-arrow"><circle cx="5" cy="6" r="3"/><path d="M5 9v12"/><circle cx="19" cy="18" r="3"/><path d="m15 9-3-3 3-3"/><path d="M12 6h5a2 2 0 0 1 2 2v7"/></svg>            </div>
            Gestion des Bureaux
          </button>
          
          <button  style={{color : navigationIndex === 2 ? "#1a75c0" : "#303030"}} onClick={()=>{setnavigationIndex(2);}} >
            <div className="containerI">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles-icon lucide-sparkles"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg>
            </div>
            Gestion des Services
          </button>

          <button  style={{color : navigationIndex === 3 ? "#1a75c0" : "#303030"}} onClick={()=>{setnavigationIndex(3);}} >
            <div className="containerI">
              <i class="fa-regular fa-user"></i>
            </div>
            Réglages Profil
          </button>
          <button   style={{color : "gainsboro"}} onClick={()=>{setnavigationIndex(4);}} >
            <div className="containerI">
              <i className='fa-solid fa-dollar-sign' ></i>
            </div>
            Paramètres Abonnements
          </button>
        </div>
        {
          navigationIndex === 0 ? 
          <div className="body">
            <div className="headerOfBody">
              <div className='usfwhud' > 
                Réglages Établissement & TV
              </div>
              <div className='uershwfuod' >
                Cette section vous permet de gérer votre établissement et l’affichage TV visible par les patients.
              </div>
            </div>
            
            <div className="bodyOfBodyX">
              <div className="usfwhud">
                Informations sur l’établissement 
              </div>
              <br />
              <div className="containerINput66">
                <div className='label' >  
                  Nom : 
                </div>
                <input type="text" value={etablissement} onChange={(e)=>{setEtablissement(e.target.value); if(!isModified){setisModified(true);}}} placeholder="Ex: Horizon Campus" />
              </div>
              <br />
              <div className="containerINput66">
                <div className='label' >  
                  Adresse email : 
                </div>
                <input type="text" value={emailEtablissement} onChange={(e)=>{setemailEtablissement(e.target.value); if(!isModified){setisModified(true);}}} placeholder="example@gmail.com" />
              </div>
              <br />
              <div className="containerINput66">
                <div className='label' >  
                  Site web : 
                </div>
                <input type="text"  value={website} onChange={(e)=>{setwebsite(e.target.value); if(!isModified){setisModified(true);}}}  placeholder="https://example.com" />
              </div>
            </div>

            <div className="bodyOfBodyX">
              <div className="usfwhud">
                Choix de la couleur principale 
              </div>
              <div className="containerINput66 containerINput66888">
                {colors.map((color) => (
                  <div
                    key={color.code}
                    className={`color-box ${selectedColor === color.code ? `selected selected-${color.name}` : ''}`}
                    style={{ backgroundColor: color.code }}
                    onClick={() => {setSelectedColor(color.code);if(isModified === false){setisModified(true)}}}
                    title={color.name}
                  />
                ))}
              </div>
              {selectedColor && (
                <div className="selected-text">
                  Couleur choisie : {selectedColorName}
                </div>
              )}
            </div>

            <div className="bodyOfBodyX noborderbottom">
              <div className="usfwhud">
                Message d’accroche
              </div>
              <br />
              <div className="containerINput66">
                <div className='label' >  
                  Titre accroche : 
                </div>
                <input type="text"  value={titre} onChange={(e)=>{settitre(e.target.value); if(!isModified){setisModified(true);}}}  placeholder="Veuillez saisir un titre ici..." />
              </div>
              <br />
              <div className="containerINput66">
                <div className='label' >  
                  Description complémentaire : 
                </div>
                <textarea 
                  value={description} onChange={(e)=>{setdescription(e.target.value); if(!isModified){setisModified(true);}}}  
                  placeholder="Veuillez saisir une description ici..." 
                ></textarea>
              </div>
            </div>
 

            <div className="bodyOfBodyX">
              <div className="usfwhud">
                Galerie d'images
              </div>
              <br />
                
                <div className="image-preview-container">
                {
                  uploadedImages && uploadedImages.length !== 0 ?
                  <>
                    {uploadedImages.map((file, index) => {
                      const src = URL.createObjectURL(file);
                      return (
                        <div key={index} className="image-wrapper">
                          <img src={src} alt={`img-${index}`} />
                          <button
                            className="delete-button"
                            onClick={() => {
                              const updated = [...uploadedImages];
                              updated.splice(index, 1);
                              setUploadedImages(updated);
                              if (!isModified) setisModified(true);
                            }}
                          >
                            <i className='fa-solid fa-xmark' ></i>
                          </button>
                        </div>
                      );
                    })}
                  </>
                  :
                  <div style={{display : "flex", flexDirection : "column"}}>
                    <div
                      style={{color : "gray"}}
                    >
                      Images actuelles du carrousel :
                    </div>
                    <br />
                    <div style={{display : "flex", flexDirection : "row"}} >
                      {images.map((src, index) => {
                        return (
                          <div key={index} className="image-wrapper">
                            <img src={src} alt={`img-${index}`} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                }
                </div>
                <br />
                <div className="containerINput66">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files);
                      setUploadedImages((prev) => [...prev, ...files]);
                      if (!isModified) setisModified(true);
                    }}
                    className='sfgwudosfwhdsfowd'
                  />
                </div>
            </div>


            
            <div className="bodyOfBodyX bodyOfBodyX2"> 
              <button onClick={()=>{handleAnnuler();}}  disabled={loader || !isModified} style={{opacity : isModified ? 1 : 0.5, cursor : isModified ? "pointer" : "default"}} className='buttonAnnuler' >
                Annuler
              </button>&nbsp;&nbsp;&nbsp;
              <button  onClick={()=>{UpdateEtablissement();}}  disabled={loader || !isModified} style={{opacity : isModified ? 1 : 0.5, cursor : isModified ? "pointer" : "default"}} className='buttonSave' >
                Enregistrer les modifications
              </button>
            </div>



          </div>
          :
          navigationIndex === 3 ? 
          <div className="body">
            <div className="headerOfBody">
              <div className='usfwhud' > 
               Réglages Profil
              </div>
              <div className='uershwfuod' >
                Accédez à vos informations personnelles et mettez à jour votre profil utilisateur.
              </div>
            </div>
            <div className="bodyOfBodyX ">
              <div className="usfwhud">
                Informations personnelles 
              </div>
              <br />
              <div className="ijspwdfi">
                <div className="containerINput66">
                  <div className='label' >  
                    Nom de famille : 
                  </div>
                  <input type="text"  value={firstName} onChange={(e)=>{setfirstName(e.target.value); if(!isProfileModified){setisProfileModified(true);}}}  placeholder="Veuillez saisir votre nom ici..." />
                </div>
                <div className="containerINput66">
                  <div className='label' >  
                    Prénom :  
                  </div>
                  <input type="text"  value={lastName} onChange={(e)=>{setlastName(e.target.value); if(!isProfileModified){setisProfileModified(true);}}}  placeholder="Veuillez saisir votre prénom ici..." />
                </div>
                </div>
            </div>


            <div className="bodyOfBodyX ">
              <div className="usfwhud">
                 Informations de contact
              </div>
              <br />
              <div className="ijspwdfi">
                <div className="containerINput66">
                  <div className='label' >  
                   Adresse email : 
                  </div>
                  <input type="text"  value={email} onChange={(e)=>{setemail(e.target.value); if(!isProfileModified){setisProfileModified(true);}}}  placeholder="Veuillez saisir votre adresse email ici..." />
                </div>
                <div className="containerINput66">
                  <div className='label' >  
                 Numéro de téléphone : 
                  </div>
                  <input type="text"  value={mobile} onChange={(e)=>{setmobile(e.target.value); if(!isProfileModified){setisProfileModified(true);}}}  placeholder="Veuillez saisir votre numéro de téléphone ici..." />
                </div>
                </div>
            </div>


             
            <div className="bodyOfBodyX">
              <div className="usfwhud">
                Site Web : 
              </div>
              <div className="containerINput66">
                <input type="text"  value={websitePersonal} onChange={(e)=>{setwebsitePersonal(e.target.value); if(!isProfileModified){setisProfileModified(true);}}}  placeholder="https://example.com" />
              </div>
            </div>


            <div className="bodyOfBodyX bodyOfBodyX2"> 
              <button onClick={()=>{handleAnnulerProfileModification();}}  disabled={loader || !isProfileModified} style={{opacity : isProfileModified ? 1 : 0.5, cursor : isProfileModified ? "pointer" : "default"}} className='buttonAnnuler' >
                Annuler
              </button>&nbsp;&nbsp;&nbsp;
              <button  onClick={()=>{UpdateProfileInfos();}}  disabled={loader || !isProfileModified} style={{opacity : isProfileModified ? 1 : 0.5, cursor : isProfileModified ? "pointer" : "default"}} className='buttonSave' >
                Enregistrer les modifications
              </button>
            </div>



          </div>
          :
          navigationIndex === 1 ? 
          <div className="body">
            <div className="headerOfBody">
              <div className='usfwhud' > 
                Gestion des Bureaux
              </div>
              <div className='uershwfuod' >
                 Cette section vous permet de configurer les bureaux physiques, leurs relations avec les services et leurs disponibilités au sein de l’établissement.   
              </div>
            </div>
            <div className="headerOfBody headerOfBodyModified">
              <div className='usfwhud' > 
                Total des bureaux : {bureaux ? bureaux.length : ""}
              </div>
              <div className='uershwfuod' >
                <button disabled={loaderBureaux} className='btnAddNewbureau' onClick={()=>{setNewBureauClicked(true);}}  >
                  <i className='fa-solid fa-plus' ></i>&nbsp;&nbsp;Ajouter un nouveau bureau
                </button>
              </div>
            </div>

           {
            (bureaux && bureaux.length !== 0 )?
             <div className="tableContainer">
              <table className="bureauTable">
                <thead>
                  <tr>
                    <th>Nom du bureau</th>
                    <th>Services associés</th>
                    <th>Disponibilité</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bureaux.map((bureau) => {
                    const nomsServicesArray = bureau.services
                      .map((srvObj) => srvObj?.id?.name)  
                      .filter((name) => typeof name === 'string' && name.trim() !== '');

                    const nomsServices = nomsServicesArray.length > 0
                      ? nomsServicesArray.join('  /  ')
                      : '--';

                    return (
                      <tr key={bureau._id}>
                        <td>
                          <div className="flexiMa" style={{ color: bureau.color }}>
                            <div
                              className="caseColor"
                              style={{ background: bureau.color }}
                            />
                            <div>&nbsp;&nbsp;{bureau.name}</div>
                          </div>
                        </td>

                        <td>{(nomsServices && nomsServices.length !== 0) ? nomsServices : "---"}</td>

                        <td className={bureau.isOpen ? 'ouvert' : 'ferme'}>
                          {bureau.isOpen ? 'Ouvert' : 'Fermé'}
                        </td>

                        <td>
                          <button onClick={()=>{
                            console.warn(bureau);
                            setbureauToModify(bureau);
                            setbureauNameToModify(bureau.name);
                            setIsOpenToModify(bureau.isOpen === true ? "ouvert" : "ferme");
                            setselectedColorForBureauToModify(bureau.color);
                          }}  className="btnAction edit">
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                          <button onClick={()=>{setIdToDelete(bureau._id);setNameToDelete(bureau.name);}} className="btnAction delete">
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            :
            <div style={{
              display : "flex", 
              alignItems : "center", 
              justifyContent : "center", 
              height : '100px',
              color : "rgb(164, 164, 164)",
           }} >
              Aucune donnée 
            </div>
           }
           
           

            {idToDelete && (
              <div className="modal-overlayX">
                <div className="modal-content">

                  <div className="modal-header">
                    <h2>Êtes-vous sûr de vouloir supprimer le bureau</h2>
                    <button className="close-button" onClick={()=>{
                      setIdToDelete(null);setNameToDelete(null);
                    }}>
                      <i className='fa-solid fa-xmark' style={{fontSize : '17px'}} ></i>
                    </button>
                  </div>

                  
                  <div className="modal-header modal-headerNoBorder modaleHeaderNoPADDIN">
                    <p>
                      Cette action est irréversible : toute la file d’attente associée sera également supprimée.
                    </p>
                  </div>


                  <div className="modal-header modal-headerNoBorder modaleHeaderNoPADDIN">
                    <p>
                     Bureau à supprimer : {nameToDelete ?? "---"}
                    </p>
                  </div>


                  <div className="modal-footer">
                    <button className="btn-cancel" onClick={()=>{
                      setIdToDelete(null);setNameToDelete(null);
                    }}>
                      Annuler
                    </button>
                    <button
                      className="btn-delete"
                      onClick={deleteBureau}
                      disabled={loaderServices}
                    >
                      Oui, je supprime
                    </button>
                  </div>

                </div>
              </div>
            )}



            {NewBureauClicked && (
              <div className="modal-overlayX">
                <div className="modal-content">

                  <div className="modal-header">
                    <h2>Ajouter un bureau</h2>
                    <button className="close-button" onClick={()=>{
                      setNewBureauClicked(false);
                    }}>
                      <i className='fa-solid fa-xmark' style={{fontSize : '17px'}} ></i>
                    </button>
                  </div>

                  <div className="modal-body">
                    <div className="form-group">
                      <label htmlFor="bureau-name">Nom du bureau :</label>
                      <input
                        id="bureau-name"
                        type="text"
                        value={bureauName}
                        onChange={(e) => setBureauName(e.target.value)}
                        placeholder="Entrez le nom du bureau..."
                      />
                    </div>


                    <div className="form-group">
                      <label htmlFor="status-select">Disponibilité :</label>
                      <select
                        id="status-select"
                        value={isOpen}
                        onChange={(e) => setIsOpen(e.target.value)}
                      >
                        <option value="ouvert">Ouvert</option>
                        <option value="ferme">Fermé</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Couleur :</label>
                      <div className="color-picker">
                        {colors.map((color) => (
                          <div
                            key={color.code}
                            className={`color-box ${selectedColorForBureau === color.code ? `selected selected-${color.name}` : ''}`}
                            style={{ backgroundColor: color.code }}
                            onClick={() => setselectedColorForBureau(color.code)}
                            title={color.name}
                          />
                        ))}
                      </div>
                    </div>


                    <div className="form-group">
                      <label style={{marginBottom : "0.2rem"}} >Services associés : </label>
                      <div className="multi-select">
                        {services.map((service) => (
                          <div key={!service?._id ? "123" : service._id} className="ms-option">
                            <input
                              type="checkbox"
                              id={`srv-${!service?._id ? "123" : service._id}`}
                              checked={selectedServices.includes(!service?._id ? "123" : service._id)}
                              onChange={() => toggleService(!service?._id ? "123" : service._id)}
                            />
                            <label onClick={() => toggleService(!service?._id ? "123" : service._id)} htmlFor={`srv-${!service?.name ? "123" : service.name}`}>{!service?.name ? "--" : service.name}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button className="btn-cancel" onClick={()=>{
                      setNewBureauClicked(false);
                    }}>
                      Annuler
                    </button>
                    <button
                      className="btn-save"
                      onClick={createNewBureau}
                      disabled={!bureauName.trim() || loaderServices}
                    >
                      Enregistrer
                    </button>
                  </div>
                </div>
              </div>
            )}





            {bureauToModify && (
              <div className="modal-overlayX">
                <div className="modal-content">

                  <div className="modal-header">
                    <h2>Modifier le bureau</h2>
                    <button className="close-button" onClick={()=>{
                      setbureauToModify(null);
                    }}>
                      <i className='fa-solid fa-xmark' style={{fontSize : '17px'}} ></i>
                    </button>
                  </div>

                  <div className="modal-body">
                    <div className="form-group">
                      <label htmlFor="bureau-name">Nom du bureau :</label>
                      <input
                        id="bureau-name"
                        type="text"
                        value={bureauNameToModify}
                        onChange={(e) => setbureauNameToModify(e.target.value)}
                        placeholder="Entrez le nom du bureau..."
                      />
                    </div>


                    <div className="form-group">
                      <label htmlFor="status-select">Disponibilité :</label>
                      <select
                        id="status-select"
                        value={isOpenToModify}
                        onChange={(e) => setIsOpenToModify(e.target.value)}
                      >
                        <option value="ouvert">Ouvert</option>
                        <option value="ferme">Fermé</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Couleur :</label>
                      <div className="color-picker">
                        {colors.map((color) => (
                          <div
                            key={color.code}
                            className={`color-box ${selectedColorForBureauToModify === color.code ? `selected selected-${color.name}` : ''}`}
                            style={{ backgroundColor: color.code }}
                            onClick={() => setselectedColorForBureauToModify(color.code)}
                            title={color.name}
                          />
                        ))}
                      </div>
                    </div>


                    <div className="form-group">
                      <label style={{ marginBottom: "0.2rem" }}>Services associés :</label>
                      <div className="multi-select">
                        {services
                        .filter((service) => service != null)
                        .map((service, idx) => {
                          if (!service._id) {
                            return null;
                          }

                          const id = service._id; 
                          const nameService = service.name || ""; 

                          return (
                            <div key={id} className="ms-option">
                              <input
                                type="checkbox"
                                id={`srv-${id}`}
                                checked={selectedServicesToModify.includes(id)}
                                onChange={() => toggleServiceToModify(id)}
                              />
                              <label onClick={() => toggleServiceToModify(id)}>
                                {nameService}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                  </div>

                  <div className="modal-footer">
                    <button className="btn-cancel" onClick={()=>{
                      setbureauToModify(null);
                    }}>
                      Annuler
                    </button>
                    <button
                      className="btn-save"
                      onClick={modifyBureau}
                      disabled={!bureauNameToModify.trim() || loaderServices}
                    >
                      Enregistrer
                    </button>
                  </div>
                </div>
              </div>
            )}


          </div>
          :
          navigationIndex === 2 ? 
          <div className="body">
            <div className="headerOfBody">
              <div className='usfwhud' > 
                Gestion des Services
              </div>
              <div className='uershwfuod' >
                Cette section vous permet d’ajouter, modifier ou supprimer les services proposés par votre établissement.
              </div>
            </div>

            <div className="headerOfBody headerOfBodyModified">
              <div className='usfwhud' > 
                Total des services : {services ? services.length : ""}
              </div>
              <div className='uershwfuod' >
                <button disabled={loaderServices} className='btnAddNewbureau' onClick={()=>{setNewServiceClicked(true);}}  >
                  <i className='fa-solid fa-plus' ></i>&nbsp;&nbsp;Ajouter un nouveau service
                </button>
              </div>
            </div>

            {
            (services && services.length !== 0 )?
             <div className="tableContainer">
              <table className="bureauTable">
                <thead>
                  <tr>
                    <th>Nom du service</th>
                    <th>Description du service</th>
                    <th>Date de création</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service) => {
                    return (
                      <tr key={service._id}>
                        <td>
                        {
                          service.name ?? "---"
                        }
                        </td>

                        <td>
                        {
                          service.description ?? "---"
                        }
                        </td>

                        <td>
                        {
                          formatDateTime(service.createdAt)
                        }
                        </td>

                        <td>
                          <button
                            onClick={()=>{
                              setNameServiceToModify(service.name ?? "");
                              setdescriptionServiceToModify(service.description ?? "");
                              setServiceToModify(service);
                            }}  
                            className="btnAction edit"
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                          <button onClick={()=>{setIdServiceToDelete(service._id);setNameServiceToDelete(service.name);}} className="btnAction delete">
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
             </div>
             :
              <div style={{
                display : "flex", 
                alignItems : "center", 
                justifyContent : "center", 
                height : '100px',
                color : "rgb(164, 164, 164)",
             }} >
                Aucune donnée 
              </div>
            }



            {IdServiceToDelete && (
              <div className="modal-overlayX">
                <div className="modal-content">

                  <div className="modal-header ">
                    <h2>Êtes-vous sûr de vouloir supprimer le service</h2>
                    <button className="close-button" onClick={()=>{
                      setIdServiceToDelete(null);setNameServiceToDelete(null);
                    }}>
                      <i className='fa-solid fa-xmark' style={{fontSize : '17px'}} ></i>
                    </button>
                  </div>


                  <div className="modal-header modal-headerNoBorder modaleHeaderNoPADDIN">
                    <p>
                      Cette action est irréversible.
                    </p>
                  </div>


                  <div className="modal-header modal-headerNoBorder modaleHeaderNoPADDIN">
                    <p>
                      Service à supprimer : { NameServiceToDelete ?? "---" }
                    </p>
                  </div>


                  <div className="modal-footer">
                    <button className="btn-cancel" onClick={()=>{
                      setIdServiceToDelete(null);setNameServiceToDelete(null);
                    }}>
                      Annuler
                    </button>
                    <button
                      className="btn-delete"
                      onClick={deleteService}
                      disabled={loaderServices}
                    >
                      Oui, je supprime
                    </button>
                  </div>

                </div>
              </div>
            )}






             {NewServiceClicked && (
              <div className="modal-overlayX">
                <div className="modal-content">

                  <div className="modal-header">
                    <h2>Ajouter un service</h2>
                    <button className="close-button" onClick={()=>{
                      setNewServiceClicked(false);
                    }}>
                      <i className='fa-solid fa-xmark' style={{fontSize : '17px'}} ></i>
                    </button>
                  </div>

                  <div className="modal-body">
                    <div className="form-group">
                      <label htmlFor="bureau-name">Nom du service :</label>
                      <input
                        id="bureau-name"
                        type="text"
                        value={NewserviceName}
                        onChange={(e) => setNewserviceName(e.target.value)}
                        placeholder="Entrez le nom du service..."
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="bureau-name">Description du service :</label>
                      <input
                        id="bureau-name"
                        type="text"
                        value={NewServiceDescription}
                        onChange={(e) => setNewServiceDescription(e.target.value)}
                        placeholder="Entrez la description du service..."
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button className="btn-cancel" onClick={()=>{
                      setNewServiceClicked(false);
                    }}>
                      Annuler
                    </button>
                    <button
                      className="btn-save"
                      onClick={createNewService}
                      disabled={!NewserviceName.trim() || loaderServices}
                    >
                      Enregistrer
                    </button>
                  </div>
                </div>
              </div>
            )}





            {ServiceToModify && (
              <div className="modal-overlayX">
                <div className="modal-content">

                  <div className="modal-header">
                    <h2>Modifier un service</h2>
                    <button className="close-button" onClick={()=>{
                      setServiceToModify(null);
                    }}>
                      <i className='fa-solid fa-xmark' style={{fontSize : '17px'}} ></i>
                    </button>
                  </div>

                  <div className="modal-body">
                    <div className="form-group">
                      <label htmlFor="bureau-name">Nom du service :</label>
                      <input
                        id="bureau-name"
                        type="text"
                        value={NameServiceToModify}
                        onChange={(e) => setNameServiceToModify(e.target.value)}
                        placeholder="Entrez le nouveau nom du service..."
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="bureau-name">Description du service :</label>
                      <input
                        id="bureau-name"
                        type="text"
                        value={descriptionServiceToModify}
                        onChange={(e) => setdescriptionServiceToModify(e.target.value)}
                        placeholder="Entrez la nouvelle description du service..."
                      />
                    </div>
                  </div>


                  <div className="modal-footer">
                    <button className="btn-cancel" onClick={()=>{
                      setServiceToModify(null);
                    }}>
                      Annuler
                    </button>
                    <button
                      className="btn-save"
                      onClick={updateService}
                      disabled={!NameServiceToModify.trim() || loaderServices}
                    >
                      Enregistrer
                    </button>
                  </div>
                </div>
              </div>
            )}



          </div>
          :
          navigationIndex === 4 &&
          <div className="body">
            <div className="headerOfBody">
              <div className='usfwhud' > 
                Paramètres Abonnements
              </div>
              <div className='uershwfuod' >
                Consultez, modifiez ou annulez vos abonnements et services actifs.
              </div>
            </div>
          </div>

        }
        
      </div>
    </div>
  )
}

export default Reglages
