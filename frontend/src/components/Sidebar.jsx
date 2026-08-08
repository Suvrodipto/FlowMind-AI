import { NavLink, useNavigate } from "react-router-dom";


export default function Sidebar(){


    const navigate = useNavigate();



    const logout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        navigate("/login");

    };



    const menuItems = [

        {
            name:"Dashboard",
            path:"/dashboard",
            icon:"🚀"
        },

        {
            name:"Candidates",
            path:"/candidates",
            icon:"👥"
        },

        {
            name:"Job Requirement",
            path:"/job-requirement",
            icon:"💼"
        },

        {
            name:"Analytics",
            path:"/analytics",
            icon:"📊"
        },

        {
            name:"AI Analysis",
            path:"/ai-analysis",
            icon:"🤖"
        },

        {
            name:"Settings",
            path:"/settings",
            icon:"⚙️"
        }

    ];





    return (

        <div className="h-screen w-64 bg-[#0b1220] text-white flex flex-col p-5 border-r border-slate-800">


            {/* Logo */}

            <div className="mb-10">


                <h1 className="text-3xl font-bold text-cyan-400">

                    🚀 FlowMind AI

                </h1>


                <p className="text-sm text-gray-400 mt-2">

                    AI Recruitment Platform

                </p>


            </div>





            {/* Menu */}

            <nav className="flex-1 space-y-3">


                {
                    menuItems.map((item)=>(


                        <NavLink

                            key={item.path}

                            to={item.path}


                            className={({isActive})=>

                            `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300

                            ${
                                isActive

                                ?

                                "bg-cyan-600 shadow-lg shadow-cyan-500/30"

                                :

                                "hover:bg-slate-800 text-gray-300"

                            }`

                            }


                        >


                            <span className="text-xl">

                                {item.icon}

                            </span>


                            <span className="font-medium">

                                {item.name}

                            </span>



                        </NavLink>


                    ))
                }



            </nav>








            {/* Profile */}


            <div className="border-t border-slate-700 pt-5">


                <div className="bg-slate-800 rounded-xl p-4 mb-4">


                    <p className="text-xs text-gray-400">

                        Logged in as

                    </p>


                    <p className="font-bold text-cyan-300">

                        Admin

                    </p>


                </div>




                <button

                    onClick={logout}

                    className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 transition font-semibold"

                >

                    🚪 Logout

                </button>


            </div>




        </div>

    );

}