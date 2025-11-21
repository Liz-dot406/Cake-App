// src/dashboard/adminDashboard/content/analytics/AnalyticsPage.tsx
import React from "react";
import { useGetOrdersQuery } from "../../../../features/orders/ordersAPI";
import { useGetCakesQuery } from "../../../../features/cakes/cakesAPI";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28CFE"];

const AnalyticsPage: React.FC = () => {
  const { data: orders, isLoading: ordersLoading, isError: ordersError } =
    useGetOrdersQuery();
  const { data: cakes, isLoading: cakesLoading, isError: cakesError } =
    useGetCakesQuery();

  if (ordersLoading || cakesLoading) return <p>Loading analytics...</p>;
  if (ordersError || cakesError)
    return <p className="text-red-500">Error fetching analytics data.</p>;

  // Calculate order statuses
  const statusCounts = orders?.reduce((acc: any, order) => {
    acc[order.Status] = (acc[order.Status] || 0) + 1;
    return acc;
  }, {}) || {};

  const statusData = Object.keys(statusCounts).map((status, index) => ({
    name: status,
    value: statusCounts[status],
    color: COLORS[index % COLORS.length],
  }));

  // Cake availability (we no longer have an Availability field)
  const totalCakes = cakes?.length ?? 0;

  const cakeAvailabilityData = [
    { name: "Total Cakes", value: totalCakes, color: "#00C49F" },
  ];

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Analytics Dashboard</h1>

      {/* Orders by Status */}
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold mb-2">Orders by Status</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={statusData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value">
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="flex space-x-4 mt-2">
          {statusData.map((entry, index) => (
            <span
              key={index}
              className="px-2 py-1 rounded text-white font-medium"
              style={{ backgroundColor: entry.color }}
            >
              {entry.name}: {entry.value}
            </span>
          ))}
        </div>
      </div>

      {/* Total Cakes */}
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold mb-2">Total Cakes</h2>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={cakeAvailabilityData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {cakeAvailabilityData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex space-x-4 mt-2">
          {cakeAvailabilityData.map((entry, index) => (
            <span
              key={index}
              className="px-2 py-1 rounded text-white font-medium"
              style={{ backgroundColor: entry.color }}
            >
              {entry.name}: {entry.value}
            </span>
          ))}
        </div>
      </div>

      {/* Summary Card */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-500 text-white p-4 rounded shadow">
          <h3 className="font-semibold">Total Orders</h3>
          <p className="text-2xl">{orders?.length}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded shadow">
          <h3 className="font-semibold">Total Cakes</h3>
          <p className="text-2xl">{totalCakes}</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
