import { useState } from "react";
import {useGetUsersQuery,type Typeuser,} from "../../../../features/users/usersAPI";
import { ChangeUserRole } from "./ChangeRole";

export const Users: React.FC = () => {
  const { data: usersData, isLoading, error } = useGetUsersQuery();
  const [selectedUser, setSelectedUser] = useState<Typeuser | null>(null);

  return (
    <div className="p-4">
      {/* Role change modal */}
      <ChangeUserRole user={selectedUser} />

      {/* Loading and error states */}
      {isLoading && <p>Loading users...</p>}
      {error && <p className="text-red-500">Error fetching users</p>}

      {/* Users table */}
      {usersData && usersData.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table table-xs w-full">
            <thead>
              <tr className="bg-gray-600 text-white text-md lg:text-lg">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Verified</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user: Typeuser) => (
                <tr
                  key={user.user_Id}
                  className="hover:bg-gray-300 border-b border-gray-400"
                >
                  <td className="px-4 py-2 border-r border-gray-400 lg:text-base">
                    {user.name}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-400 lg:text-base">
                    {user.email}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-400 lg:text-base">
                    {user.role}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-400 lg:text-base">
                    {user.is_verified ? (
                      <span className="badge-success lg:text-base">Verified</span>
                    ) : (
                      <span className="badge-warning lg:text-base">Not Verified</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => {
                        setSelectedUser(user);
                        (
                          document.getElementById(
                            "role_modal"
                          ) as HTMLDialogElement
                        )?.showModal();
                      }}
                    >
                      Change Role
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !isLoading && <p>No users found.</p>
      )}
    </div>
  );
};
