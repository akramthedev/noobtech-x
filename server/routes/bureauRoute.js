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

    const bureau = await Bureau.findById(id);

    if (!bureau) {
      return res.status(401).json({ error: 'bureau introuvable' });
    }
   
    res.status(200).json(bureau);
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});






router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const bureau = await Bureau.findByIdAndDelete(id);

    if (!bureau) {
      return res.status(401).json({ error: 'bureau introuvable' });
    }
   
    res.status(200).json(bureau);
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});






router.get('/all/:establishmentId', async (req, res) => {
  try {
    const { establishmentId } = req.params;

    const allBureaux = await Bureau.find({ establishmentId })
      .populate({
        path: 'services.id',     
        select: 'name',            
      })
      .exec();

    if (!allBureaux) {
      return res.status(404).json({ error: 'Aucun bureau trouvé pour cet établissement' });
    }

    return res.status(200).json(allBureaux);
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

 

 



router.post('/', async (req, res) => {
  try {
    const { establishmentId, name, isOpen, color, services } = req.body;


    const servicesWithQueue = Array.isArray(services)
      ? services.map((serviceId) => ({
          id: serviceId,
          queue: [],  
        }))
      : [];


    const bureau = await Bureau.create({
        establishmentId, 
        name, 
        isOpen, 
        color, 
        services: servicesWithQueue,
    });

    if (!bureau) {
      return res.status(401).json({ error: 'bureau introuvable' });
    }
    

    res.status(200).json({
        message : "success"
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});








router.patch('/:bureauId', async (req, res) => {
  try {
    const { name, isOpen, color, services } = req.body;
    const { bureauId } = req.params;

    const servicesWithQueue = Array.isArray(services)
      ? services.map((serviceId) => ({
          id: serviceId,
          queue: [],  
        }))
      : [];


    const bureau = await Bureau.findByIdAndUpdate(bureauId, {
        name, 
        isOpen, 
        color, 
        services: servicesWithQueue,
    });

    if (!bureau) {
      return res.status(401).json({ error: 'bureau introuvable' });
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