import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { cakesAPI, type TypeCake } from "../../../../features/cakes/cakesAPI";
import { CreateCakeModal } from "./Createcake";
import { UpdateCakeModal } from "./Updatecake";
import { DeleteCakeModal } from "./Deletecake";
import { toast } from "sonner";

export default function CakesPage() {
  const [selectedCake, setSelectedCake] = useState<TypeCake | null>(null);
  const [cakeToDelete, setCakeToDelete] = useState<TypeCake | null>(null);

  const { data: cakesData, isLoading, error, refetch } = cakesAPI.useGetCakesQuery();

  const handleDeleteClick = (cake: TypeCake) => {
    // Show a confirmation toast before opening modal
    toast.promise(
      new Promise<void>((resolve, reject) => {
        const confirmed = window.confirm(`Are you sure you want to delete "${cake.name}"?`);
        if (confirmed) {
          setCakeToDelete(cake);
          const modal = document.getElementById(`delete_cake_modal_${cake.cake_Id}`) as HTMLDialogElement;
          modal?.showModal();
          resolve();
        } else {
          reject();
        }
      }),
      {
        loading: "Checking...",
        success: "Ready to delete!",
        error: "Delete cancelled",
      }
    );
  };

  return (
    <div className="p-4">
      {/* Add Cake Button */}
      <div className="flex justify-center mb-3 mt-3">
        <button
          className="btn bg-gray-600 text-white hover:bg-gray-700 border border-gray-400 rounded-lg px-4 py-2 text-lg"
          onClick={() =>
            (document.getElementById("create_cake_modal") as HTMLDialogElement)?.showModal()
          }
        >
          Add Cake
        </button>
      </div>

      {/* Modals */}
      <CreateCakeModal refetchCakes={refetch} />
      <UpdateCakeModal selectedCake={selectedCake} refetchCakes={refetch} />
      {cakeToDelete && (
        <DeleteCakeModal cake={cakeToDelete} refetchCakes={refetch} />
      )}

      {/* Loading/Error */}
      {isLoading && <p className="text-center mt-4">Loading cakes...</p>}
      {error && (
        <p className="text-red-500 text-center mt-4">
          {(error as any)?.data?.message || "Failed to fetch cakes."}
        </p>
      )}

      {/* Cakes Table */}
      {!isLoading && cakesData && cakesData.length > 0 ? (
        <div className="md:overflow-x-auto">
          <table className="table table-xs w-full border border-gray-400">
            <thead>
              <tr className="bg-gray-600 text-white text-md lg:text-lg">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Available</th>
                <th className="px-4 py-2">Created At</th>
                <th className="px-4 py-2">Updated At</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cakesData.map((cake) => (
                <tr key={cake.cake_Id} className="hover:bg-gray-300 border-b border-gray-400">
                  <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{cake.name}</td>
                  <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{cake.description}</td>
                  <td className="px-4 py-2 border-r border-gray-400 lg:text-base">KSh {cake.price}</td>
                  <td className="px-4 py-2 border-r border-gray-400 lg:text-base">
                    {cake.available ? (
                      <span className="badge badge-success">Yes</span>
                    ) : (
                      <span className="badge badge-warning">No</span>
                    )}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-400 lg:text-base">
                    {cake.Created_At ? new Date(cake.Created_At).toLocaleString() : "-"}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-400 lg:text-base">
                    {cake.Updated_At ? new Date(cake.Updated_At).toLocaleString() : "-"}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    {/* Edit */}
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => {
                        setSelectedCake(cake);
                        (document.getElementById("update_cake_modal") as HTMLDialogElement)?.showModal();
                      }}
                    >
                      <FaEdit size={20} />
                    </button>

                    {/* Delete */}
                    <button
                      className="btn btn-sm btn-danger text-red-500"
                      onClick={() => handleDeleteClick(cake)}
                    >
                      <MdDeleteForever size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !isLoading && (!cakesData || cakesData.length === 0) && (
          <p className="text-center mt-4 text-gray-700">No cakes found.</p>
        )
      )}
    </div>
  );
}
