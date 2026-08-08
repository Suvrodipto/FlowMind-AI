import { useState } from "react";
import axios from "axios";


const API = "https://flowmind-backend-04v7.onrender.com";



export default function UploadResume(){


const [file,setFile] = useState(null);

const [loading,setLoading] = useState(false);

const [message,setMessage] = useState("");

const [error,setError] = useState("");







const handleUpload = async(e)=>{


e.preventDefault();


setMessage("");

setError("");



if(!file){

    setError("Please select a resume file");

    return;

}



try{


setLoading(true);



const formData = new FormData();


formData.append(

    "file",

    file

);





const response = await axios.post(


`${API}/upload`,


formData,


{

headers:{

"Content-Type":"multipart/form-data"

}

}


);





console.log(

"Upload Success:",

response.data

);





setMessage(

"Resume uploaded successfully!"

);




}


catch(error){



console.log(

"Upload Error:",

error.response?.data

);




if(error.response?.data?.detail){


setError(

typeof error.response.data.detail === "string"

?

error.response.data.detail

:

JSON.stringify(error.response.data.detail)

);


}

else{


setError(

"Resume upload failed"

);


}




}



finally{


setLoading(false);


}



};









return(


<div className="min-h-screen bg-slate-950 text-white p-8">





<div className="max-w-xl mx-auto bg-slate-900 p-8 rounded-2xl shadow-xl">





<h1 className="text-3xl font-bold mb-6">

📄 Upload Resume

</h1>






<form onSubmit={handleUpload}>



<input


type="file"


accept=".pdf,.doc,.docx"


onChange={(e)=>

setFile(e.target.files[0])

}


className="w-full bg-slate-800 p-3 rounded-lg"



/>







<button


type="submit"


disabled={loading}


className="mt-6 w-full bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-600 py-3 rounded-xl font-bold"


>


{

loading

?

"Uploading..."

:

"Upload Resume"

}


</button>





</form>







{

message &&

<div className="mt-5 bg-green-600 p-3 rounded-lg">

{message}

</div>

}







{

error &&

<div className="mt-5 bg-red-600 p-3 rounded-lg">

{error}

</div>

}







</div>




</div>


);



}