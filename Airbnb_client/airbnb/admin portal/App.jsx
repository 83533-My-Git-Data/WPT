
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Login from './screens/Login'
import Register from './screens/Register'
import Home from './screens/Home'
import UserDetails from './screens/UserDetails'
import Users from './screens/Users'
import Properties from './screens/Properties'
import AddProperty from './screens/AddProperty'
import PropertyDetails from './screens/PropertyDetails'
import Bookings from './screens/Bookings'

function App() {
  return (
  
    <div className = 'container'>
     <Routes>
       <Route path='' element={<Login/>}/>
       <Route path='login' element={<Login/>}/>
       <Route path='register' element={<Register/>}/>
       <Route path='home' element={<Home/>}/>
       <Route path='properties' element={<Properties/>}/>
       <Route path='property-details' element={<PropertyDetails/>}/>
       <Route path='add-property' element={<AddProperty/>}/>
       <Route path='users' element={<Users/>}/>
       <Route path='user-details' element={<UserDetails/>}/>
       <Route path='bookings' element={<Bookings/>}/>

     </Routes>
     <ToastContainer />
    </div>
    

  )
}
export default App
