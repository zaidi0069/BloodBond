const mongoose = require('mongoose')
const schema = mongoose.Schema

const transactionschema = new schema({
    donorid: String,
    donorName: String,
    orgname: String,
    blood_group: String,
    quantity: Number,
    date: Date,
})

const Transaction = mongoose.model('DonorToOrgTransaction', transactionschema)

module.exports= Transaction