const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const adminSchema = new Schema({
    name: String,
    email: String,
    password: String,
  });
  



//hashing passowrd

adminSchema.pre('save',async function(next){
        if(this.isModified('password'))
        {
            this.password= await bcrypt.hash(this.password, 8);
        }
        next()
})





const Admin = mongoose.model('Admin', adminSchema);

module.exports = {Admin};
