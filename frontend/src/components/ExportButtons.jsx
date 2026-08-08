import axios from "axios";

function ExportButtons() {

  const exportExcel = async () => {
    try {

      const response = await axios.get(
        "http://https://flowmind-backend-04v7.onrender.com/export/excel",
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");

      link.href = url;

      link.download = "Candidates.xlsx";

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (err) {
      console.error(err);
      alert("Export failed");
    }
  };

  return (

    <div className="flex gap-4">

      <button
        onClick={exportExcel}
        className="bg-green-600 hover:bg-green-500 text-white px-5 py-3 rounded-xl font-semibold shadow-lg"
      >
        📊 Export Excel
      </button>

    </div>

  );

}

export default ExportButtons;