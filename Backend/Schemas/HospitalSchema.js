const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const schema = mongoose.Schema

const HospitalSchema = new schema({

    name: String, 
    email: String, 
    address: String, 
    password: String, 
    organizations: [String]
})


//hashing the password

HospitalSchema.pre('save', async function(next){

    if(this.isModified('password'))
    {
        this.password = bcrypt.hash(this.password, 8)
    }

    next()
})


const Hospital = mongoose.model('Hospital', HospitalSchema)

module.exports= Hospital