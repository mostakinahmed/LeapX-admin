const ctx = document.getElementById("ordersChart").getContext("2d");
const ordersChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Jan", "Feb", "Mar"],
    datasets: [
      {
        label: "Pending",
        data: [5, 8, 4],
        backgroundColor: "rgba(255,206,86,0.6)",
        borderRadius: 6,
      },
      {
        label: "Completed",
        data: [3, 6, 7],
        backgroundColor: "rgba(75,192,192,0.6)",
        borderRadius: 6,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false, // very important for custom height
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "#E5E7EB" } },
    },
  },
});
