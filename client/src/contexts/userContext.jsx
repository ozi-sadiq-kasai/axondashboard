import {createContext,useState,useEffect } from "react";

export const UserContext = createContext()

const UserProvider = ({children})=>{
 const [user,setUser]= useState({
  firstName:localStorage.getItem('firstName'),
  role:localStorage.getItem('role'),
  email:localStorage.getItem('email'),
  research:[]
 })
// console.log({userData:user})

  useEffect(() => {
    localStorage.setItem('firstName', user.firstName)
    localStorage.setItem('role', user.role)
  }, [user])
 return (
   <UserContext.Provider value={{ user, setUser }}>
     {children}
   </UserContext.Provider>
 )
}

export default UserProvider



