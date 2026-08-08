import { useState } from "react";
import axios from "axios";
import { UploadCloud, FileText } from "lucide-react";

function UploadCard({ loadCandidates }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadResume = async () => {
    if (!file) {
      alert("Please select a resume first!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      console.log("Uploading resume...");

      const res = await axios.post(
        "http://127.0.0.1:8000/upload",
        formData
      );

      console.log("✅ Upload Response:", res.data);

      console.log("Loading candidates...");
      await loadCandidates();
      console.log("✅ Candidates loaded.");

      alert("✅ Resume uploaded successfully!");

      setFile(null);

    } catch (err) {
      console.error("❌ Upload Error:", err);

      if (err.response) {
        console.log("Status:", err.response.status);
        console.log("Response:", err.response.data);
      }

      if (err.message) {
        console.log("Message:", err.message);
      }

      alert("❌ Upload failed!");
    }

    setLoading(false);
  };

  return (
    <div className="bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-700">

      <div className="flex items-center gap-3 mb-6">

        <div className="bg-cyan-600 p-3 rounded-xl">
          <UploadCloud className="text-white" size={28} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">
            Upload Resume
          </h2>

          <p className="text-slate-400 text-sm">
            Upload PDF or DOCX Resume
          </p>
        </div>

      </div>

      <label
        htmlFor="resume-upload"
        className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-slate-600 rounded-xl p-10 hover:border-cyan-500 transition"
      >

        <FileText
          size={50}
          className="text-cyan-400 mb-4"
        />

        <p className="text-white font-semibold">
          Click to choose a resume
        </p>

        <p className="text-slate-400 text-sm mt-2">
          PDF • DOC • DOCX
        </p>

        {file && (
          <div className="mt-5 bg-cyan-600 text-white px-4 py-2 rounded-lg">
            {file.name}
          </div>
        )}

      </label>

      <input
        id="resume-upload"
        type="file"
        hidden
        accept=".pdf,.doc,.docx"
        onChange={(e) => {
          console.log("Selected File:", e.target.files[0]);
          setFile(e.target.files[0]);
        }}
      />

      <button
        onClick={uploadResume}
        disabled={loading}
        className="mt-8 w-full bg-cyan-600 hover:bg-cyan-500 transition text-white py-3 rounded-xl font-semibold"
      >
        {loading ? "Uploading..." : "Upload Resume"}
      </button>

    </div>
  );
}

export default UploadCard;