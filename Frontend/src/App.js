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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
