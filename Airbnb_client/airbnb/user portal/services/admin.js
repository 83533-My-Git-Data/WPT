import axios from 'axios'
import { config } from './config'


export async function register(firstName, lastName, email,password,phone){
try{
    const body = {firstName, lastName, email, password, phone}
    const response = await axios.post(`${config.serverUrl}/user/register`,body)
     
    return response.data

} catch(ex){
    console.log(`exception: `, ex)
}
 
return null
   
}