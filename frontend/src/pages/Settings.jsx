import { useEffect, useState } from "react";


export default function Settings(){


const [theme,setTheme] = useState(

localStorage.getItem("theme") || "dark"

);


const [font,setFont] = useState(

localStorage.getItem("font") || "Inter"

);





const fonts = [

"Inter",
"Poppins",
"Roboto",
"Montserrat",
"Nunito",
"Open Sans"

];






useEffect(()=>{


const root = document.documentElement;


// Apply theme

root.setAttribute(

"data-theme",

theme

);



// Apply font globally

root.style.setProperty(

"--app-font",

font

);





localStorage.setItem(

"theme",

theme

);


localStorage.setItem(

"font",

font

);



},[theme,font]);










return(


<div className="min-h-screen bg-slate-950 text-white p-8">





<h1 className="text-4xl font-bold mb-8">

⚙️ Settings

</h1>









{/* THEME */}



<div className="bg-slate-900 p-8 rounded-2xl mb-8">


<h2 className="text-2xl font-bold mb-6">

🎨 Theme Settings

</h2>





<div className="grid md:grid-cols-2 gap-6">





<button

onClick={()=>setTheme("dark")}

className={`p-6 rounded-xl border transition

${

theme==="dark"

?

"border-cyan-500 bg-slate-800"

:

"border-slate-700"

}

`}

>


<h3 className="text-xl font-bold">

🌙 Dark Mode

</h3>


<p className="text-gray-400 mt-2">

Professional AI dashboard theme

</p>


</button>







<button

onClick={()=>setTheme("light")}

className={`p-6 rounded-xl border transition

${

theme==="light"

?

"border-cyan-500 bg-white text-black"

:

"border-slate-700"

}

`}

>


<h3 className="text-xl font-bold">

☀️ Light Mode

</h3>


<p className="text-gray-400 mt-2">

Clean recruiter workspace

</p>


</button>




</div>


</div>









{/* FONT */}



<div className="bg-slate-900 p-8 rounded-2xl">



<h2 className="text-2xl font-bold mb-6">

🔤 Font Style

</h2>







<div className="grid md:grid-cols-3 gap-5">


{

fonts.map((item)=>(


<button


key={item}


onClick={()=>setFont(item)}


className={`p-6 rounded-xl border text-xl transition


${

font===item

?

"border-cyan-500 bg-cyan-500/20"

:

"border-slate-700"

}


`}


style={{

fontFamily:item

}}


>


{item}


</button>


))


}



</div>









<div className="mt-8 bg-slate-800 p-6 rounded-xl">


<h3 className="text-xl font-bold">

Preview

</h3>


<p className="mt-3 text-lg">


FlowMind AI - AI Recruitment Intelligence Platform

</p>


</div>







</div>








</div>


);


}