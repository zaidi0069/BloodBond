const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
// Define Organization Schema
const organizationSchema = new mongoose.Schema({
  name: 
  {
    type: String,
    required: true,
  },
  email: 
  {
    type: String,
    required: true,
    unique: true,
  },
  password: 
  {
    type: String,
    required: true,
  },
  
  mobile: String,
  city: String,
  address: String,

  inventory: 
  {
    blood_group: {
      type: String,
      qty: Number
    }
  },

  donorId:
  {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Donor",
    // required:"true"
  }
});





//hashing passowrd

organizationSchema.pre('save',async function(next){
  if(this.isModified('password'))
  {
      this.password= await bcrypt.hash(this.password, 8);
  }
  next()
})


// Create Organization model
const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;
