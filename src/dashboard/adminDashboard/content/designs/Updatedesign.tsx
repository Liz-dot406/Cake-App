// src/components/admin/UpdateDesignForm.tsx
import React, { useState, useEffect } from "react";
import { useUpdateDesignMutation } from "../../../../features/designs/designAPI";

type UpdateDesignFormProps = {
  designId: number;
  currentDesign: {
    DesignName: string;
    Description: string;
    BaseFlavor: string;
    Size: "Small" | "Medium" | "Large";
    BasePrice: number;
    ImageUrl?: string;
    Category: string;
    Availability: boolean;
  };
  categories: string[];
  onClose: () => void;
};

const UpdateDesignForm: React.FC<UpdateDesignFormProps> = ({
  designId,
  currentDesign,
  categories,
  onClose,
}) => {
  const [updateDesign, { isLoading }] = useUpdateDesignMutation();

  const [formData, setFormData] = useState({
    DesignName: currentDesign.DesignName,
    Description: currentDesign.Description,
    BaseFlavor: currentDesign.BaseFlavor,
    Size: currentDesign.Size,
    BasePrice: currentDesign.BasePrice,
    ImageUrl: currentDesign.ImageUrl || "",
    Category: currentDesign.Category,
    Availability: currentDesign.Availability,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
     await updateDesign({ designId, ...formData }).unwrap();
      alert("Design updated successfully!");
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to update design.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow space-y-3 bg-gray-50">
      <div>
        <label className="block font-semibold">Design Name:</label>
        <input
          type="text"
          name="DesignName"
          value={formData.DesignName}
          onChange={handleChange}
          className="border p-1 w-full"
          required
        />
      </div>

      <div>
        <label className="block font-semibold">Description:</label>
        <textarea
          name="Description"
          value={formData.Description}
          onChange={handleChange}
          className="border p-1 w-full"
        />
      </div>

      <div>
        <label className="block font-semibold">Base Flavor:</label>
        <input
          type="text"
          name="BaseFlavor"
          value={formData.BaseFlavor}
          onChange={handleChange}
          className="border p-1 w-full"
        />
      </div>

      <div>
        <label className="block font-semibold">Size:</label>
        <select
          name="Size"
          value={formData.Size}
          onChange={handleChange}
          className="border p-1 w-full"
        >
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
      </div>

      <div>
        <label className="block font-semibold">Base Price:</label>
        <input
          type="number"
          name="BasePrice"
          value={formData.BasePrice}
          onChange={handleChange}
          className="border p-1 w-full"
        />
      </div>

      <div>
        <label className="block font-semibold">Category:</label>
        <select
          name="Category"
          value={formData.Category}
          onChange={handleChange}
          className="border p-1 w-full"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="Availability"
          checked={formData.Availability}
          onChange={handleChange}
          id="availability"
        />
        <label htmlFor="availability" className="font-semibold">
          Available
        </label>
      </div>

      <div>
        <label className="block font-semibold">Image URL:</label>
        <input
          type="text"
          name="ImageUrl"
          value={formData.ImageUrl}
          onChange={handleChange}
          className="border p-1 w-full"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="px-3 py-1 bg-gray-400 text-white rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          {isLoading ? "Updating..." : "Update"}
        </button>
      </div>
    </form>
  );
};

export default UpdateDesignForm;
