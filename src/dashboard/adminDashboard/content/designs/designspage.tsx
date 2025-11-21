// src/dashboard/adminDashboard/content/designs/DesignsPage.tsx
import React, { useState } from "react";
import {
  useGetDesignsQuery,
  useCreateDesignMutation,
  useUpdateDesignMutation,
  useDeleteDesignMutation,
 type TypeDesign,
} from "../../../../features/designs/designAPI";

const DesignsPage: React.FC = () => {
  const { data: designs, isLoading, isError } = useGetDesignsQuery();
  const [createDesign] = useCreateDesignMutation();
  const [updateDesign] = useUpdateDesignMutation();
  const [deleteDesign] = useDeleteDesignMutation();

  const [newDesign, setNewDesign] = useState({
    name: "",
    description: "",
    baseFlavor: "",
    size: "Small",
    basePrice: 0,
    imageUrl: "",
    category: "",
    available: true,
  });

  const [editingDesign, setEditingDesign] = useState<TypeDesign | null>(null);

  // Handle form changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewDesign((prev) => ({
      ...prev,
      [name]: name === "basePrice" ? Number(value) : value,
    }));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createDesign(newDesign).unwrap();
      alert("Design created successfully!");
      setNewDesign({
        name: "",
        description: "",
        baseFlavor: "",
        size: "Small",
        basePrice: 0,
        imageUrl: "",
        category: "",
        available: true,
      });
    } catch (err) {
      console.error(err);
      alert("Failed to create design.");
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDesign) return;
    try {
      await updateDesign(editingDesign).unwrap();
      alert("Design updated successfully!");
      setEditingDesign(null);
    } catch (err) {
      console.error(err);
      alert("Failed to update design.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this design?")) return;
    try {
      await deleteDesign(id).unwrap();
      alert("Design deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete design.");
    }
  };

  if (isLoading) return <p>Loading designs...</p>;
  if (isError) return <p>Error loading designs.</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Designs</h1>

      {/* Create / Update Form */}
      <form
        onSubmit={editingDesign ? handleUpdate : handleCreate}
        className="space-y-3 p-4 border rounded shadow mb-6 bg-gray-50"
      >
        <h2 className="font-semibold">
          {editingDesign ? "Update Design" : "Create New Design"}
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Design Name"
          value={editingDesign?.name ?? newDesign.name}
          onChange={handleChange}
          className="border p-1 w-full"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={editingDesign?.description ?? newDesign.description}
          onChange={handleChange}
          className="border p-1 w-full"
          required
        />

        <input
          type="text"
          name="baseFlavor"
          placeholder="Base Flavor"
          value={editingDesign?.baseFlavor ?? newDesign.baseFlavor}
          onChange={handleChange}
          className="border p-1 w-full"
          required
        />

        <select
          name="size"
          value={editingDesign?.size ?? newDesign.size}
          onChange={handleChange}
          className="border p-1 w-full"
        >
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>

        <input
          type="number"
          name="basePrice"
          placeholder="Base Price"
          value={editingDesign?.basePrice ?? newDesign.basePrice}
          onChange={handleChange}
          className="border p-1 w-full"
          required
        />

        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={editingDesign?.imageUrl ?? newDesign.imageUrl}
          onChange={handleChange}
          className="border p-1 w-full"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={editingDesign?.category ?? newDesign.category}
          onChange={handleChange}
          className="border p-1 w-full"
        />

        <div className="flex items-center space-x-2">
          <label>
            <input
              type="checkbox"
              name="available"
              checked={editingDesign?.available ?? newDesign.available}
              onChange={(e) =>
                setNewDesign((prev) => ({
                  ...prev,
                  available: e.target.checked,
                }))
              }
            />{" "}
            Available
          </label>
        </div>

        <button
          type="submit"
          className={`px-4 py-2 rounded text-white ${
            editingDesign ? "bg-green-500" : "bg-blue-500"
          }`}
        >
          {editingDesign ? "Update Design" : "Create Design"}
        </button>

        {editingDesign && (
          <button
            type="button"
            className="px-4 py-2 rounded bg-gray-400 text-white ml-2"
            onClick={() => setEditingDesign(null)}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Designs List */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Flavor</th>
            <th className="border p-2">Size</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Available</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {designs?.map((design) => (
            <tr key={design.designId} className="hover:bg-gray-100">
              <td className="border p-2">{design.name}</td>
              <td className="border p-2">{design.baseFlavor}</td>
              <td className="border p-2">{design.size}</td>
              <td className="border p-2">{design.basePrice}</td>
              <td className="border p-2">{design.category}</td>
              <td className="border p-2">
                {design.available ? "Yes" : "No"}
              </td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => setEditingDesign(design)}
                  className="px-2 py-1 bg-green-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(design.designId)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DesignsPage;
