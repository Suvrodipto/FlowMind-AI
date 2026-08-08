import { useEffect, useState } from "react";
import axios from "axios";


const API="https://flowmind-backend-04v7.onrender.com"


export default function AIAnalysis(){


const [candidates,setCandidates]=useState([]);

const [selected,setSelected]=useState(null);





useEffect(()=>{

loadCandidates();

},[]);





const loadCandidates=async()=>{


try{


const res=await axios.get(

`${API}/candidates`

);


setCandidates(res.data);


if(res.data.length)

setSelected(res.data[0]);


}

catch(error){

console.log(error);

}


};






if(!selected)

return(

<div className="text-white p-10">

No candidate analysis available

</div>

);







const skills = selected.skills

?

selected.skills.split(",")

:

[];








return(


<div className="min-h-screen bg-slate-950 text-white p-8">







<h1 className="text-4xl font-bold mb-8 flex gap-3">


🧠 AI Resume Intelligence


</h1>








{/* Candidate Selector */}



<div className="bg-slate-900 p-5 rounded-2xl mb-8">


<h2 className="font-bold mb-3">

Select Candidate

</h2>



<select

className="bg-slate-800 p-3 rounded-lg w-full"

onChange={(e)=>

setSelected(

candidates[e.target.value]

)

}

>


{

candidates.map((c,i)=>(


<option

key={c.id}

value={i}

>

{c.name}

</option>


))


}


</select>



</div>









{/* PROFILE CARD */}



<div className="bg-gradient-to-r from-cyan-600/20 to-purple-600/20 border border-slate-700 rounded-3xl p-8">





<div className="flex justify-between items-center">


<div>


<h2 className="text-3xl font-bold">

👤 {selected.name}

</h2>



<p className="text-gray-300 mt-2">

{selected.email || "Email not available"}

</p>


</div>





<div className="bg-green-500/20 text-green-400 px-5 py-3 rounded-full">

AI Analyzed ✓

</div>



</div>






<div className="grid md:grid-cols-3 gap-6 mt-8">



<ScoreCard

title="ATS Score"

value={selected.ats_score || 0}

color="green"

/>



<ScoreCard

title="JD Match"

value={selected.match_score || 0}

color="cyan"

/>



<ScoreCard

title="Hiring Probability"

value={

Math.min(

(selected.ats_score||0)+10,

100

)

}

color="purple"

/>



</div>



</div>









{/* INSIGHTS */}



<div className="grid md:grid-cols-3 gap-6 mt-8">





<div className="bg-slate-900 rounded-2xl p-6 border border-green-500/30">


<h2 className="text-2xl font-bold text-green-400">

💪 Strengths

</h2>


<ul className="mt-5 space-y-3">


<li>

✓ Strong technical foundation

</li>


<li>

✓ Good programming exposure

</li>


<li>

✓ AI/Software development potential

</li>


</ul>


</div>








<div className="bg-slate-900 rounded-2xl p-6 border border-red-500/30">


<h2 className="text-2xl font-bold text-red-400">

⚠ Weaknesses

</h2>


<ul className="mt-5 space-y-3">


<li>

• Needs more industry projects

</li>


<li>

• Improve job specific keywords

</li>


<li>

• Increase practical experience

</li>


</ul>


</div>








<div className="bg-slate-900 rounded-2xl p-6 border border-yellow-500/30">


<h2 className="text-2xl font-bold text-yellow-400">

💡 AI Suggestions

</h2>


<ul className="mt-5 space-y-3">


<li>

→ Add more projects

</li>


<li>

→ Improve resume keywords

</li>


<li>

→ Add certifications

</li>


</ul>


</div>





</div>









{/* SKILLS */}



<div className="bg-slate-900 rounded-2xl p-8 mt-8">


<h2 className="text-3xl font-bold mb-6">

🛠 Detected Skills

</h2>





<div className="flex flex-wrap gap-4">


{

skills.map((skill,index)=>(


<span

key={index}

className="bg-gradient-to-r from-cyan-600 to-blue-600 px-5 py-2 rounded-full"

>

{skill.trim()}

</span>


))


}



</div>


</div>









{/* RECOMMENDATION */}



<div className="mt-8 bg-gradient-to-r from-green-600/20 to-cyan-600/20 rounded-2xl p-8 border border-green-500/30">


<h2 className="text-3xl font-bold">

🤖 AI Hiring Recommendation

</h2>



<p className="text-xl mt-4 text-gray-200">


{

(selected.ats_score||0)>70

?

"Highly recommended for interview round"

:

"Needs recruiter review before interview"

}


</p>



</div>








</div>


);


}








function ScoreCard({title,value,color}){


return(


<div className="bg-slate-900 p-6 rounded-xl">


<p className="text-gray-400">

{title}

</p>


<h2 className="text-4xl font-bold mt-3">


{value}%


</h2>



<div className="bg-slate-700 h-3 rounded-full mt-4">


<div

className={

`h-3 rounded-full

${

color==="green"

?

"bg-green-500"

:

color==="cyan"

?

"bg-cyan-500"

:

"bg-purple-500"

}

`

}


style={{

width:`${value}%`

}}


/>


</div>



</div>


);


}