import axios from "axios";


const API = axios.create({

  baseURL: "https://flowmind-backend-04v7.onrender.com",

});



export const uploadResume = async (file) => {

  const formData = new FormData();

  formData.append("file", file);


  const response = await API.post(

    "/upload",

    formData,

    {
      headers:{
        "Content-Type":"multipart/form-data"
      }
    }

  );


  return response.data;

};



export default API;