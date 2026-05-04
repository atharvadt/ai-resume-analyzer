import { useLocation } from "react-router-dom";

export default function Dashboard() {
  const location = useLocation();
  const result = location.state;

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
        <h2 className="text-xl">No Data Available</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white p-6">

      <h1 className="text-3xl font-bold mb-6 text-center">
        Resume Analysis Dashboard
      </h1>

      <div className="bg-gray-200 dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-xl mx-auto">
        
        {/* Score */}
        <h2 className="text-2xl font-bold mb-4 text-center">
          ATS Score: {result.score}%
        </h2>

        {/* Suggestions */}
        <h3 className="text-lg font-semibold mb-2">Suggestions:</h3>
        <ul className="mb-4 space-y-2">
          {result.suggestions.map((item, index) => (
            <li key={index}>✔ {item}</li>
          ))}
        </ul>

        {/* 🔥 Missing Keywords Highlight */}
        <h3 className="text-lg font-semibold mb-2">Missing Keywords:</h3>
        <div className="flex flex-wrap gap-2">
          {result.suggestions.map((item, index) => {
            const keyword = item.split('"')[1]; // extract keyword
            return (
              <span
                key={index}
                className="bg-red-500 text-white px-3 py-1 rounded-full text-sm"
              >
                {keyword}
              </span>
            );
          })}
        </div>

      </div>

    </div>
  );
}