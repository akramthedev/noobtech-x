import React, { useEffect, useState } from 'react';
import "./index.css";

const SuccessPopUp = ({ message, setMessage }) => {
  const [visible, setVisible] = useState(false);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    if (message) {
      setRendered(true);  
      setTimeout(() => setVisible(true), 20);  

      const timeout = setTimeout(() => {
        setVisible(false); 
        setTimeout(() => {
          setRendered(false);  
          setMessage(null);
        }, 400); 
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [message, setMessage]);

  if (!rendered) return null;

  return (
    <div className={`container1 ${visible ? 'show' : ''}`}>
      <div className='popup1'>
        <div className="rounded1">
          <i className='fa-solid fa-check'></i>
        </div>
        &nbsp;&nbsp;
        <div className="message1">
          {message}
        </div>
      </div>
    </div>
  );
};

export default SuccessPopUp;
