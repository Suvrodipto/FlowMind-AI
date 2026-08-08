import { useEffect, useState } from "react";
import axios from "axios";


const API = "http://127.0.0.1:8000";


export default function JobRequirement() {


    const [selectedFile, setSelectedFile] = useState(null);

    const [jobs, setJobs] = useState([]);

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [skills, setSkills] = useState("");

    const [message, setMessage] = useState("");





    // Fetch saved jobs

    const getJobs = async()=>{

        try{

            const res = await axios.get(
                `${API}/job/list`
            );

            setJobs(res.data);

        }
        catch(err){

            console.log(err);

        }

    };



    useEffect(()=>{

        getJobs();

    },[]);







    // Create job using form

    const saveJob = async(e)=>{

        e.preventDefault();


        try{


            await axios.post(

                `${API}/job/create`,

                null,

                {

                    params:{

                        title:title,

                        description:description,

                        required_skills:skills

                    }

                }

            );


            setMessage(
                "Job created successfully"
            );


            setTitle("");

            setDescription("");

            setSkills("");


            getJobs();


        }

        catch(err){

            console.log(err);

            setMessage(
                "Job creation failed"
            );

        }


    };








    // Upload Job Description File

    const uploadJob = async()=>{


        if(!selectedFile){

            setMessage(
                "Please select file"
            );

            return;

        }



        const formData = new FormData();


        formData.append(
            "file",
            selectedFile
        );



        try{


            const response = await axios.post(

                `${API}/job/upload`,

                formData,

                {

                    headers:{

                        "Content-Type":
                        "multipart/form-data"

                    }

                }

            );



            console.log(response.data);



            setMessage(
                "Job description uploaded successfully"
            );



            setSelectedFile(null);



            getJobs();


        }

        catch(err){


            console.log(err.response);


            setMessage(
                "Job upload failed"
            );


        }


    };







    // Delete Job

    const deleteJob = async(id)=>{


        try{


            await axios.delete(

                `${API}/job/${id}`

            );


            getJobs();


        }

        catch(err){

            console.log(err);

        }


    };







    return (

        <div className="p-8 bg-slate-950 min-h-screen text-white">


            <h1 className="text-3xl font-bold mb-8">

                Job Requirement

            </h1>



            {
                message &&

                <div className="bg-blue-600 p-3 rounded mb-5">

                    {message}

                </div>

            }







            <div className="grid md:grid-cols-2 gap-8">






                {/* CREATE JOB */}

                <div className="bg-slate-900 p-6 rounded-xl">


                    <h2 className="text-xl mb-5">

                        Create Job Description

                    </h2>



                    <form onSubmit={saveJob}>


                        <input

                            className="w-full p-3 mb-4 bg-slate-800 rounded"

                            placeholder="Job Title"

                            value={title}

                            onChange={
                                e=>setTitle(e.target.value)
                            }

                        />



                        <textarea

                            className="w-full p-3 mb-4 bg-slate-800 rounded"

                            placeholder="Job Description"

                            value={description}

                            onChange={
                                e=>setDescription(e.target.value)
                            }

                        />



                        <input

                            className="w-full p-3 mb-4 bg-slate-800 rounded"

                            placeholder="Required Skills"

                            value={skills}

                            onChange={
                                e=>setSkills(e.target.value)
                            }

                        />



                        <button

                            className="bg-cyan-600 px-5 py-3 rounded"

                        >

                            Save Job

                        </button>


                    </form>


                </div>








                {/* UPLOAD FILE */}

                <div className="bg-slate-900 p-6 rounded-xl">


                    <h2 className="text-xl mb-5">

                        Upload Job Description

                    </h2>



                    <input

                        type="file"

                        accept=".txt,.pdf,.docx"

                        onChange={
                            e=>setSelectedFile(
                                e.target.files[0]
                            )
                        }

                        className="mb-5"

                    />



                    <br/>


                    <button

                        onClick={uploadJob}

                        className="bg-green-600 px-5 py-3 rounded"

                    >

                        Upload JD

                    </button>


                </div>



            </div>







            {/* SAVED JOBS */}


            <div className="mt-10 bg-slate-900 p-6 rounded-xl">


                <h2 className="text-xl mb-5">

                    Saved Job Requirements

                </h2>




                {

                    jobs.length===0

                    ?

                    <p>

                        No job requirements added

                    </p>


                    :

                    jobs.map(job=>(


                        <div

                            key={job.id}

                            className="bg-slate-800 p-5 rounded mb-4"


                        >


                            <h3 className="font-bold">

                                {job.title}

                            </h3>


                            <p className="mt-2">

                                {job.description}

                            </p>



                            <button

                                onClick={()=>
                                    deleteJob(job.id)
                                }

                                className="bg-red-600 mt-4 px-4 py-2 rounded"

                            >

                                Delete

                            </button>


                        </div>


                    ))

                }



            </div>


        </div>

    );

}