const express = require('express')
const mongooose = require('mongoose')
const Routes = require('./Routes/Routes')
const db= 'mongodb+srv://zaid:112234@cluster0.khcordl.mongodb.net/Blood_Donation_App'
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors());

mongooose.connect(db).then(()=>{
    console.log('connected to db')
}).catch((err)=>{
    console.log(err)
})


app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/', Routes)
app.get('/organizations', Routes)
app.post('/history', Routes)
app.post('/donorsignup', Routes)
app.post('/donorlogin', Routes)
app.post('/donordonate', Routes)
app.post('/validate', Routes)
app.get('/donordonation', Routes)
app.post('/organizationsignup', Routes)
app.post('/organizationlogin', Routes)

app.listen(3001, ()=>{
    console.log("Server is running on port 3001")
})