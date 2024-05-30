
import { Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Login from './screens/Login'
import Register from './screens/Register'
import Properties from './screens/Properties';


function App() {
  return(
     <div className="container">
        <Routes>
          <Route path='' element={<Login/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='register' element={<Register/>}/>
          <Route path='properties' element={<Properties/>}/>

        </Routes>
       <ToastContainer/>
     </div>
    
  )
}
export default App;
