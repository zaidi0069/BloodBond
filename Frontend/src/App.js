import './App.css';
import Register from './Pages/Register';
import Donor from './Pages/Donor'
import DonorDonate from './Pages/DonorDonate';
import Login from './Pages/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Organization from './Pages/Organization';
import DonorHistory from './Pages/DonorHistory';
import Home from './Pages/Home';
import Orginventory from './Pages/Orginventory';
import OrgDonors from './Pages/OrgDonors'
import HospitalRegister from './Pages/HospitalRegister';
import Hospital from './Pages/Hospital';
import GetDonation from './Pages/GetDonation';
import BloodRequests from './Pages/BloodRequests';
import BloodRequestsHistory from './Pages/BloodRequestsHistory';
import HospitalRequestsHistory from './Pages/HospitalRequestsHistory';
import Admin from './Pages/Admin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/signup' element={<Register/>} />
        <Route path='/hospitalsignup' element={<HospitalRegister/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/donor' element={<Donor/>} />
        <Route path='/donate' element={<DonorDonate/> } />
        <Route path='/history' element={<DonorHistory/> } />
        <Route path='/organization' element={<Organization/>} />
        <Route path='/orginventory' element={<Orginventory/>} />
        <Route path='/orgdonors' element={<OrgDonors/>} />
        <Route path='/hospital' element={<Hospital/>} />
        <Route path='getdonation' element={<GetDonation/>}/>
        <Route path='/bloodrequests' element={<BloodRequests/>}/>
        <Route path='/bloodrequestshistory' element={<BloodRequestsHistory/>}/>
        <Route path= '/hospitaldonationhistory' element= {<HospitalRequestsHistory/>} />
        <Route path='/admin' element={<Admin/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
