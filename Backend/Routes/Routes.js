const express = require('express');
const router = express.Router();
const {donorlogin, donorsignup,  validate, donordonate, history} = require('../Controllers/DonorCtrl')
const {organizationlogin, organizationsignup, organizations, inventory} = require('../Controllers/OrganizationCtrl')
const auth = require('../Middlewares/Authmw')

// app.set('views', '../views');

router.get('/', (req, res) => {
    res.send('Home Page')
})



router.post('/donorlogin', donorlogin)
router.post('/validate', auth,  validate)
router.get('/inventory', inventory)
router.get('/organizations', organizations)
router.post('/history', history)
router.post('/donorsignup', donorsignup)
router.post('/organizationlogin', organizationlogin)
router.post('/organizationsignup', organizationsignup)
router.post('/donordonate', donordonate)
// router.post('/organizationsignup', signup)

module.exports = router

