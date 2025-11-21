import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { usersAPI, type Typeuser } from "../../../../features/users/usersAPI";
import { UpdateUserModal } from "./Updateuser";
import { DeleteUserModal } from "./Deleteuser";

export default function UsersPage() {
  const [selectedUser, setSelectedUser] = useState<Typeuser | null>(null);
  const [userToDelete, setUserToDelete] = useState<Typeuser | null>(null);

  const {
    data: usersData,
    isLoading,
    error,
    refetch,
  } = usersAPI.useGetUsersQuery();

  return (
    <div className="p-4">
      {/* Loading */}
      {isLoading && <p className="text-center mt-4">Loading users...</p>}

      {/* Error */}
      {error && (
        <p className="text-red-500 text-center mt-4">
          {(error as any)?.data?.message || "Failed to fetch users. Check your API or token."}
        </p>
      )}

      {/* Users Table */}
      {!isLoading && usersData && usersData.length > 0 ? (
        <div className="md:overflow-x-auto">
          <table className="table table-xs w-full border border-gray-400">
            <thead>
              <tr className="bg-gray-600 text-white text-md lg:text-lg">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Created At</th>
                <th className="px-4 py-2">Updated At</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user) => (
                <tr key={user.user_Id} className="hover:bg-gray-300 border-b border-gray-400">
                  <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{user.name}</td>
                  <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{user.email}</td>
                  <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{user.phone || "-"}</td>
                  <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{user.role}</td>
                  <td className="px-4 py-2 border-r border-gray-400 lg:text-base">
                    {user.is_verified ? (
                      <span className="badge badge-success">Verified</span>
                    ) : (
                      <span className="badge badge-warning">Pending</span>
                    )}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-400 lg:text-base">
                    {user.Created_At ? new Date(user.Created_At).toLocaleString() : "-"}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-400 lg:text-base">
                    {user.Updated_At ? new Date(user.Updated_At).toLocaleString() : "-"}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => {
                        setSelectedUser(user);
                        (document.getElementById("update_modal") as HTMLDialogElement)?.showModal();
                      }}
                    >
                      <FaEdit size={20} />
                    </button>
                    <button
                      className="btn btn-sm btn-danger text-red-500"
                      onClick={() => {
                        setUserToDelete(user);
                        (document.getElementById("delete_modal") as HTMLDialogElement)?.showModal();
                      }}
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
        !isLoading &&
        (!usersData || usersData.length === 0) && (
          <p className="text-center mt-4 text-gray-700">No users found.</p>
        )
      )}

      {/* Update and Delete Modals */}
      <UpdateUserModal selectedUser={selectedUser} refetchUsers={refetch} />
      <DeleteUserModal userToDelete={userToDelete} refetchUsers={refetch} />
    </div>
  );
}
