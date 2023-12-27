const Hospital  = require('../Schemas/HospitalSchema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
let secret = "w2dwertyuiopoiuytrewqwertyuiopoiuytrewqwertyui2d"



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
        } else {
            return res.status(401).json({ err: 'Invalid Password for hospital' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ err: 'Internal Server Error' });
    }
};






const hospitalsignup = async function (req, res) {


    const {name, email, password, address} = req.body.formData

    const selectedorgs = req.body.selectedorgs

    

    Hospital.findOne({email}).then((hospital) => {

        if (hospital) {
                return res.status(300).json({ err: 'Email already exists' })
        }


        else if (!hospital) {
            const hosp = new Hospital({
                name,  email,
                address,password, organizations: selectedorgs
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


module.exports = { hospitallogin, hospitalsignup }