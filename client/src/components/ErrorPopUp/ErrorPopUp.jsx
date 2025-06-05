import React, { useEffect, useState } from 'react';
import "./index.css";

const ErrorPopUp = ({ message, setMessage }) => {
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
    <div className={`container ${visible ? 'show' : ''}`}>
      <div className='popup'>
        <div className="rounded">
          <i className='fa-solid fa-xmark'></i>
        </div>
        &nbsp;&nbsp;
        <div className="message">
          {message}
        </div>
      </div>
    </div>
  );
};

export default ErrorPopUp;
