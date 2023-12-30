const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const schema = mongoose.Schema

const BloodRequestsSchema = new schema({

    hospital: String, 
    organization: String,
    quantity: Number,
    blood_group: String,
    status: String,
    possibility: String
   
})




const BloodRequests = mongoose.model('BloodRequest', BloodRequestsSchema)

module.exports= BloodRequests