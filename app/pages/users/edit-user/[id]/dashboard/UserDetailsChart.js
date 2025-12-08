// UserDetailsChart.js — Updated Version
"use client";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useRouter } from "next/navigation";

function UserDetailsChart({ userData, startDate, endDate, id }) {
  const router = useRouter();
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!userData || userData.length === 0) return;

    const ctx = canvasRef.current.getContext("2d");
    if (chartRef.current) chartRef.current.destroy();

    const labels = userData.map((u) => u.full_name || "Unknown");
    const hours = userData.map((u) => {
      const b = parseFloat((u.billableHours || "0:00").replace(":", ".")) || 0;
      const nb =
        parseFloat((u.nonBillableHours || "0:00").replace(":", ".")) || 0;
      return b + nb;
    });

    const colors = [
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#96CEB4",
      "#FECA57",
      "#FF9FF3",
      "#54A0FF",
      "#48DBFB",
      "#1DD1A1",
      "#FF6348",
      "#6C5CE7",
      "#A29BFE",
      "#FD79A8",
      "#FDCB6E",
      "#00D2D3",
      "#FF8A65",
      "#FF6B9D",
      "#C56CF0",
      "#FFB8B8",
      "#A8E6CF",
    ];

    chartRef.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels,
        datasets: [
          {
            data: hours,
            backgroundColor: colors,
            borderColor: colors.map((c) => c + "FF"),
            borderWidth: 2,
            hoverOffset: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,

        layout: {
          padding: 20,
        },

        plugins: {
          legend: {
            display: true,
            position: "right", //
            align: "center",
            labels: {
              padding: 12,
              usePointStyle: true,
              font: { size: 11 },
              color: "#374151",
              boxWidth: 12,
            },

            maxHeight: 400,
          },
          tooltip: {
            backgroundColor: "rgba(0,0,0,0.85)",
            callbacks: {
              label: (ctx) => {
                const v = ctx.parsed;
                const total = hours.reduce((a, b) => a + b, 0);
                const per = total > 0 ? ((v / total) * 100).toFixed(1) : 0;
                return `${ctx.label}: ${v.toFixed(1)} hrs (${per}%)`;
              },
            },
          },
        },

        onClick: (_, els) => {
          if (els[0]) {
            const pid = userData[els[0].index].id;
            router.push(
              `/graphrecord?startDate=${startDate || ""}&endDate=${
                endDate || ""
              }&projectId=${pid}&userId=${id}`
            );
          }
        },
      },
    });

    return () => chartRef.current?.destroy();
  }, [userData, startDate, endDate, id, router]);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 h-full flex flex-col">
      <h3 className="text-xl font-bold text-center text-gray-800 mb-6">
        Hours Distribution by Project
      </h3>

      <div className="flex-1 min-h-0 relative" style={{ height: "400px" }}>
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
}

export default UserDetailsChart;
