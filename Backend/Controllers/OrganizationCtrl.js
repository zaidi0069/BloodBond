
const Organization = require('../Schemas/OrganizationSchema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
let secret = "w2dwertyuiopoiuytrewqwertyuiopoiuytrewqwertyui2d"
const Transaction = require('../Schemas/DonortoOrgTransaction')





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

                    res.status(300).json({ err: 'Invalid Password' })
                }

            })
        }



        else if (!org) {
            res.status(300).json({ err: 'Organization has  not been Found' })
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
                return res.status(300).json({ err: 'Organization with this name already exists' })
            }


            else if (org.name == name) {
                return res.status(300).json({ err: 'Organization with this name already exists' })
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
    console.log('org called')
    Organization.find({}).then((organizations) => {
        // Print the documents
        res.status(200).json(organizations)
    })
}


const inventory = (req, res) => {
    console.log(' inv çalled')
    const { orgname } = req.query
    let inventory =[0, 0, 0, 0, 0, 0, 0, 0]; //A+, A-, B+, B-, AB+, AB-,O+, O- 
    Transaction.find({ orgname: orgname }).then((transactions) => {
        if (transactions) {
            console.log('1')
            for(let i=0; i<transactions.length; i++)
            {
                if(transactions[i].blood_group==='A+'){inventory[0]+=transactions[i].quantity}
                else if(transactions[i].blood_group==='A-'){inventory[1]+=transactions[i].quantity}
                else if(transactions[i].blood_group==='B+'){inventory[2]+=transactions[i].quantity}
                else if(transactions[i].blood_group==='B-'){inventory[3]+=transactions[i].quantity}
                else if(transactions[i].blood_group==='AB+'){inventory[4]+=transactions[i].quantity}
                else if(transactions[i].blood_group==='AB+'){inventory[5]+=transactions[i].quantity}
                else if(transactions[i].blood_group==='O+'){inventory[6]+=transactions[i].quantity}
                else if(transactions[i].blood_group==='O+'){inventory[7]+=transactions[i].quantity}
            }
        
            let blood_inventory= {
                "A+":inventory[0],
                "A-":inventory[1],
                "B+":inventory[2],
                "B-":inventory[3],
                "AB+":inventory[4],
                "AB-":inventory[5],
                "O+":inventory[6],
                "O-":inventory[7]
            }
            res.send(blood_inventory)
           
        }
        else {
            res.send('ewd eerror')
        }
    })

}



module.exports = { organizationlogin, organizationsignup, organizations, inventory }