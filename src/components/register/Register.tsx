
import { useForm, type SubmitHandler } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { usersAPI } from "../../features/auth/userApi"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

type RegisterInputs = {
  name: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

const schema = yup.object({
  name: yup
    .string()
    .max(50, "Max 50 characters")
    .required("Name is required"),
  email: yup
    .string()
    .email("Invalid email")
    .max(100, "Max 100 characters")
    .required("Email is required"),
  phone: yup
    .string()
    .matches(/^\+?\d{10,15}$/, "Enter a valid phone number")
    .max(20, "Max 20 characters")
    .required("Phone number is required"),
  password: yup
    .string()
    .min(6, "Min 6 characters")
    .max(255, "Max 255 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
})

export const Register = () => {
  const navigate = useNavigate()
  const [createUser, { isLoading }] = usersAPI.useCreateUsersMutation()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterInputs>({
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    try {
      const response = await createUser(data).unwrap()
      console.log("Response:", response)

      toast.success(response.message || "Registration successful!")

      reset()
      setTimeout(() => {
        navigate("/verification", {
          state: { email: data.email },
        })
      }, 2000)
    } catch (error: any) {
      console.error("Error:", error)

      const message =
        error?.data?.message ||
        error?.data?.error ||
        error?.message ||
        "An unknown error occurred"

      if (message.toLowerCase().includes("email already exists")) {
        toast.warning("This email is already registered. Try logging in instead.")
      } else {
        toast.error(message)
      }
    }
  }

  return (
    <>


      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-amber-50 px-4">
        <div className="w-full max-w-lg p-8 rounded-2xl shadow-xl bg-white/90 backdrop-blur-sm border border-rose-100">
          <h1 className="text-3xl font-extrabold mb-2 text-center text-rose-700 tracking-wide">
            Create Your Account
          </h1>
          <p className="text-center text-rose-400 mb-6 font-medium">
            Join Bakers House and start baking happiness!
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
           
            <div>
              <input
                type="text"
                {...register("name")}
                placeholder="Name"
                className="input border border-rose-200 rounded-md w-full p-3 text-lg focus:ring-2 focus:ring-rose-400 focus:border-rose-300 bg-rose-50/50 placeholder:text-rose-300"
              />
              {errors.name && (
                <span className="text-rose-600 text-sm">{errors.name.message}</span>
              )}
            </div>

            
            <div>
              <input
                type="email"
                {...register("email")}
                placeholder="Email"
                className="input border border-rose-200 rounded-md w-full p-3 text-lg focus:ring-2 focus:ring-rose-400 focus:border-rose-300 bg-rose-50/50 placeholder:text-rose-300"
              />
              {errors.email && (
                <span className="text-rose-600 text-sm">{errors.email.message}</span>
              )}
            </div>

          
            <div>
              <input
                type="text"
                {...register("phone")}
                placeholder="Phone Number"
                className="input border border-rose-200 rounded-md w-full p-3 text-lg focus:ring-2 focus:ring-rose-400 focus:border-rose-300 bg-rose-50/50 placeholder:text-rose-300"
              />
              {errors.phone && (
                <span className="text-rose-600 text-sm">{errors.phone.message}</span>
              )}
            </div>

          
            <div>
              <input
                type="password"
                {...register("password")}
                placeholder="Password"
                className="input border border-rose-200 rounded-md w-full p-3 text-lg focus:ring-2 focus:ring-rose-400 focus:border-rose-300 bg-rose-50/50 placeholder:text-rose-300"
              />
              {errors.password && (
                <span className="text-rose-600 text-sm">{errors.password.message}</span>
              )}
            </div>

           
            <div>
              <input
                type="password"
                {...register("confirmPassword")}
                placeholder="Confirm Password"
                className="input border border-rose-200 rounded-md w-full p-3 text-lg focus:ring-2 focus:ring-rose-400 focus:border-rose-300 bg-rose-50/50 placeholder:text-rose-300"
              />
              {errors.confirmPassword && (
                <span className="text-rose-600 text-sm">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

          
            <button
              type="submit"
              className="btn w-full mt-6 py-3 bg-rose-600 hover:bg-rose-700 text-white text-lg rounded-md shadow-md transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner text-white" /> Please wait...
                </>
              ) : (
                "Register"
              )}
            </button>
          </form>

          <p className="text-center text-rose-500 mt-6 font-medium">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-rose-700 font-semibold hover:underline"
            >
              Login here
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
