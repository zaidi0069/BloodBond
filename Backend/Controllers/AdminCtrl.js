const { Admin } = require('../Schemas/AdminSchema')
const Transaction = require('../Schemas/DonortoOrgTransaction')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
let secret = "w2dwertyuiopoiuytrewqwertyuiopoiuytrewqwertyui2d"

const adminlogin = async function (req, res) {

    const { email, password } = req.body
    Admin.findOne({ email }).then((user) => {
        if (!user) {
            res.status(404).json({ err: 'Admin not found' })
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



const adminsignup = async function (req, res) {

    const { name, email,  password } = req.body;

    Admin.findOne({email}).then((user) => {

        if (user) {
          
                return res.status(300).json({ err: 'Email already exists' })
           
        }


        else if (!user) {
            const admin = new Admin({ name,  email ,password  })

            admin.save().then(() => {
                //jwt authorization 

                let token = jwt.sign(
                    {
                        id: admin._id.toString(),
                        name: admin.name,

                    },
                    "w2dwertyuiopoiuytrewqwertyuiopoiuytrewqwertyui2d",// process.env.secretkey,
                    {
                        expiresIn: '500s'
                    }
                )
                res.json({ id: admin._id.toString(), token: token })

            })
        }
    })
}


module.exports = { adminsignup, adminlogin}