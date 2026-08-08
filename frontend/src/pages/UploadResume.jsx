import { useState } from "react";
import axios from "axios";


export default function UploadResume(){


    const [file,setFile] = useState(null);

    const [message,setMessage] = useState("");

    const [loading,setLoading] = useState(false);




    const uploadResume = async()=>{


        if(!file){

            setMessage("Please select a resume");

            return;

        }



        const formData = new FormData();


        // IMPORTANT: backend expects "file"

        formData.append(
            "file",
            file
        );



        try{


            setLoading(true);



            const response = await axios.post(

                "http://127.0.0.1:8000/upload",

                formData

            );



            console.log(response.data);



            setMessage(

                "Resume uploaded successfully"

            );



        }


        catch(error){


            console.log(

                error.response?.data

            );


            setMessage(

                "Resume upload failed"

            );


        }


        finally{

            setLoading(false);

        }


    };







    return(


        <div className="min-h-screen bg-slate-950 p-8 text-white">


            <h1 className="text-3xl font-bold mb-8">

                📄 Upload Resume

            </h1>




            <div className="bg-slate-900 p-8 rounded-xl max-w-xl">


                <h2 className="text-xl mb-5">

                    Upload Candidate Resume

                </h2>



                <input

                    type="file"

                    accept=".pdf,.docx,.txt"

                    onChange={(e)=>
                        setFile(
                            e.target.files[0]
                        )
                    }

                    className="mb-5"

                />




                <button

                    onClick={uploadResume}

                    disabled={loading}

                    className="bg-cyan-600 px-8 py-3 rounded-lg"

                >

                    {
                        loading
                        ?
                        "Uploading..."
                        :
                        "Upload Resume"
                    }


                </button>




                {
                    message &&

                    <p className="mt-5">

                        {message}

                    </p>

                }



            </div>


        </div>


    );


}