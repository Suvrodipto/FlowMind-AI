import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";
import { Link } from "react-router-dom";


const API = "https://flowmind-backend-04v7.onrender.com";



export default function Dashboard(){


const [candidates,setCandidates] = useState([]);

const [jobs,setJobs] = useState([]);





useEffect(()=>{

loadData();

},[]);







const loadData = async()=>{


try{


const candidateResponse = await axios.get(

`${API}/candidates`

);


setCandidates(candidateResponse.data);





const jobResponse = await axios.get(

`${API}/job/list`

);


setJobs(jobResponse.data);



}

catch(error){

console.log(error);

}


};









const totalCandidates = candidates.length;



const averageATS = totalCandidates

?

Math.round(

candidates.reduce(

(sum,c)=>sum+(c.ats_score||0),

0

)

/totalCandidates

)

:

0;







const averageMatch = totalCandidates

?

Math.round(

candidates.reduce(

(sum,c)=>sum+(c.match_score||0),

0

)

/totalCandidates

)

:

0;







const shortlisted = candidates.filter(

c=>c.status==="Shortlisted"

).length;







const chartData=[

{

name:"Shortlisted",

value:shortlisted

},

{

name:"Applied",

value:totalCandidates-shortlisted

}

];










const rankedCandidates=[...candidates].sort(

(a,b)=>

(b.ats_score||0)

-

(a.ats_score||0)

);









return(


<div className="min-h-screen bg-slate-950 text-white p-8">






<h1 className="text-4xl font-bold mb-8">

🚀 FlowMind AI Dashboard

</h1>









{/* TOP STATS */}



<div className="grid md:grid-cols-4 gap-6">



<StatCard

title="Total Candidates"

value={totalCandidates}

/>


<StatCard

title="Average ATS Score"

value={`${averageATS}%`}

/>


<StatCard

title="Average Match Score"

value={`${averageMatch}%`}

/>


<StatCard

title="Shortlisted"

value={shortlisted}

/>


</div>









{/* ANALYTICS */}



<div className="grid md:grid-cols-2 gap-8 mt-8">



<div className="bg-slate-900 p-6 rounded-2xl">


<h2 className="text-2xl font-bold mb-5">

📊 Hiring Analytics

</h2>




<PieChart width={350} height={300}>


<Pie

data={chartData}

dataKey="value"

outerRadius={100}

label

>


{

chartData.map(

(item,index)=>(

<Cell key={index}/>

)

)

}


</Pie>


<Tooltip/>

<Legend/>


</PieChart>



</div>







<div className="bg-slate-900 p-6 rounded-2xl">


<h2 className="text-2xl font-bold mb-5">

🤖 AI Insights

</h2>



<p>✓ {totalCandidates} resumes analyzed</p>

<p>✓ Average ATS {averageATS}%</p>

<p>✓ AI ranking enabled</p>

<p>✓ Resume matching active</p>

<p>✓ {jobs.length} jobs created</p>


</div>




</div>









{/* UPLOAD SECTION */}



<div className="grid md:grid-cols-2 gap-8 mt-8">



<Link to="/upload-resume">


<div className="bg-slate-900 p-8 rounded-2xl hover:bg-slate-800 transition">


<h2 className="text-2xl font-bold">

📄 Upload Resume

</h2>


<p className="text-gray-400 mt-2">

Upload candidate resume PDF/DOCX

</p>


<button className="mt-5 bg-cyan-600 px-6 py-3 rounded-lg">

Upload Resume

</button>


</div>


</Link>








<Link to="/job-requirement">


<div className="bg-slate-900 p-8 rounded-2xl hover:bg-slate-800 transition">


<h2 className="text-2xl font-bold">

💼 Upload Job Description

</h2>


<p className="text-gray-400 mt-2">

Upload JD PDF/DOCX/TXT

</p>


<button className="mt-5 bg-purple-600 px-6 py-3 rounded-lg">

Upload JD

</button>


</div>


</Link>




</div>









{/* AI LEADERBOARD */}



<div className="mt-10 bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl border border-slate-700 shadow-xl">





<div className="flex justify-between items-center mb-8">


<div>


<h2 className="text-3xl font-bold">

🏆 AI Candidate Leaderboard

</h2>


<p className="text-gray-400 mt-2">

AI ranked candidates using ATS score and matching

</p>


</div>



<div className="bg-cyan-600/20 text-cyan-400 px-5 py-2 rounded-full">

🤖 AI Powered

</div>



</div>









{/* TOP 3 */}



<div className="grid lg:grid-cols-3 gap-6 mb-8">



{

rankedCandidates

.slice(0,3)

.map((candidate,index)=>(



<div

key={candidate.id}

className={`p-6 rounded-2xl border

${

index===0

?

"border-yellow-500 bg-yellow-500/10"

:

index===1

?

"border-gray-400 bg-gray-400/10"

:

"border-orange-500 bg-orange-500/10"

}

`}


>




<div className="flex justify-between">


<div className="text-4xl">

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


</div>


<span className="bg-slate-800 px-3 py-1 rounded-full">

Rank #{index+1}

</span>


</div>







<h3 className="text-xl font-bold mt-5">

{candidate.name}

</h3>


<p className="text-gray-400">

{candidate.email || "No email"}

</p>









<ScoreBar

title="ATS Score"

value={candidate.ats_score || 0}

color="green"

/>





<ScoreBar

title="Match Score"

value={candidate.match_score || 0}

color="cyan"

/>







<div className="mt-5">


<span className="bg-green-600/20 text-green-400 px-4 py-2 rounded-full">

✓ AI Recommended

</span>


</div>



</div>



))


}



</div>









{/* REST CANDIDATES */}



<div className="space-y-4">


{

rankedCandidates

.slice(3)

.map((candidate,index)=>(


<div

key={candidate.id}

className="bg-slate-800 p-5 rounded-xl flex justify-between"


>


<div>


<h3 className="font-bold">

#{index+4} {candidate.name}

</h3>


<p className="text-gray-400">

{candidate.email || "No email"}

</p>


</div>




<div className="flex gap-8">


<div>

<p className="text-gray-400">

ATS

</p>

<p className="text-green-400 font-bold">

{candidate.ats_score || 0}%

</p>


</div>




<div>

<p className="text-gray-400">

Match

</p>

<p className="text-cyan-400 font-bold">

{candidate.match_score || 0}%

</p>


</div>



</div>


</div>


))


}



</div>





</div>









</div>


);


}









function StatCard({title,value}){


return(

<div className="bg-slate-900 p-6 rounded-2xl">


<p className="text-gray-400">

{title}

</p>


<h2 className="text-4xl font-bold text-cyan-400 mt-3">

{value}

</h2>


</div>

);

}









function ScoreBar({title,value,color}){


return(

<div className="mt-5">


<div className="flex justify-between mb-2">


<span>

{title}

</span>


<span>

{value}%

</span>


</div>




<div className="bg-slate-700 h-3 rounded-full">


<div

className={`h-3 rounded-full ${
color==="green"

?

"bg-green-500"

:

"bg-cyan-500"

}`}

style={{

width:`${value}%`

}}


/>


</div>


</div>


);


}