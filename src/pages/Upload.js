import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Upload() {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone();
  const navigate = useNavigate();

  const [jobDesc, setJobDesc] = useState("");

  const handleAnalyze = async () => {
    if (acceptedFiles.length === 0) {
      alert("Please upload a resume first");
      return;
    }

    if (!jobDesc) {
      alert("Please enter job description");
      return;
    }

    const formData = new FormData();
    formData.append("resume", acceptedFiles[0]);
    formData.append("jobDesc", jobDesc);

    try {
      const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      navigate("/dashboard", { state: data });

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white flex flex-col items-center justify-center p-6">
      
      <h1 className="text-3xl font-bold mb-6">AI Resume Analyzer</h1>

      {/* 🔥 Job Description Input */}
      <textarea
        placeholder="Enter Job Description (e.g. React Developer with Node and SQL)"
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
        className="w-full max-w-xl p-4 mb-4 rounded-lg border border-gray-400 text-black"
      />

      {/* Upload Box */}
      <div
        {...getRootProps()}
        className="w-full max-w-xl p-10 border-2 border-dashed border-green-400 rounded-xl text-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 transition"
      >
        <input {...getInputProps()} />
        <p className="text-lg">
          Drag & Drop your resume here or click to upload
        </p>
      </div>

      {/* Uploaded Files */}
      <div className="mt-6 w-full max-w-xl">
        <h3 className="text-xl mb-2">Uploaded Files:</h3>
        <ul className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg">
          {acceptedFiles.map((file) => (
            <li
              key={file.path}
              className="border-b border-gray-400 dark:border-gray-700 py-2"
            >
              {file.path}
            </li>
          ))}
        </ul>
      </div>

      {/* Analyze Button */}
      <button
        onClick={handleAnalyze}
        className="mt-6 bg-green-500 px-6 py-2 rounded-lg text-black font-semibold hover:scale-105 transition"
      >
        Analyze Resume
      </button>

    </div>
  );
}