
const Organization = require('../Schemas/OrganizationSchema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const Transaction = require('../Schemas/DonortoOrgTransaction')

const { Donor } = require('../Schemas/DonorSchema')
const BloodRequests = require('../Schemas/BloodRequests')

require('dotenv').config();

const secret = process.env.secret;


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
    let orgnames = [];

    Organization.find({}).then((organizations) => {

        for (let i = 0; i < organizations.length; i++) {
            orgnames.push({
                name: organizations[i].name,
                city: organizations[i].city,
                address: organizations[i].address
            })

        }
        res.status(200).json(orgnames)
    })

}


const inventory = (req, res) => {
    const { orgname } = req.query
    let inventory = [0, 0, 0, 0, 0, 0, 0, 0]; //A+, A-, B+, B-, AB+, AB-,O+, O- 
    Transaction.find({ orgname: orgname }).then((transactions) => {
        if (transactions) {
            for (let i = 0; i < transactions.length; i++) {
                if (transactions[i].blood_group === 'A+') { inventory[0] += transactions[i].quantity }
                else if (transactions[i].blood_group === 'A-') { inventory[1] += transactions[i].quantity }
                else if (transactions[i].blood_group === 'B+') { inventory[2] += transactions[i].quantity }
                else if (transactions[i].blood_group === 'B-') { inventory[3] += transactions[i].quantity }
                else if (transactions[i].blood_group === 'AB+') { inventory[4] += transactions[i].quantity }
                else if (transactions[i].blood_group === 'AB+') { inventory[5] += transactions[i].quantity }
                else if (transactions[i].blood_group === 'O+') { inventory[6] += transactions[i].quantity }
                else if (transactions[i].blood_group === 'O+') { inventory[7] += transactions[i].quantity }
            }

         
           

        }
        else {
            res.send('ewd eerror')
        }
    })


    BloodRequests.find({ organization: orgname, status: 'approved' }).then((requests) => {
        if(requests)
        {

       
        for (let i = 0; i < requests.length; i++) 
        {

            if (requests[i].blood_group === 'A+' ) { inventory[0] -=requests[i].quantity }
            else if (requests[i].blood_group === 'A-' ) { inventory[1] -=requests[i].quantity}
            else if (requests[i].blood_group === 'B+') { inventory[2] -=requests[i].quantity}
            else if (requests[i].blood_group === 'B-') { inventory[3] -=requests[i].quantity}
            else if (requests[i].blood_group === 'AB+') { inventory[4] -=requests[i].quantity }
            else if (requests[i].blood_group === 'AB-') { inventory[5] -=requests[i].quantity}
            else if (requests[i].blood_group === 'O+') { inventory[6] -=requests[i].quantity }
            else if (requests[i].blood_group === 'O-') {inventory[7] -=requests[i].quantity}

        
        }


        let blood_inventory = {
            "A+": inventory[0],
            "A-": inventory[1],
            "B+": inventory[2],
            "B-": inventory[3],
            "AB+": inventory[4],
            "AB-": inventory[5],
            "O+": inventory[6],
            "O-": inventory[7]
        }


        res.status(200).json(blood_inventory)
        
    }
    })

}



const donors = (req, res) => {
    const { orgname } = req.query
    Transaction.find({ orgname: orgname }).distinct('donorid').then((trans) => {
        if (trans) {
            let uniquedonors = []


            Donor.find({ _id: trans }).then((donor) => {

                for (let d in donor)
                    if (d) {
                        uniquedonors.push({
                            email: donor[d].email,
                            age: donor[d].age,
                            name: donor[d].name,
                            blood_group: donor[d].blood_group,
                            address: donor[d].address
                        })
                    }

                    else {
                        res.status(300).send('error')
                    }

            }).then(() => {
                res.status(200).json(uniquedonors)
            })

        }
        else
            res.status(300).send('errr')


    })
}


