import axios from "axios"


/**************************** Get all Research  ********************************/
export const getResearch = async () => {
  try {
    const res = await axios.get('axon/research');
    const data = res.data
    
    if (res.status !== 200) {
     throw new Error(data.error || 'An error occurred');
    }
    // console.log('ResearchController',data);
 
    return data
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};

/**************************** Get user Research  ********************************/
export const  getUserResearch= async () => {
  try {
    const res = await axios.get('axon/userResearch',{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
    const data = res.data;

    // console.log(data);

    if (res.status !== 200) {
      throw new Error( 'No user research the error');
    }

    return data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};
/********************************************************create Research************************************************************* */

export const createResearch = async(title,status,total,date)=>{
 if(!title||!status||!total||!date){
  throw new Error('All fields are required')
 }
 const res = await axios.post('api/research',{ title, status, total, date },{
  headers:{
   "Content-Type":'application/json',
   "Authorization":`Bearer ${localStorage.getItem('token')}`
  },
 })
 
 if(res.status !== 200){
  throw new Error(data.error || 'An error occurred');
 }
 // console.log(data);
  const data = res.data;
return data
}

/*********************Delete Research**************** */

export const deleteResearch = async(_id)=>{
 const res = await axios.delete(`axon/research/${_id}`,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })

 if(res.status !==200){
  throw new Error(data.error || 'An error occurred');
 }
 // console.log(data);
  const data = res.data;
return data

}

/*********************Update Research**************** */
export const updateResearch = async(_id,title,status,total)=>{
  if(!title||!status||!total){
  throw new Error('All fields are required')
 }
 const res = await axios.put(`axon/research/${_id}`,{ title, status, total },{
  headers:{
   "Content-Type":'application/json',
   "Authorization":`Bearer ${localStorage.getItem('token')}`
  },
 })
 
 if(res.status !==200){
  throw new Error(res.data.error);
 }
 // console.log(data);
  const data = res.data;
return data
}