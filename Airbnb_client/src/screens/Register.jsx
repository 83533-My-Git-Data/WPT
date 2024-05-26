import { useState } from "react"
import { Link } from "react-router-dom"

function Register(){
    const[firstName, setFirstName] = useState('')
    const[lastName, setLastName] = useState('')
    const[email, setEmail] = useState('')
    const[password,setPassword] =useState('')
    const[confirmPassword, setConfirmPassword] = useState('')




    const onRegister = () =>{

    }
    return (
        <div>
        <h2 className='page-header'>Register</h2>
        <div className="row">
          <div className="col"></div>
          <div className="col">
            <div className="form">
             <div className="mb-3">
                 <label htmlFor="">First Name</label>
                 onChange={(e) => setFirstName(e.target.value)}
                 <input type="email" className="form-control" />
             </div>
             <div className="mb-3">
                 <label htmlFor="">Last Name</label>
                 onChange=
                 <input type="email" className="form-control" />
             </div>
             <div className="mb-3">
                 <label htmlFor="">Password</label>
                 <input type="email" className="form-control" />
             </div>
             <div className="mb-3">
                 <label htmlFor="">Confirm Password</label>
                 <input type="email" className="form-control" />
             </div>
             <div className="mb-3">
                 <div>Already have an account  <Link to='/login'>Login here</Link></div>
                 <button className="btn btn-success mt-2">Register</button>
             </div>
             
            </div>
            </div>
          <div className="col"></div>


        </div>
     </div>
    )
}

export default Register