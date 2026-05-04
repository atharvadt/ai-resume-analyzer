import { Link } from "react-router-dom";

export default function Navbar({ toggle }) {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-800 text-black dark:text-white">
      <h2 className="font-bold text-lg">AI Resume Analyzer</h2>

      <div className="flex gap-4 items-center">
        <Link to="/">Upload</Link>
        <Link to="/dashboard">Dashboard</Link>

        <button
          onClick={toggle}
          className="bg-green-500 px-3 py-1 rounded-lg text-black font-semibold"
        >
          Toggle Mode
        </button>
      </div>
    </div>
  );
}