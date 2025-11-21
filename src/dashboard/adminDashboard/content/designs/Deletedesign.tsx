// src/components/admin/designs/DeleteDesignButton.tsx
import React from "react";
import { useDeleteDesignMutation } from "../../../../features/designs/designAPI";

type DeleteDesignButtonProps = {
  designId: number;
  onSuccess?: () => void;
};

const DeleteDesignButton: React.FC<DeleteDesignButtonProps> = ({ designId, onSuccess }) => {
  const [deleteDesign, { isLoading }] = useDeleteDesignMutation();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this design?")) return;
    try {
      await deleteDesign(designId).unwrap();
      alert("Design deleted successfully!");
      onSuccess?.();
    } catch (err) {
      console.error(err);
      alert("Failed to delete design.");
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isLoading}
      className="px-2 py-1 bg-red-500 text-white rounded"
    >
      {isLoading ? "Deleting..." : "Delete"}
    </button>
  );
};

export default DeleteDesignButton;
