import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const API = "https://flowmind-backend-04v7.onrender.com";


function Login() {


  const navigate = useNavigate();


  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);






  const handleLogin = async (e) => {


    e.preventDefault();


    setError("");

    setLoading(true);




    try {



      const response = await axios.post(


        `${API}/login`,


        {


          email: email.trim(),


          password: password.trim()


        },


        {


          headers:{


            "Content-Type":"application/json"


          }


        }


      );






      console.log(

        "LOGIN SUCCESS:",

        response.data

      );







      localStorage.setItem(


        "token",


        response.data.access_token


      );







      localStorage.setItem(


        "user",


        JSON.stringify(response.data.user)


      );








      navigate("/dashboard");




    }



    catch(error){



      console.log(

        "LOGIN ERROR:",

        error.response?.data

      );




      let errorMessage = "Invalid email or password";




      if(error.response?.data?.detail){



        if(

          typeof error.response.data.detail === "string"

        ){


          errorMessage = error.response.data.detail;


        }


        else{


          errorMessage = JSON.stringify(

            error.response.data.detail

          );


        }



      }



      setError(errorMessage);



    }





    finally{


      setLoading(false);


    }



  };









  return (



    <div className="min-h-screen bg-slate-950 flex items-center justify-center">



      <div className="bg-slate-800 p-8 rounded-2xl w-full max-w-md shadow-xl">






        <h1 className="text-3xl font-bold text-white text-center">

          🚀 FlowMind AI ATS

        </h1>






        <p className="text-slate-400 text-center mt-2 mb-8">

          Login to your dashboard

        </p>







        {

          error &&


          <div className="bg-red-600 text-white p-3 rounded-lg mb-5">


            {error}


          </div>


        }









        <form onSubmit={handleLogin}>






          <label className="text-white">

            Email

          </label>





          <input


            type="email"


            placeholder="flowmindadmin@gmail.com"


            value={email}


            onChange={(e)=>


              setEmail(e.target.value)


            }


            className="w-full mt-2 mb-5 p-3 rounded-lg bg-slate-700 text-white outline-none"


            required


          />









          <label className="text-white">

            Password

          </label>






          <input


            type="password"


            placeholder="Enter password"


            value={password}


            onChange={(e)=>


              setPassword(e.target.value)


            }


            className="w-full mt-2 mb-6 p-3 rounded-lg bg-slate-700 text-white outline-none"


            required


          />









          <button


            type="submit"


            disabled={loading}


            className="w-full bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-600 text-white py-3 rounded-xl font-bold"


          >



            {


              loading

              ?

              "Logging in..."

              :

              "Login"



            }



          </button>







        </form>








      </div>





    </div>




  );


}



export default Login;