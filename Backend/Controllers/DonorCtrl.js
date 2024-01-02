const { Donor } = require('../Schemas/DonorSchema')
const Transaction = require('../Schemas/DonortoOrgTransaction')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config();

const secret = process.env.secret;
const donorlogin = async function (req, res) {

    const { email, password } = req.body
    Donor.findOne({ email }).then((user) => {
        if (!user) {
            res.status(404).json({ err: 'Donor not found' })
        }

        else {
            bcrypt.compare(password, user.password).then((pass_validation) => {
                if (pass_validation == true) {
                    let token = jwt.sign(
                        {
                            userid: user._id.toString(),
                            name: user.name,

                        },
                        secret,// process.env.secretkey,
                        {
                            expiresIn: '500s'
                        }
                    )

                    res.json({ id: user._id.toString(), token: token })

                }

                else {
                    res.status(300).json({ err: 'Invalid Password' })
                }
            })

        }
    })
}



const donorsignup = async function (req, res) {

    const { name, age, email, mobile, city, address,
        blood_group, donation_frequency, password } = req.body;

    Donor.findOne({
        $or: [
            { email: email },
            { mobile: mobile }
        ]
    }).then((user) => {

        if (user) {
            if (user.email == email) {
                return res.status(300).json({ err: 'Email already exists' })
            }


            else if (user.mobile == mobile) {
                res.status(304)
                return res.status(300).json({ err: 'Mobile No already exists' })
            }
        }


        else if (!user) {
            const donor = new Donor({
                name, age, email, mobile, city,
                address, blood_group, donation_frequency, password
            })



            donor.save().then(() => {
                //jwt authorization 

                let token = jwt.sign(
                    {
                        id: donor._id.toString(),
                        name: donor.name,

                    },
                    "w2dwertyuiopoiuytrewqwertyuiopoiuytrewqwertyui2d",// process.env.secretkey,
                    {
                        expiresIn: '500s'
                    }
                )
                res.json({ id: donor._id.toString(), token: token })
                //  res.redirect('http://localhost:3000/donor');

            })
        }
    })
}


const donordonate = (req, res) => {
    const { date, donorid, orgname, qty } = req.body
    Donor.findOne({ _id: donorid }).then((donor) => {
        if (!donor) {
            res.status(300).json({ error: 'Unexpected error happened' })
         
        }
        else {

            const transact = new Transaction({
                donorid: donorid,
                donorName: donor.name,
                orgname: orgname,
                blood_group: donor.blood_group,
                quantity: qty,
                date: date
            })

            transact.save().then((transaction) => {
                if (transaction) {
                    res.status(200).json({ msg: 'Transaction done' })
                }

                else {
                    res.status(300).json({ error: 'unexpected error' })
                }
            })
        }
    })
}


const history = ((req, res) => {
    const { donorid } = req.body

    Transaction.find({ donorid: donorid }).then((transactions)=>{
        if(transactions){
            res.status(200).json({transactions: transactions})
        }
        else{
            res.status(404).json({error: 'error'})
        }
    })

})

const validate = (req, res) => {
    res.status(200)
    res.json(req.name)
}


module.exports = { donorsignup, donorlogin, validate, donordonate , history}