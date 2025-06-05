const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const User = require('../models/User');
const Establishment = require('../models/Establishment');


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const utilisateur = await User.findOne({ email });
    if (!utilisateur) {
      return res.status(401).json({ error: 'Utilisateur introuvable' });
    }

    const isMatch = await bcrypt.compare(password, utilisateur.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Mot de passe incorrect' });
    }

    const payload = {
      id: utilisateur._id,
      email: utilisateur.email,
      fullName: utilisateur.fullName
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: '300d'  
    });

    res.status(200).json({
      token,
      utilisateur: utilisateur
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});





router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, establishmentName , email, password } = req.body;
    let establishmentId = "";
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const establishmentCreated = new Establishment({
      title : establishmentName, 
      lastName : lastName, 
      firstName : firstName, 
      slogan : "",
      colorTitle : "#303030", 
      description : "", 
    })

    await establishmentCreated.save();

    if(establishmentCreated){
      establishmentId = establishmentCreated._id;
    }

    const utilisateur = new User({
      email,
      password: hashedPassword, 
      establishment : establishmentId ?? ""
    });

    await utilisateur.save();

    res.status(201).json({
      utilisateur: {
        id: utilisateur._id,
        email: utilisateur.email,
        establishment : establishmentId
      }
    });

  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});



router.post('/registerAsAdmin', async (req, res) => {
  try {
    const {  email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const utilisateur = new User({
      email,
      password: hashedPassword, 
      userType : "admin"
    });

    await utilisateur.save();

    res.status(201).json({
      utilisateur: {
        id: utilisateur._id,
        email: utilisateur.email,
      }
    });

  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

 

module.exports = router;