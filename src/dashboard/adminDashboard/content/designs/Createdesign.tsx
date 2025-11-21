// src/components/admin/designs/CreateDesignForm.tsx
import React, { useState } from "react";
import { useCreateDesignMutation, type TypeDesign } from "../../../../features/designs/designAPI";

type CreateDesignFormProps = {
  onSuccess?: () => void;
};

const CreateDesignForm: React.FC<CreateDesignFormProps> = ({ onSuccess }) => {
  const [createDesign, { isLoading }] = useCreateDesignMutation();
  const [formData, setFormData] = useState<Omit<TypeDesign, "designId" | "createdAt" | "updatedAt">>({
    name: "",
    description: "",
    baseFlavor: "",
    size: "Small",
    basePrice: 0,
    imageUrl: "",
    category: "",
    available: true,
  });

 const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
) => {
  const { name, value, type } = e.target;

  let newValue: string | number | boolean = value;

  if (type === "checkbox") {
    
    newValue = (e.target as HTMLInputElement).checked;
  } else if (name === "basePrice") {
    newValue = Number(value);
  }

  setFormData((prev) => ({
    ...prev,
    [name]: newValue,
  }));
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createDesign(formData).unwrap();
      alert("Design created successfully!");
      setFormData({
        name: "",
        description: "",
        baseFlavor: "",
        size: "Small",
        basePrice: 0,
        imageUrl: "",
        category: "",
        available: true,
      });
      onSuccess?.();
    } catch (error) {
      console.error(error);
      alert("Failed to create design.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow space-y-3 bg-gray-50">
      <h2 className="font-semibold text-lg">Create New Design</h2>
      <input type="text" name="name" placeholder="Design Name" value={formData.name} onChange={handleChange} className="border p-1 w-full" required />
      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="border p-1 w-full" required />
      <input type="text" name="baseFlavor" placeholder="Base Flavor" value={formData.baseFlavor} onChange={handleChange} className="border p-1 w-full" required />
      <select name="size" value={formData.size} onChange={handleChange} className="border p-1 w-full">
        <option value="Small">Small</option>
        <option value="Medium">Medium</option>
        <option value="Large">Large</option>
      </select>
      <input type="number" name="basePrice" placeholder="Base Price" value={formData.basePrice} onChange={handleChange} className="border p-1 w-full" required />
      <input type="text" name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} className="border p-1 w-full" />
      <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="border p-1 w-full" />
      <label className="flex items-center space-x-2">
        <input type="checkbox" name="available" checked={formData.available} onChange={handleChange} />
        <span>Available</span>
      </label>
      <button type="submit" disabled={isLoading} className="px-4 py-2 bg-blue-500 text-white rounded">
        {isLoading ? "Creating..." : "Create Design"}
      </button>
    </form>
  );
};

export default CreateDesignForm;
