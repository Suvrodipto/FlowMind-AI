import {
  Bell,
  LogOut,
  UserCircle
} from "lucide-react";

import { useNavigate } from "react-router-dom";



function Navbar() {


  const navigate = useNavigate();



  const logout = () => {


    localStorage.removeItem(
      "token"
    );


    localStorage.removeItem(
      "user"
    );


    navigate("/login");


  };





  const user =
    JSON.parse(
      localStorage.getItem("user")
    )
    ||
    {
      name:"HR Admin"
    };





  return (

    <nav className="w-full bg-slate-900 border-b border-slate-800 px-8 py-4 flex justify-between items-center">


      {/* Logo */}


      <div>


        <h1 className="text-2xl font-bold text-white">

          🚀 FlowMind AI ATS

        </h1>


        <p className="text-xs text-slate-400">

          Intelligent Recruitment Platform

        </p>


      </div>







      {/* Right Section */}


      <div className="flex items-center gap-6">



        {/* Notification */}


        <button

          className="relative text-slate-300 hover:text-white"

        >

          <Bell size={24}/>


          <span className="absolute -top-2 -right-2 bg-cyan-600 text-xs rounded-full px-1.5">

            3

          </span>


        </button>







        {/* User */}


        <div className="flex items-center gap-3">


          <UserCircle

            size={35}

            className="text-cyan-400"

          />


          <div>


            <p className="text-white font-medium">

              {user.name}

            </p>


            <p className="text-xs text-slate-400">

              HR Manager

            </p>


          </div>



        </div>







        {/* Logout */}


        <button

          onClick={logout}

          className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-xl transition"

        >

          <LogOut size={18}/>

          Logout

        </button>




      </div>




    </nav>

  );

}


export default Navbar;