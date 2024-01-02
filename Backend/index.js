const express = require('express')
const mongooose = require('mongoose')
const Routes = require('./Routes/Routes')

require('dotenv').config();


const db = process.env.db;

const cors = require('cors');

const app = express();
//lig
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
app.get('/donors', Routes)
app.get('/inventory', Routes)

app.get('/organizations', Routes)
app.get('/linkedorgs', Routes)
app.post('/history', Routes)
app.post('/donorsignup', Routes)
app.post('/donorlogin', Routes)
app.post('/donordonate', Routes)
app.post('/validate', Routes)
app.post('/orgrequesthandling', Routes)
app.get('/donordonation', Routes)
app.get('/bloodrequestshistory', Routes)
app.get('/bloodrequests', Routes)
app.get('/hospitalrequestshistory', Routes)
app.post('/organizationsignup', Routes)
app.post('/organizationlogin', Routes)
app.post('/hospitalsignup', Routes)
app.post('/hospitallogin', Routes)
app.post('/hospitalrequest', Routes)
app.post('/adminlogin', Routes)
app.post('/adminsignup', Routes)
app.get('/alltransactions', Routes)
app.get('/allbloodrequests', Routes)

app.listen(3001, ()=>{
    console.log("Server is running on port 3001")
})