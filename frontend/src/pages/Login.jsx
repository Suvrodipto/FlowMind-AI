import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


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

        "http://127.0.0.1:8000/login",

        {

          email: email,

          password: password

        },

        {

          headers: {

            "Content-Type": "application/json"

          }

        }

      );



      console.log(
        "Login Success:",
        response.data
      );




      localStorage.setItem(

        "token",

        response.data.access_token

      );




      localStorage.setItem(

        "user",

        JSON.stringify(
          response.data.user
        )

      );





      navigate("/dashboard");



    }



    catch(error) {


      console.log(

        "Login Error:",

        error.response?.data

      );



      setError(

        error.response?.data?.detail

        ||

        "Invalid email or password"

      );


    }



    finally {


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

            placeholder="admin@flowmind.ai"

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

            placeholder="admin123"

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

            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-3 rounded-xl font-bold"

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