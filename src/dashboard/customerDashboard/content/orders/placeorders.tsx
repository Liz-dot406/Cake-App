import React, { useState } from "react";
import { useGetDesignsQuery } from "../../../../features/designs/designAPI";
import { useCreateOrderMutation } from "../../../../features/orders/ordersAPI";
import { toast } from "sonner";


const PlaceOrder: React.FC = () => {
const { data: designs } = useGetDesignsQuery();

  const [createOrder] = useCreateOrderMutation();

  const [form, setForm] = useState({
    DesignId: 0,
    Size: "" as "Small" | "Medium" | "Large" | "",
    Flavor: "",
    Message: "",
    DeliveryDate: "",
    Notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.DesignId) return toast.error("Please select a design.");
    if (!form.Size) return toast.error("Please select a size.");
    if (!form.Flavor) return toast.error("Please select a flavor.");
    if (!form.DeliveryDate) return toast.error("Choose a delivery date.");

    try {
      await createOrder({
        DesignId: form.DesignId,
        Size: form.Size,
        Flavor: form.Flavor,
        Message: form.Message,
        DeliveryDate: form.DeliveryDate,
        Notes: form.Notes, 
      }).unwrap();

      toast.success("Order placed successfully!");
      setForm({
        DesignId: 0,
        Size: "" as "Small" | "Medium" | "Large" | "",
        Flavor: "",
        Message: "",
        DeliveryDate: "",
        Notes: "",
      });
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to place order.");
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-pink-700 mb-4">Place Your Order</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg space-y-4"
      >
        {/* Select Design */}
        <div>
          <label className="font-semibold">Select Design:</label>
          <select
            name="DesignId"
            value={form.DesignId}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value={0}>-- Choose a Design --</option>
            {designs?.map((design) => (
              <option key={design.designId} value={design.designId}>
                {design.name} — KSh {design.basePrice}
              </option>
              ))}

           
          </select>
        </div>

        {/* Size */}
        <div>
          <label className="font-semibold">Cake Size:</label>
          <select
            name="Size"
            value={form.Size}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">-- Choose Size --</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>

        {/* Flavor */}
        <div>
          <label className="font-semibold">Cake Flavor:</label>
          <select
            name="Flavor"
            value={form.Flavor}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">-- Choose Flavor --</option>
            <option value="Vanilla">Vanilla</option>
            <option value="Chocolate">Chocolate</option>
            <option value="Red Velvet">Red Velvet</option>
            <option value="Black Forest">Black Forest</option>
          </select>
        </div>

        {/* Message on Cake */}
        <div>
          <label className="font-semibold">Message on Cake:</label>
          <input
            type="text"
            name="Message"
            value={form.Message}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Happy Birthday Liz!"
          />
        </div>

        {/* Delivery Date */}
        <div>
          <label className="font-semibold">Delivery Date:</label>
          <input
            type="date"
            name="DeliveryDate"
            value={form.DeliveryDate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="font-semibold">Additional Notes:</label>
          <textarea
            name="Notes"
            value={form.Notes}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Include gold sprinkles, floral piping..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default PlaceOrder;
