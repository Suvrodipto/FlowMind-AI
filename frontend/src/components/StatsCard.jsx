function StatsCard({ analysis }) {

  if (!analysis) return null;


  const skills = Array.isArray(analysis.skills)
    ? analysis.skills
    : analysis.skills
      ? analysis.skills.split(",").map(skill => skill.trim())
      : [];



  return (

    <div className="bg-slate-800 text-white p-6 rounded-2xl shadow-xl">


      <h2 className="text-2xl font-bold mb-5">
        📊 Resume Analysis
      </h2>



      <div className="grid grid-cols-2 gap-4">


        <div className="bg-slate-900 p-4 rounded-xl">

          <p className="text-gray-400">
            ATS Score
          </p>

          <h3 className="text-3xl font-bold text-green-400">
            {analysis.score ?? analysis.ats_score ?? 0}%
          </h3>

        </div>




        <div className="bg-slate-900 p-4 rounded-xl">

          <p className="text-gray-400">
            JD Match
          </p>

          <h3 className="text-3xl font-bold text-blue-400">
            {analysis.match_score ?? 0}%
          </h3>

        </div>


      </div>





      <div className="mt-6">


        <h3 className="text-xl font-bold mb-3">
          🛠 Skills
        </h3>


        <div className="flex flex-wrap gap-2">


          {skills.length > 0 ? (

            skills.map((skill, index) => (

              <span

                key={index}

                className="bg-purple-600 px-3 py-1 rounded-full"

              >

                {skill}

              </span>

            ))

          ) : (

            <p className="text-gray-400">
              No skills detected
            </p>

          )}


        </div>


      </div>




      <div className="mt-6">


        <h3 className="text-xl font-bold mb-3">
          📝 Summary
        </h3>


        <p className="text-gray-300">

          {analysis.summary ||
            "No summary available"}

        </p>


      </div>



    </div>

  );

}


export default StatsCard;