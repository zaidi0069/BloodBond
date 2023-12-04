
const Organization = require('../Schemas/OrganizationSchema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
let secret = "w2dwertyuiopoiuytrewqwertyuiopoiuytrewqwertyui2d"






const organizationlogin = (req, res) => {
    const { email, password } = req.body;

    Organization.findOne({

        email: email

    }).then((org) => {

        if (org) {
            bcrypt.compare(password, org.password).then((pass_validation) => {
                if (pass_validation == true) {
                    let token = jwt.sign(
                        {
                            id: org._id.toString(),
                            name: org.name,

                        },
                        secret,// process.env.secretkey,
                        {
                            expiresIn: '500s'
                        }
                    )

                    res.json({ id: org._id.toString(), token: token })

                }

                else {
                 
                    res.status(300).json({err:'Invalid Password'})
                }

            })
        }



        else if (!org) {
            res.status(300).json({err:'Organization has  not been Found'})
        }

    })

}









const organizationsignup = (req, res) => {
    const { name, email, mobile, address, city, password } = req.body;

    Organization.findOne({
        $or: [
            { email: email },
            { name: name }
        ]
    }).then((org) => {

        if (org) {
            if (org.email == email) {
               return res.status(300).json({err:'Organization with this name already exists'})
            }


            else if (org.name == name) {
               return  res.status(300).json({err:'Organization with this name already exists'})
            }
        }


        else if (!org) {
            const organization = new Organization({
                name, email, mobile, city,
                address, password
            })



            organization.save().then(() => {
                //jwt authorization 

                let token = jwt.sign(
                    {
                        id: organization._id.toString(),
                        name: organization.name,

                    },
                    "w2dwertyuiopoiuytrewqwertyuiopoiuytrewqwertyui2d",// process.env.secretkey,
                    {
                        expiresIn: '500s'
                    }
                )
                res.json({ id: organization._id.toString(), token: token })
                //  res.redirect('http://localhost:3000/donor');

            })
        }
    })
}






const organizations = (req, res) => {
   
    Organization.find({}).then((organizations)=>{
    // Print the documents
    res.status(200).json(organizations)
    })
}



module.exports = { organizationlogin,  organizationsignup , organizations}