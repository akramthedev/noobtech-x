import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import {ENVIRONMENT} from "../../environments"; 


function Register() {
  const [searchParams] = useSearchParams();
  const planFromUrl = searchParams.get('plan') || '';
  const [selectedPlan, setSelectedPlan] = useState(planFromUrl);

  const [establishment, setEstablishment] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  let ENDPOINT = ENVIRONMENT.ENDPOINT;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getPlanPrice = (plan) => {
    if (plan === 'premium') return '3999 MAD / mois';
    if (plan === 'standard') return '0 MAD / mois';
    return '999 MAD / mois';
  };

  useEffect(() => {
    setSelectedPlan(planFromUrl);
  }, [planFromUrl]);

  const onRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const payload = {
      firstName : "",
      lastName : "",
      establishmentName : establishment,
      email,
      password,
      plan: selectedPlan
    };

    try {
      const response = await axios.post(`${ENDPOINT}/auth/register`, payload);
      console.log('Register successful:', response.data);
      if(response.status === 201){
        navigate("/login"); 
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="containerLogin">
      <form className="insiderContainer">
        <p className="sfjwdfip1">Commencer l’aventure</p>
        <p className="sfjwdfip2">
          Inscrivez-vous pour effectuer vos paiements et suivre vos données.
        </p>

        {selectedPlan && (
          <div className="selected-plan-box">
            <div className="sfwdifx" />
            <b className="plan-title">
              Plan sélectionné : {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)}
            </b>
            <p className="priceOfPlan">{getPlanPrice(selectedPlan)}</p>
            <br />
          </div>
        )}
{/* 
        <div className="containerOfInput">
          <label>Nom et prénom :</label>
          <input
            type="text"
            placeholder="Veuillez saisir nom complet..."
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div> */}
        <div className="containerOfInput">
          <label>Nom d'établissement :</label>
          <input
            type="text"
            placeholder="Veuillez saisir le nom de votre établissement..."
            value={establishment}
            onChange={(e) => setEstablishment(e.target.value)}
          />
        </div>
        <div className="containerOfInput">
          <label>Adresse email :</label>
          <input
            type="email"
            placeholder="Veuillez saisir votre adresse email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="containerOfInput containerOfInput2">
          <label>Mot de passe :</label>
          <input
            type="password"
            placeholder="Veuillez saisir votre mot de passe..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button
          type='submit'
          className="Connexionbtn"
          onClick={onRegister}
          disabled={loading}
        >
          {loading ? 'Création du compte...' : "S'inscrire"}
        </button>

        <div className="usfwodfuushwdfo">
          Déjà compte ? <a href="/login">Connectez-vous</a>
        </div>
      </form>
    </div>
  );
}

export default Register;
