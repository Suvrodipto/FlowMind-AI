import { useEffect, useState } from "react";
import axios from "axios";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    AreaChart,
    Area
} from "recharts";


const API="http://127.0.0.1:8000";



export default function Analytics(){


const [candidates,setCandidates]=useState([]);





useEffect(()=>{

loadData();

},[]);






const loadData=async()=>{

try{

const res=await axios.get(
`${API}/candidates`
);


setCandidates(res.data);


}

catch(error){

console.log(error);

}


};







const total=candidates.length;


const avgATS=

total

?

Math.round(

candidates.reduce(

(a,c)=>

a+(c.ats_score||0),

0

)

/total

)

:

0;





const shortlisted=candidates.filter(

c=>c.status==="Shortlisted"

).length;



const rejected=candidates.filter(

c=>c.status==="Rejected"

).length;







const atsData=candidates.map(c=>(

{

name:c.name?.substring(0,12),

score:c.ats_score||0

}

));






const funnel=[

{

name:"Applied",

value:total

},

{

name:"Shortlisted",

value:shortlisted

},

{

name:"Rejected",

value:rejected

}

];







const skills=[

{

skill:"Python",

count:3

},

{

skill:"React",

count:2

},

{

skill:"SQL",

count:2

},

{

skill:"ML",

count:3

},

{

skill:"AI",

count:2

}

];







return(



<div className="min-h-screen bg-slate-950 text-white p-8">





<h1 className="text-4xl font-bold mb-2">

📊 Recruitment Intelligence Center

</h1>


<p className="text-gray-400 mb-8">

AI powered hiring analytics and candidate insights

</p>









{/* KPI CARDS */}



<div className="grid md:grid-cols-4 gap-6">





<Card

title="Total Candidates"

value={total}

icon="👥"

/>



<Card

title="Average ATS"

value={`${avgATS}%`}

icon="🎯"

/>



<Card

title="Shortlisted"

value={shortlisted}

icon="✅"

/>



<Card

title="Rejected"

value={rejected}

icon="❌"

/>





</div>









{/* AI SCORE */}



<div className="mt-8 bg-gradient-to-r from-cyan-600/20 to-purple-600/20 rounded-3xl p-8 border border-cyan-500/30">



<h2 className="text-2xl font-bold">

🤖 AI Hiring Confidence Score

</h2>




<div className="flex items-center gap-10 mt-6">


<div className="text-6xl font-bold text-cyan-400">

{

avgATS

}%

</div>


<div>


<p className="text-xl">

Recruitment Quality

</p>


<p className="text-gray-400">

Based on resume quality, ATS score and matching

</p>


</div>



</div>




<div className="mt-6 bg-slate-800 rounded-full h-5">


<div

className="bg-cyan-500 h-5 rounded-full"

style={{

width:`${avgATS}%`

}}


/>


</div>




</div>









{/* ATS GRAPH */}



<div className="bg-slate-900 rounded-3xl p-8 mt-8">


<h2 className="text-2xl font-bold mb-5">

📈 Candidate ATS Performance

</h2>




<ResponsiveContainer width="100%" height={300}>


<AreaChart data={atsData}>


<Area

dataKey="score"

stroke="#06b6d4"

fill="#0891b2"

/>


<XAxis dataKey="name"/>


<YAxis/>


<Tooltip/>


</AreaChart>



</ResponsiveContainer>



</div>









{/* LOWER ANALYTICS */}



<div className="grid md:grid-cols-2 gap-8 mt-8">





<div className="bg-slate-900 rounded-3xl p-8">


<h2 className="text-xl font-bold mb-5">

🏆 Hiring Funnel

</h2>



<ResponsiveContainer width="100%" height={300}>


<PieChart>


<Pie

data={funnel}

dataKey="value"

outerRadius={100}

label

>


{

funnel.map(

(item,index)=>(

<Cell key={index}/>

)

)

}



</Pie>



<Tooltip/>


</PieChart>



</ResponsiveContainer>


</div>








<div className="bg-slate-900 rounded-3xl p-8">


<h2 className="text-xl font-bold mb-5">

🛠 Skill Intelligence

</h2>




<ResponsiveContainer width="100%" height={300}>


<BarChart data={skills}>


<Bar

dataKey="count"

fill="#22c55e"

/>



<XAxis dataKey="skill"/>


<YAxis/>


<Tooltip/>


</BarChart>



</ResponsiveContainer>



</div>






</div>









{/* AI RECOMMENDATION */}



<div className="mt-8 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-3xl p-8 border border-green-500/30">


<h2 className="text-3xl font-bold">

🧠 AI Recruiter Recommendation

</h2>



<div className="mt-5 space-y-3 text-lg">


<p>

✓ Prioritize top ATS candidates

</p>


<p>

✓ Schedule interviews for shortlisted candidates

</p>


<p>

✓ Improve JD matching for low score resumes

</p>


<p>

✓ AI ranking is active

</p>


</div>



</div>








</div>



);


}









function Card({title,value,icon}){


return(

<div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl border border-slate-700">


<div className="text-3xl">

{icon}

</div>


<p className="text-gray-400 mt-3">

{title}

</p>


<h2 className="text-4xl font-bold text-cyan-400">

{value}

</h2>


</div>

);


}