const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const User = require('../models/User');
const Establishment = require('../models/Establishment');


router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const establishment = await Establishment.findById(id);

    if (!establishment) {
      return res.status(401).json({ error: 'Establishment introuvable' });
    }
   
    res.status(200).json(establishment);
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});


router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { titre, description, email,  slogan, colorTitle, website, images } = req.body;

    console.warn("Executed...");

    const establishment = await Establishment.findByIdAndUpdate(id, {
      title : titre, 
      colorTitle : colorTitle, 
      slogan : slogan, 
      description : description, 
      website : website,
      email : email, 
      images : images
    });

    if (!establishment) {
      return res.status(401).json({ error: 'Establishment not modified' });
    }
   
    res.status(200).json(establishment);
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});


module.exports = router;