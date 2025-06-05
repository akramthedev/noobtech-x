const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const User = require('../models/User');
const Establishment = require('../models/Establishment');
const Bureau = require('../models/Bureau');
const Ticket = require('../models/Ticket');
const Service = require('../models/Service');


router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(401).json({ error: 'user introuvable' });
    }
   
    res.status(200).json(user);
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

 


router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, mobile, website } = req.body;

    const user = await User.findByIdAndUpdate(id, {
        firstName : firstName ,  
        lastName : lastName, 
        email : email, 
        mobile : mobile, 
        website : website
    });

    if (!user) {
      return res.status(401).json({ error: 'user introuvable' });
    }
   
    res.status(200).json({
        message : "success"
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

 


 

module.exports = router;