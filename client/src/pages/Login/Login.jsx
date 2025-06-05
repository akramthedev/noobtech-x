import React, { useState } from 'react';
import axios from 'axios';
import "./index.css";
import { ENVIRONMENT } from "../../environments";
import { useNavigate } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setloading] = useState(false);

  let ENDPOINT = ENVIRONMENT.ENDPOINT;
  const navigate = useNavigate();

  const seConnecter = async (e) => {
    e.preventDefault();
    setloading(true);
    setError(null);
    try {
      const response = await axios.post(`${ENDPOINT}/auth/login`, { email, password });

      const { token, utilisateur } = response.data;
      let establishmentId = response.data?.utilisateur?.establishment;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(utilisateur));
      localStorage.setItem('establishmentId', establishmentId);

      console.log('ESTABLISHMENT ID :', establishmentId);


      setloading(false);
      navigate('/dashboard/reglages');

    } catch (err) {
      setloading(false);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Erreur serveur');
      }
      console.error('Login error:', err);
    }
  };

  return (
    <div className="containerLogin">
      <form className="insiderContainer">
        <p className="sfjwdfip1">
          Connectez-vous
        </p>
        <p className="sfjwdfip2">
          Pour suivre vos paiements et modifier vos données.
        </p>    
        <div className="containerOfInput">
          <label>
            Adresse email :  
          </label>
          <input
            type="text"
            placeholder="Veuillez saisir votre adresse email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="containerOfInput containerOfInput2">
          <label>
            Mot de passe :  
          </label>
          <input
            type="password"
            placeholder="Veuillez saisir votre mot de passe..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
        <button
          type='submit'
          className="Connexionbtn"
          onClick={seConnecter}
          disabled={loading}
        >
          {
            loading ? "Connexion en en cours..." : "Se connecter"
          }
        </button>
        <div className="usfwodfuushwdfo">
          Aucun compte ? <a href="/register">Inscrivez-vous</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
