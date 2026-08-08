import { useState } from "react";
import axios from "axios";
import { FileText, Briefcase } from "lucide-react";

function JobDescriptionUpload({ setJobDescription }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    console.log("========== JD Upload ==========");
    console.log("Button clicked");
    console.log("Selected file:", file);

    if (!file) {
      alert("Please select a Job Description file.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      console.log("Sending request...");

      const res = await axios.post(
        "http://127.0.0.1:8000/upload-job-description",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("SUCCESS");
      console.log(res.data);

      setJobDescription(res.data);

      alert("✅ Job Description uploaded successfully!");

      setFile(null);
    } catch (err) {
      console.error("Upload Error:", err);

      if (err.response) {
        console.log("Status:", err.response.status);
        console.log("Response:", err.response.data);
      }

      alert("❌ Job Description upload failed!");
    }

    setLoading(false);
  };

  return (
    <div className="bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-700">

      <div className="flex items-center gap-3 mb-6">

        <div className="bg-purple-600 p-3 rounded-xl">
          <Briefcase className="text-white" size={28} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">
            Upload Job Description
          </h2>

          <p className="text-slate-400 text-sm">
            Upload PDF, DOCX or TXT file
          </p>
        </div>

      </div>

      <label
        htmlFor="jd-upload"
        className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-slate-600 rounded-xl p-10 hover:border-purple-500 transition"
      >
        <FileText
          size={50}
          className="text-purple-400 mb-4"
        />

        <p className="text-white font-semibold">
          Click to choose Job Description
        </p>

        <p className="text-slate-400 text-sm mt-2">
          PDF • DOCX • TXT
        </p>

        {file && (
          <div className="mt-5 bg-purple-600 text-white px-4 py-2 rounded-lg">
            {file.name}
          </div>
        )}
      </label>

      <input
        id="jd-upload"
        type="file"
        accept=".pdf,.docx,.txt"
        hidden
        onChange={(e) => {
          console.log("File Selected:", e.target.files[0]);
          setFile(e.target.files[0]);
        }}
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="mt-8 w-full bg-purple-600 hover:bg-purple-500 transition text-white py-3 rounded-xl font-semibold"
      >
        {loading ? "Uploading..." : "Upload Job Description"}
      </button>

    </div>
  );
}

export default JobDescriptionUpload;