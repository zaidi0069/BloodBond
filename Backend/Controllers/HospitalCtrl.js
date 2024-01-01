const Hospital = require('../Schemas/HospitalSchema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
let secret = "w2dwertyuiopoiuytrewqwertyuiopoiuytrewqwertyui2d"
const BloodRequests = require('../Schemas/BloodRequests')


const hospitallogin = async function (req, res) {
    try {
        console.log('hosp login triggered')
        const { email, password } = req.body;
        const hospital = await Hospital.findOne({ email });

        if (!hospital) {
            return res.status(404).json({ err: 'Hospital not found' });
        }

        const passValidation = await bcrypt.compare(password, hospital.password);

        if (passValidation) {

            const token = jwt.sign(
                {
                    hospitalid: hospital._id.toString(),
                    name: hospital.name,
                },
                secret, // process.env.secretkey,
                {
                    expiresIn: '500s'
                }
            );
            console.log('x')
            return res.json({ id: hospital._id.toString(), token });
        }
        else {
            return res.status(401).json({ err: 'Invalid Password for hospital' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ err: 'Internal Server Error' });
    }
};






const hospitalsignup = async function (req, res) {


    const { name, email, password, address } = req.body.formData

    const selectedorgs = req.body.selectedorgs



    Hospital.findOne({ email }).then((hospital) => {

        if (hospital) {
            return res.status(300).json({ err: 'Email already exists' })
        }


        else if (!hospital) {
            const hosp = new Hospital({
                name, email,
                address, password, organizations: selectedorgs
            })



            hosp.save().then(() => {
                //jwt authorization 

                let token = jwt.sign(
                    {
                        id: hosp._id.toString(),
                        name: hosp.name,

                    },
                    "w2dwertyuiopoiuytrewqwertyuiopoiuytrewqwertyui2d",// process.env.secretkey,
                    {
                        expiresIn: '500s'
                    }
                )
                res.json({ id: hosp._id.toString(), token: token })


            })
        }
    })
}


const linkedorgs = async function (req, res) {

    const id = req.query.id;



    Hospital.findOne({ _id: id }).then((hospital) => {
        console.log(id)
        if (hospital) {
            res.status(200).json(hospital.organizations)
        }


        else
            console.log('hospital not found')
    })
}



const hospitalrequest = async (req, res) => {

    const { hospital_Id, orgname, blood_group, qty } = req.body;

    const hospital = await Hospital.findOne({ _id: hospital_Id })
    const hospitalname = hospital.name

    console.log('req called')
    const request = new BloodRequests({
        hospital: hospitalname,
        organization: orgname,
        blood_group: blood_group,
        quantity: qty,
        status: 'pending',
        possibility: 'false'

    })

    request.save().then((s) => {
        if (s) {
            console.log('200')
            res.status(200).json({
                msg: 'request made successfully'
            });
        }

        else {

            res.status(300).json({
                msg: 'error occurred'
            })
        }


    })
}





const hospitalrequestshistory = async (req, res) => {

    const hospital_Id = req.query.hospitalid;
    const hospital = await Hospital.findOne({ _id: hospital_Id })
    const hospitalname = hospital.name

    console.log(hospitalname)
  
    BloodRequests.find({hospital:hospitalname}).then((req)=>{
        if(req)
        res.status(200).json(req)
        else
        res.status(300)
    })
}

module.exports = { hospitallogin, hospitalsignup, linkedorgs, hospitalrequest, hospitalrequestshistory}