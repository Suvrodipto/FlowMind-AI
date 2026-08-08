import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";



import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";

import CandidateManagement from "./pages/CandidateManagement";

import JobRequirement from "./pages/JobRequirement";

import Analytics from "./pages/Analytics";

import AIAnalysis from "./pages/AIAnalysis";

import Settings from "./pages/Settings";

import UploadResume from "./pages/UploadResume";



import Layout from "./components/Layout";

import ProtectedRoute from "./components/ProtectedRoute";





function App(){


return(


<BrowserRouter>



<Routes>





{/* DEFAULT */}


<Route

path="/"

element={

<Navigate to="/login"/>

}

/>








{/* LOGIN */}


<Route

path="/login"

element={<Login/>}

/>









{/* PROTECTED APPLICATION */}



<Route


element={


<ProtectedRoute>


<Layout/>


</ProtectedRoute>


}


>




<Route

path="/dashboard"

element={<Dashboard/>}

/>







<Route

path="/candidates"

element={<CandidateManagement/>}

/>







<Route

path="/job-requirement"

element={<JobRequirement/>}

/>







<Route

path="/analytics"

element={<Analytics/>}

/>







<Route

path="/ai-analysis"

element={<AIAnalysis/>}

/>







<Route

path="/settings"

element={<Settings/>}

/>







<Route

path="/upload-resume"

element={<UploadResume/>}

/>






</Route>









{/* UNKNOWN ROUTES */}



<Route

path="*"

element={

<Navigate to="/dashboard"/>

}

/>







</Routes>





</BrowserRouter>


);


}



export default App;