
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { SubmitHandler } from "react-hook-form";
import { loginAPI } from "../../features/auth/loginapi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { loginSuccess } from "../../features/auth/userslice";

type LoginInputs = {
    email: string;
    password: string;
};
const schema = yup.object({
    email: yup.string().email('Invalid email').max(100, 'Max 100 characters').required('Email is required'),
    password: yup.string().min(6, 'Min 6 characters').max(20, 'Max 20 characters').required('Password is required'),
});

export const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

     const [loginUser, { isLoading }] = loginAPI.useLoginUserMutation()
  
      const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginInputs>({
        resolver: yupResolver(schema)
    })

 const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
        try {
            const response = await loginUser(data).unwrap()
            
            toast.success(response.message)
               dispatch(loginSuccess(response))

  
             if (response.user.role === 'admin') {
    navigate('/admin/dashboard')       
} else if (response.user.role === 'customer') {
    navigate('/customer/dashboard')    
}






            
        } catch (error: any) {
            
            toast.error(error.data.error)

        }
    }


  return (
    <>
            
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 to-white px-6 py-12">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-pink-700 mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Log in to your Bakers House account
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password")}
              className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

        
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition"
            disabled={isLoading}>
                            {
                                isLoading ? (
                                    <>
                                        <span className="loading loading-spinner text-primary" /> Please wait...
                                    </>
         
                                ): "Login"
                              }
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a href="/register" className="text-pink-600 hover:underline font-medium">
            Sign up
          </a>
        </p>

        <p className="text-center mt-2">
          <a
            href="/forgot-password"
            className="text-sm text-pink-500 hover:underline"
          >
            Forgot your password?
          </a>
        </p>
      </div>
    </div>
     </>
  );
};
