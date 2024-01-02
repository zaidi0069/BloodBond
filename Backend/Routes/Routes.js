const express = require('express');
const router = express.Router();
const {donorlogin, donorsignup,  validate, donordonate, history} = require('../Controllers/DonorCtrl')
const {organizationlogin, organizationsignup, organizations, inventory, donors, bloodrequests, orgrequesthandling, bloodrequestshistory} = require('../Controllers/OrganizationCtrl')
const auth = require('../Middlewares/Authmw');
const { hospitalsignup, hospitallogin, linkedorgs, hospitalrequest, hospitalrequestshistory } = require('../Controllers/HospitalCtrl');
const {adminsignup, adminlogin, allbloodrequests, alltransactions} = require('../Controllers/AdminCtrl')


router.get('/', (req, res) => {
    res.send('Home Page')
})


router.get('/alltransactions', auth, alltransactions)
router.get('/allbloodrequests',auth,  allbloodrequests)
router.post('/donorlogin', donorlogin)
router.get('/donors',auth,  donors)
router.post('/validate', auth,  validate)
router.get('/inventory', auth, inventory)

router.get('/organizations',   organizations)
router.get('/linkedorgs',auth,  linkedorgs)
router.get('/bloodrequestshistory',auth, bloodrequestshistory)
router.get('/bloodrequests',auth,  bloodrequests)
router.get('/hospitalrequestshistory',auth,  hospitalrequestshistory)

router.post('/history', auth, history)
router.post('/donorsignup',  donorsignup)
router.post('/organizationlogin', organizationlogin)
router.post('/organizationsignup', organizationsignup)
router.post('/orgrequesthandling',auth,  orgrequesthandling)
router.post('/donordonate',auth,  donordonate)

router.post('/hospitalsignup',  hospitalsignup)
router.post('/hospitallogin',  hospitallogin)
router.post('/hospitalrequest',auth,  hospitalrequest)

router.post('/adminlogin',  adminlogin)
router.post('/adminsignup',  adminsignup)

module.exports = router

