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

    const service = await Service.findById(id);

    if (!service) {
      return res.status(401).json({ error: 'service introuvable' });
    }
   
    res.status(200).json(service);
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      return res.status(401).json({ error: 'service introuvable' });
    }
   
    res.status(200).json(service);
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});




router.get('/all/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const service = await Service.find({
      user : userId
    });

    if (!service) {
      return res.status(401).json({ error: 'service introuvable' });
    }
   
    res.status(200).json(service);
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});





router.post('/', async (req, res) => {
  try {
    const { name,description, user } = req.body;

    const service = await Service.create({
      name, 
      description, 
      user
    })

    if (!service) {
      return res.status(401).json({ error: 'service not created' });
    }
   
    res.status(200).json(service);
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});






router.patch('/:id', async (req, res) => {
  try {
    const { name, description } = req.body;
    const { id } = req.params;

    const service = await Service.findByIdAndUpdate(id, {
      name, 
      description
    })

    if (!service) {
      return res.status(401).json({ error: 'service not created' });
    }
   
    res.status(200).json(service);
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});
 

module.exports = router;