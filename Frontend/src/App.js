import './App.css';
import Register from './Pages/Register';
import Donor from './Pages/Donor'
import DonorDonate from './Pages/DonorDonate';
import Login from './Pages/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Organization from './Pages/Organization';
import DonorHistory from './Pages/DonorHistory';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path='/' element={<>Nothing Here!!</>} />
        <Route path='/signup' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/donor' element={<Donor/>} />
        <Route path='/donate' element={<DonorDonate/> } />
        <Route path='/history' element={<DonorHistory/> } />
        <Route path='/organization' element={<Organization/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
