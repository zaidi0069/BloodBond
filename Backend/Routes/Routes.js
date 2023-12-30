const express = require('express');
const router = express.Router();
const {donorlogin, donorsignup,  validate, donordonate, history} = require('../Controllers/DonorCtrl')
const {organizationlogin, organizationsignup, organizations, inventory, donors, bloodrequests, orgrequesthandling} = require('../Controllers/OrganizationCtrl')
const auth = require('../Middlewares/Authmw');
const { hospitalsignup, hospitallogin, linkedorgs, hospitalrequest } = require('../Controllers/HospitalCtrl');

// app.set('views', '../views');

router.get('/', (req, res) => {
    res.send('Home Page')
})



router.post('/donorlogin', donorlogin)
router.get('/donors', donors)
router.post('/validate', auth,  validate)
router.get('/inventory', inventory)

router.get('/organizations',  organizations)
router.get('/linkedorgs', linkedorgs)
router.get('/bloodrequests', bloodrequests)
router.post('/history', history)
router.post('/donorsignup', donorsignup)
router.post('/organizationlogin', organizationlogin)
router.post('/organizationsignup', organizationsignup)
router.post('/orgrequesthandling', orgrequesthandling)
router.post('/donordonate', donordonate)

router.post('/hospitalsignup', hospitalsignup)
router.post('/hospitallogin', hospitallogin)
router.post('/hospitalrequest', hospitalrequest)
// router.post('/organizationsignup', signup)

module.exports = router

