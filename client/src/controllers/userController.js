import axios from 'axios'

///>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> LOGIN USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>/

export const loginUser = async(email,password)=>{
 //Check fields
 if(!email || !password){
  throw new Error('All Fields are required')
 }
 try {
  const res = await axios.post('axon/user/login',{email,password})

 // Axios automatically parses JSON responses
 const data = res.data;

 if (res.status !== 200) {
  throw new Error(data.error || 'An error occurred during login');
 }
    
   //SET LOCAL STORAGE
    localStorage.setItem('token',data.token)
    localStorage.setItem('email',data.email)
    localStorage.setItem('firstName',data.firstName)
    localStorage.setItem('role',data.role)
    // console.log('login localStorage:',data);
    return data;
  } catch (error) {
    // Handle errors (e.g., network errors, server errors)
    throw new Error(error.response?.data?.error || error.message || 'An error occurred during login');
  }
 } 

 ///>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> SIGNUP USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>///
 export const signupUser = async(firstName,lastName,email,password,role)=>{
  //Check fields
 if (!firstName ||!lastName || !email || !password || !role) {
    throw new Error('All fields are required');
  }
 try {
   const res = await axios.post('/axon/user',{firstName,lastName,email,password,role})
   const data = res.data
   if(res.status !== 200){
    throw new Error(data.error || 'An error occurred during registration');
   }
    //SET LOCAL STORAGE
    localStorage.setItem('token',data.token)
    localStorage.setItem('email',data.email)
    localStorage.setItem('firstName',data.firstName)
    localStorage.setItem('role',data.role)
    // console.log('login localStorage:',data);
    return data;
  } catch (error) {
    // Handle errors (e.g., network errors, server errors)
    throw new Error(error.response?.data?.error || error.message || 'An error occurred during login');
  }
 }

