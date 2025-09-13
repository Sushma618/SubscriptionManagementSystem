import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

export default function AdminAnalytics() {
  const [summary, setSummary] = useState(null);
  const [trends, setTrends] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [summaryRes, trendsRes] = await Promise.all([
          axios.get("/api/analytics/summary"),
          axios.get("/api/analytics/trends")
        ]);
        setSummary(summaryRes.data);
        setTrends(trendsRes.data);
      } catch {
        setError("Failed to load analytics");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div className="text-center py-8">Loading analytics...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-indigo-700">Analytics Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-indigo-50 p-4 rounded">
          <div className="text-lg font-semibold text-indigo-700">Active Subscriptions</div>
          <div className="text-3xl font-bold">{summary.totalActive}</div>
        </div>
        <div className="bg-pink-50 p-4 rounded">
          <div className="text-lg font-semibold text-pink-700">Cancelled Subscriptions</div>
          <div className="text-3xl font-bold">{summary.totalCancelled}</div>
        </div>
      </div>
      <div className="mb-8">
        <h3 className="font-semibold mb-2">Subscriptions by Plan</h3>
        <Bar
          data={{
            labels: summary.planStats.map(p => p.plan),
            datasets: [{
              label: "Subscriptions",
              data: summary.planStats.map(p => p.count),
              backgroundColor: "#6366f1"
            }]
          }}
          options={{
            responsive: true,
            plugins: { legend: { display: false } }
          }}
        />
      </div>
      <div className="mb-8">
        <h3 className="font-semibold mb-2">Monthly Subscription Trends</h3>
        <Line
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [
              {
                label: "Subscriptions",
                data: trends.monthly,
                borderColor: "#6366f1",
                backgroundColor: "#a5b4fc",
                fill: true
              },
              {
                label: "Revenue",
                data: trends.monthlyRevenue,
                borderColor: "#f59e42",
                backgroundColor: "#fde68a",
                fill: true,
                yAxisID: 'y1',
              }
            ]
          }}
          options={{
            responsive: true,
            plugins: { legend: { display: true } },
            scales: {
              y: { beginAtZero: true, title: { display: true, text: 'Subscriptions' } },
              y1: { beginAtZero: true, position: 'right', title: { display: true, text: 'Revenue (₹)' }, grid: { drawOnChartArea: false } }
            }
          }}
        />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Yearly Subscription & Revenue Trends</h3>
        <Bar
          data={{
            labels: ["2021", "2022", "2023", "2024", "2025"],
            datasets: [
              {
                label: "Subscriptions",
                data: trends.yearly,
                backgroundColor: "#f472b6"
              },
              {
                label: "Revenue",
                data: trends.yearlyRevenue,
                backgroundColor: "#fbbf24"
              }
            ]
          }}
          options={{
            responsive: true,
            plugins: { legend: { display: true } }
          }}
        />
      </div>
    </div>
  );
}
