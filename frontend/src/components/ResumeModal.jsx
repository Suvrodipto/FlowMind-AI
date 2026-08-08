import axios from "axios";


export default function ResumeModal({candidate,onClose}){


if(!candidate)
return null;



const downloadResume = async()=>{

try{


const response = await axios.get(

`http://https://flowmind-backend-04v7.onrender.com/resume/${candidate.id}`,

{
responseType:"blob"
}

);



const url = window.URL.createObjectURL(

new Blob([response.data])

);



const link = document.createElement("a");


link.href=url;


link.download =

`${candidate.name}_Resume.pdf`;



document.body.appendChild(link);


link.click();


link.remove();



}

catch(error){

console.log(error);

alert("Resume download failed");

}


};







const skills = candidate.skills

?

candidate.skills
.toString()
.split(",")

:

[];







return(


<div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">


<div className="bg-slate-900 text-white w-[700px] max-h-[90vh] overflow-y-auto rounded-3xl p-8 shadow-2xl">





<div className="flex justify-between items-center">


<h2 className="text-3xl font-bold">

👤 Candidate Profile

</h2>


<button

onClick={onClose}

className="text-red-400 text-2xl"

>

✖

</button>


</div>








<div className="mt-6">


<h1 className="text-2xl font-bold text-cyan-400">

{candidate.name}

</h1>



<p className="text-gray-400 mt-2">

📧 {candidate.email || "No email"}

</p>




<p className="text-gray-400">

📱 {candidate.phone || "No phone"}

</p>



</div>









<div className="grid grid-cols-2 gap-5 mt-6">


<div className="bg-slate-800 p-5 rounded-xl">


<p className="text-gray-400">

ATS Score

</p>


<h2 className="text-4xl font-bold text-green-400">

{candidate.ats_score || 0}%

</h2>


</div>





<div className="bg-slate-800 p-5 rounded-xl">


<p className="text-gray-400">

JD Match

</p>


<h2 className="text-4xl font-bold text-cyan-400">

{candidate.match_score || 0}%

</h2>


</div>



</div>









<div className="mt-6">


<h2 className="text-xl font-bold">

🛠 Skills

</h2>



<div className="flex flex-wrap gap-3 mt-3">


{

skills.map((skill,index)=>(


<span

key={index}

className="bg-cyan-600 px-4 py-2 rounded-full"

>

{skill.trim()}

</span>


))

}



</div>


</div>









<div className="grid grid-cols-3 gap-4 mt-8">



<div className="bg-green-900/40 p-4 rounded-xl">


<h3 className="text-green-400 font-bold">

💪 Strengths

</h3>


<p className="mt-3 text-sm">

{candidate.strengths || 
"Good technical background"}

</p>


</div>






<div className="bg-red-900/40 p-4 rounded-xl">


<h3 className="text-red-400 font-bold">

⚠ Weaknesses

</h3>


<p className="mt-3 text-sm">

{candidate.weaknesses ||
"Needs further evaluation"}

</p>


</div>







<div className="bg-yellow-900/40 p-4 rounded-xl">


<h3 className="text-yellow-400 font-bold">

💡 Suggestions

</h3>


<p className="mt-3 text-sm">

{candidate.suggestions ||
"Improve projects and skills"}

</p>


</div>



</div>









<button

onClick={downloadResume}

className="mt-8 w-full bg-green-600 hover:bg-green-700 py-4 rounded-xl font-bold text-lg"

>

⬇ Download Original Resume

</button>





</div>


</div>


);


}