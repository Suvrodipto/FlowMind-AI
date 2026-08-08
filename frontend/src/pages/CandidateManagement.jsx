import { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

import {
    Search,
    CheckCircle,
    XCircle,
    Trash2,
    Eye,
    FileSpreadsheet
} from "lucide-react";

import ResumeModal from "../components/ResumeModal";


const API = "https://flowmind-backend-04v7.onrender.com";



export default function CandidateManagement(){


    const [candidates,setCandidates] = useState([]);

    const [search,setSearch] = useState("");

    const [loading,setLoading] = useState(false);

    const [selectedCandidate,setSelectedCandidate] = useState(null);







    useEffect(()=>{

        loadCandidates();

    },[]);








    const loadCandidates = async()=>{


        try{


            const response = await axios.get(

                `${API}/candidates`

            );


            setCandidates(response.data);



        }

        catch(error){

            console.log(
                "Candidate loading failed",
                error
            );

        }


    };









    // EXPORT TO EXCEL

    const exportToExcel = ()=>{


        const data = candidates.map((candidate,index)=>(

            {

                Rank:index+1,

                Name:candidate.name || "",

                Email:candidate.email || "",

                Phone:candidate.phone || "N/A",

                Skills:candidate.skills || "",

                ATS_Score:candidate.ats_score || 0,

                Match_Score:candidate.match_score || 0,

                Status:candidate.status || "Pending"

            }

        ));



        const worksheet = XLSX.utils.json_to_sheet(data);


        const workbook = XLSX.utils.book_new();



        XLSX.utils.book_append_sheet(

            workbook,

            worksheet,

            "Candidates"

        );



        XLSX.writeFile(

            workbook,

            "FlowMind_Candidates.xlsx"

        );


    };











    // UPDATE STATUS

    const updateStatus = async(id,status)=>{


        try{


            setLoading(true);



            await axios.put(

                `${API}/candidates/${id}/status`,

                null,

                {

                    params:{

                        status:status

                    }

                }

            );



            loadCandidates();



        }

        catch(error){

            console.log(error);

        }

        finally{

            setLoading(false);

        }


    };












    // DELETE CANDIDATE

    const deleteCandidate = async(id)=>{


        const confirmDelete = window.confirm(

            "Are you sure you want to delete this candidate?"

        );


        if(!confirmDelete)

            return;




        try{


            await axios.delete(

                `${API}/candidates/${id}`

            );



            loadCandidates();



        }

        catch(error){

            console.log(error);

        }


    };













    // ONLY SHOW TECHNICAL SKILLS

    const extractSkills = (skills)=>{


        const skillDatabase=[


            "Python",
            "Java",
            "C++",
            "C",
            "JavaScript",
            "React",
            "Node.js",
            "HTML",
            "CSS",
            "SQL",
            "MySQL",
            "MongoDB",
            "AWS",
            "Docker",
            "Kubernetes",
            "Git",
            "GitHub",
            "Linux",
            "Flask",
            "FastAPI",
            "Django",
            "Machine Learning",
            "Deep Learning",
            "Artificial Intelligence",
            "Data Science",
            "Pandas",
            "NumPy",
            "TensorFlow",
            "PyTorch"

        ];



        if(!skills)

            return [];



        const text = skills.toString();



        return skillDatabase.filter(skill=>

            text
            .toLowerCase()
            .includes(

                skill.toLowerCase()

            )

        );

    };









    const rankedCandidates =

    [...candidates].sort(

        (a,b)=>

        (b.ats_score || 0)

        -

        (a.ats_score || 0)

    );









    const filteredCandidates =

    candidates.filter(candidate=>{


        const value = search.toLowerCase();



        return(


            candidate.name

            ?.toLowerCase()

            .includes(value)



            ||



            candidate.email

            ?.toLowerCase()

            .includes(value)


        );


    });









return(


<div className="min-h-screen bg-slate-950 text-white p-8">





<h1 className="text-4xl font-bold mb-8">

👥 Candidate Management

</h1>









{/* RANKING */}



<div className="bg-slate-900 p-6 rounded-2xl mb-8">


<h2 className="text-2xl font-bold mb-6">

🏆 Candidate Ranking

</h2>





<div className="grid md:grid-cols-3 gap-6">


{

rankedCandidates

.slice(0,3)

.map((candidate,index)=>(


<div

key={candidate.id}

className="bg-slate-800 rounded-xl p-6 border border-slate-700"

>


<h2 className="text-3xl font-bold">


{

index===0

?

"🥇"

:

index===1

?

"🥈"

:

"🥉"

}


Rank {index+1}


</h2>





<h3 className="text-xl font-bold mt-4">

{candidate.name}

</h3>




<p className="text-gray-400">

{candidate.email}

</p>




<p className="text-green-400 mt-4">

ATS: {candidate.ats_score || 0}%

</p>



<p className="text-cyan-400">

Match: {candidate.match_score || 0}%

</p>



</div>


))


}


</div>


</div>









{/* SEARCH + EXPORT */}



<div className="bg-slate-900 p-4 rounded-xl mb-6 flex items-center gap-4">



<div className="flex items-center gap-3 flex-1">


<Search size={22}/>



<input


placeholder="Search candidate..."

value={search}


onChange={(e)=>

setSearch(e.target.value)

}


className="flex-1 bg-slate-800 px-4 py-3 rounded-lg outline-none"


/>



</div>







<button


onClick={exportToExcel}


className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg flex items-center gap-2 font-bold"


>


<FileSpreadsheet size={20}/>


Export Excel


</button>



</div>









{/* TABLE */}



<div className="bg-slate-900 rounded-2xl overflow-x-auto">


<table className="w-full">


<thead className="bg-slate-800">


<tr>


<th className="p-4 text-left">
Name
</th>


<th className="p-4 text-left">
Email
</th>


<th className="p-4 text-left">
Skills
</th>


<th className="p-4 text-left">
ATS
</th>


<th className="p-4 text-left">
Match
</th>


<th className="p-4 text-left">
Status
</th>


<th className="p-4 text-left">
Actions
</th>


</tr>


</thead>








<tbody>


{

filteredCandidates.map(candidate=>(


<tr

key={candidate.id}

className="border-t border-slate-700 hover:bg-slate-800"

>





<td className="p-4">

{candidate.name}

</td>





<td className="p-4">

{candidate.email}

</td>






<td className="p-4">


<div className="flex flex-wrap gap-2">


{

extractSkills(candidate.skills)

.map((skill,index)=>(


<span

key={index}

className="bg-cyan-600 px-3 py-1 rounded-full text-sm"

>

{skill}

</span>


))


}


</div>


</td>






<td className="p-4">


<span className="bg-blue-600 px-3 py-1 rounded-full">

{candidate.ats_score || 0}%

</span>


</td>






<td className="p-4">


<span className="bg-purple-600 px-3 py-1 rounded-full">

{candidate.match_score || 0}%

</span>


</td>






<td className="p-4">


<span className="bg-yellow-500 text-black px-3 py-1 rounded-full">


{candidate.status || "Pending"}


</span>


</td>









<td className="p-4 flex gap-2">





<button

onClick={()=>setSelectedCandidate(candidate)}

className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg"

>

<Eye size={18}/>

</button>







<button

disabled={loading}

onClick={()=>updateStatus(candidate.id,"Shortlisted")}

className="bg-green-600 hover:bg-green-700 p-2 rounded-lg"

>

<CheckCircle size={18}/>

</button>







<button

disabled={loading}

onClick={()=>updateStatus(candidate.id,"Rejected")}

className="bg-red-600 hover:bg-red-700 p-2 rounded-lg"

>

<XCircle size={18}/>

</button>







<button

onClick={()=>deleteCandidate(candidate.id)}

className="bg-gray-700 hover:bg-gray-800 p-2 rounded-lg"

>

<Trash2 size={18}/>

</button>




</td>



</tr>


))


}


</tbody>


</table>


</div>







<ResumeModal

candidate={selectedCandidate}

onClose={()=>setSelectedCandidate(null)}

/>







</div>


);


}