import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";


export default function Layout() {


    return (

        <div className="flex min-h-screen bg-slate-950">


            {/* Sidebar */}

            <aside className="fixed left-0 top-0 h-screen w-64 z-50">

                <Sidebar />

            </aside>





            {/* Main Area */}

            <div className="flex-1 ml-64">


                {/* Top Navbar */}

                <Navbar />



                {/* Page Content */}

                <main className="p-6">

                    <Outlet />

                </main>


            </div>



        </div>

    );

}