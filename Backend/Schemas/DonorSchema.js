const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const donorSchema = new Schema({
    name: String,
    age: Number,
    email: String,
    mobile: String,
    city: String,
    address: String,
    blood_group: String,
    donation_frequency: String, 
    password: String, 
    donationHistory: [
      {
        date: Date,
        qty: Number,
        recieverorganization: {type: mongoose.Schema.Types.ObjectId, ref: 'Organization'}
      },
    ],
  });
  



//hashing passowrd

donorSchema.pre('save',async function(next){
        if(this.isModified('password'))
        {
            this.password= await bcrypt.hash(this.password, 8);
        }
        next()
})





const Donor = mongoose.model('Donor', donorSchema);

module.exports = {Donor};
