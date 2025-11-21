// src/dashboard/adminDashboard/content/orders/OrdersPage.tsx
import React, { useState } from "react";
import { useGetOrdersQuery, useDeleteOrderMutation,  type TypeOrder } from "../../../../features/orders/ordersAPI";
import UpdateOrderForm from "./Updateorder";

const OrdersPage: React.FC = () => {
  const { data: orders, isLoading, isError } = useGetOrdersQuery();
  const [deleteOrder] = useDeleteOrderMutation();

  const [selectedOrder, setSelectedOrder] = useState<TypeOrder | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  if (isLoading) return <p>Loading orders...</p>;
  if (isError) return <p>Error fetching orders.</p>;
  if (!orders || orders.length === 0) return <p>No orders found.</p>;

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this order?")) {
      try {
        await deleteOrder(id).unwrap();
        alert("Order deleted successfully!");
      } catch (err) {
        console.error(err);
        alert("Failed to delete order.");
      }
    }
  };

  const handleUpdate = (order: TypeOrder) => {
    setSelectedOrder(order);
    setShowUpdateModal(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setShowUpdateModal(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      <table className="min-w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">User ID</th>
            <th className="p-2 border">Flavor</th>
            <th className="p-2 border">Size</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Delivery Date</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.Id} className="text-center">
              <td className="p-2 border">{order.Id}</td>
              <td className="p-2 border">{order.userid}</td>
              <td className="p-2 border">{order.Flavor}</td>
              <td className="p-2 border">{order.Size}</td>
              <td className="p-2 border">{order.Status}</td>
              <td className="p-2 border">{order.DeliveryDate.split("T")[0]}</td>
              <td className="p-2 border flex justify-center gap-2">
                <button
                  onClick={() => handleUpdate(order)}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(order.Id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for updating order */}
      {showUpdateModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded w-96">
            <h3 className="text-xl font-bold mb-3">Update Order #{selectedOrder.Id}</h3>
            <UpdateOrderForm order={selectedOrder} onClose={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
