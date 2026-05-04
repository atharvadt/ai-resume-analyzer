import { PieChart, Pie, Cell } from "recharts";

export default function ScoreCard() {
  const data = [
    { name: "Skills", value: 80 },
    { name: "Experience", value: 60 },
    { name: "Keywords", value: 70 },
  ];

  return (
    <div className="text-center">
      <h3 className="text-xl font-semibold mb-4">
        ATS Score: 72%
      </h3>

      <div className="flex justify-center">
        <PieChart width={300} height={300}>
          <Pie data={data} dataKey="value" outerRadius={100}>
            {data.map((entry, index) => (
              <Cell key={index} />
            ))}
          </Pie>
        </PieChart>
      </div>
    </div>
  );
}