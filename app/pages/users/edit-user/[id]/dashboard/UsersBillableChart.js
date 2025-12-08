"use client";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useRouter } from "next/navigation";

function UsersBillableChart({ totalHours, projectId, startDate, endDate, id }) {
  const router = useRouter();
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (
      !totalHours ||
      (!totalHours.totalBillable && !totalHours.totalNonBillable)
    )
      return;

    const ctx = canvasRef.current.getContext("2d");
    if (chartRef.current) chartRef.current.destroy();

    const b =
      parseFloat((totalHours.totalBillable || "0:00").replace(":", ".")) || 0;
    const nb =
      parseFloat((totalHours.totalNonBillable || "0:00").replace(":", ".")) ||
      0;

    chartRef.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Billable Hours", "Non-Billable Hours"],
        datasets: [
          {
            data: [b, nb],
            backgroundColor: ["#10B981", "#EF4444"],
            borderColor: ["#059669", "#DC2626"],
            borderWidth: 2,
            hoverOffset: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            labels: {
              padding: 20,
              usePointStyle: true,
              font: { size: 13, weight: "600" },
              color: "#374151",
            },
          },
          tooltip: {
            backgroundColor: "rgba(0,0,0,0.8)",
            callbacks: {
              label: (ctx) => {
                const v = ctx.parsed;
                const t = b + nb;
                const p = t > 0 ? ((v / t) * 100).toFixed(1) : 0;
                return `${ctx.label}: ${v.toFixed(1)} hrs (${p}%)`;
              },
            },
          },
        },
        onClick: (_, els) => {
          if (els[0]) {
            const isBillable = els[0].index === 0 ? 1 : 0;
            router.push(
              `/graphrecord?startDate=${startDate || ""}&endDate=${
                endDate || ""
              }&projectId=${projectId}&isBillable=${isBillable}&userId=${id}`
            );
          }
        },
      },
    });

    return () => chartRef.current?.destroy();
  }, [totalHours, projectId, startDate, endDate, id, router]);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 h-full flex flex-col">
      <h3 className="text-xl font-bold text-center text-gray-800 mb-6">
        Billable vs Non-Billable Hours
      </h3>
      <div className="flex-1 min-h-0 relative">
        <canvas ref={canvasRef} className="max-h-full"></canvas>
      </div>
    </div>
  );
}

export default UsersBillableChart;
