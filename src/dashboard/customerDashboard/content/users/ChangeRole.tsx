import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { useUpdateUserMutation, type Typeuser } from "../../../../features/users/usersAPI";

type ChangeUserRoleProps = {
  user: Typeuser | null;
};

type RoleFormInputs = {
  role: "customer" | "admin";
};

const schema = yup.object({
  role: yup
    .string()
    .oneOf(["customer", "admin"], "Invalid role")
    .required("Role is required"),
});

export const ChangeUserRole: React.FC<ChangeUserRoleProps> = ({ user }) => {
  const [updateUser] = useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RoleFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      role: user?.role ?? "customer",
    },
  });

  const onSubmit: SubmitHandler<RoleFormInputs> = async (data) => {
    if (!user) return;

    try {
      await updateUser({
        user_Id: user.user_Id,
        role: data.role,
      }).unwrap();

      toast.success(`Role updated to ${data.role} for ${user.name}`);
      reset();
      (document.getElementById("role_modal") as HTMLDialogElement)?.close();
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to update role.");
    }
  };

  if (!user) return null;

  return (
    <dialog id="role_modal" className="modal">
      <form
        method="dialog"
        className="modal-box space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="font-bold text-lg">Change Role for {user.name}</h3>
        <p className="text-sm text-gray-600">Current role: {user.role}</p>

        {/* Role Selection */}
        <div>
          <label className="font-semibold">Select Role:</label>
          <select
            {...register("role")}
            className="w-full border p-2 rounded"
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm">{errors.role.message}</p>
          )}
        </div>

        <div className="modal-action">
          <button type="button" className="btn">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </dialog>
  );
};
