import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Package, Lock, Mail } from "lucide-react";
import toast from "react-hot-toast";

export const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      await login(data).unwrap();
      toast.success("Welcome back!");
      navigate("/");
    } catch (err: any) {
      toast.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-2 text-3xl font-extrabold text-blue-600 mb-6">
            <Package className="h-10 w-10" />
            <span>V-Mart</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-600">Please sign in to your account</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              error={errors.email?.message as string}
              {...register("email", { 
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
              })}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              error={errors.password?.message as string}
              {...register("password", { 
                required: "Password is required",
                minLength: { value: 6, message: "Min 6 characters" }
              })}
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-600">
              <input type="checkbox" className="h-4 w-4 text-blue-600 rounded border-gray-300 mr-2" />
              Remember me
            </label>
            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">Forgot password?</a>
          </div>

          <Button type="submit" className="w-full" size="lg" isLoading={loading}>
            Sign In
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or testing</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button 
              type="button" 
              variant="outline" 
              className="border-blue-200 text-blue-600 hover:bg-blue-50"
              onClick={() => onSubmit({ email: "admin@lumina.com", password: "password123" })}
              isLoading={loading}
            >
              Admin Demo
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              className="border-gray-200 text-gray-600 hover:bg-gray-50"
              onClick={() => onSubmit({ email: "user@example.com", password: "password123" })}
              isLoading={loading}
            >
              User Demo
            </Button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">Sign up for free</Link>
        </p>
      </div>
    </div>
  );
};