const bloodrequests = (req, res) => {

    const { orgname } = req.query

    let inventory = [0, 0, 0, 0, 0, 0, 0, 0]; //A+, A-, B+, B-, AB+, AB-,O+, O- 

    Transaction.find({ orgname: orgname }).then((transactions) => {
        if (transactions) {
            for (let i = 0; i < transactions.length; i++) {
                if (transactions[i].blood_group === 'A+') { inventory[0] += transactions[i].quantity }
                else if (transactions[i].blood_group === 'A-') { inventory[1] += transactions[i].quantity }
                else if (transactions[i].blood_group === 'B+') { inventory[2] += transactions[i].quantity }
                else if (transactions[i].blood_group === 'B-') { inventory[3] += transactions[i].quantity }
                else if (transactions[i].blood_group === 'AB+') { inventory[4] += transactions[i].quantity }
                else if (transactions[i].blood_group === 'AB+') { inventory[5] += transactions[i].quantity }
                else if (transactions[i].blood_group === 'O+') { inventory[6] += transactions[i].quantity }
                else if (transactions[i].blood_group === 'O+') { inventory[7] += transactions[i].quantity }
            }

          


        }
        else {
            res.send('ewd eerror')
        }
    })

    //calculating if the blood is available


    
    BloodRequests.find({ organization: orgname, status: 'approved' }).then((requests) => {

        for (let i = 0; i < requests.length; i++) 
        {

            if (requests[i].blood_group === 'A+' ) { inventory[0] -=requests[i].quantity }
            else if (requests[i].blood_group === 'A-' ) { inventory[1] -=requests[i].quantity}
            else if (requests[i].blood_group === 'B+') { inventory[2] -=requests[i].quantity}
            else if (requests[i].blood_group === 'B-') { inventory[3] -=requests[i].quantity}
            else if (requests[i].blood_group === 'AB+') { inventory[4] -=requests[i].quantity }
            else if (requests[i].blood_group === 'AB-') { inventory[5] -=requests[i].quantity}
            else if (requests[i].blood_group === 'O+') { inventory[6] -=requests[i].quantity }
            else if (requests[i].blood_group === 'O-') {inventory[7] -=requests[i].quantity}

        
        }

   
    })



    BloodRequests.find({ organization: orgname, status: 'pending' }).then((requests) => {

        for (let i = 0; i < requests.length; i++) {
            if (requests[i].blood_group === 'A+' && requests[i].quantity <= inventory[0]) { requests[i].possibility = 'true' }
            else if (requests[i].blood_group === 'A-' && requests[i].quantity <= inventory[1]) { requests[i].possibility = 'true' }
            else if (requests[i].blood_group === 'B+' && requests[i].quantity <= inventory[2]) { requests[i].possibility = 'true' }
            else if (requests[i].blood_group === 'B-' && requests[i].quantity <= inventory[3]) { requests[i].possibility = 'true' }
            else if (requests[i].blood_group === 'AB+' && requests[i].quantity <= inventory[4]) { requests[i].possibility = 'true' }
            else if (requests[i].blood_group === 'AB-' && requests[i].quantity <= inventory[5]) { requests[i].possibility = 'true' }
            else if (requests[i].blood_group === 'O+' && requests[i].quantity <= inventory[6]) { requests[i].possibility = 'true' }
            else if (requests[i].blood_group === 'O-' && requests[i].quantity <= inventory[7]) { requests[i].possibility = 'true' }

        }
        res.send(requests)

    })
}


const bloodrequestshistory = (req, res) => {
    const orgname = req.query.orgname;
    BloodRequests.find({ organization: orgname, status: { "$in": ["rejected", "approved"] } }).then((requests) => {
        if (requests)
            res.status(200).json(requests)
        else
            console.log('not approved/rejected req')

    })
}

const orgrequesthandling = (req, res) => {

    const { reqid, status } = req.body;

    BloodRequests.findById(reqid).then((req) => {
        req.status = status;

        req.save().then(() => {
            res.status(200).json({ msg: 'modified' })
        }).catch((err) => {
            res.status(300).json({ msg: 'error' })
        })
    })

}


module.exports = { organizationlogin, organizationsignup, organizations, inventory, donors, bloodrequests, orgrequesthandling, bloodrequestshistory }