import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Package } from "lucide-react";
import toast from "react-hot-toast";

export const SignupPage = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const { signup, loading } = useAuth();
  const navigate = useNavigate();

  const password = watch("password");

  const onSubmit = async (data: any) => {
    try {
      await signup(data).unwrap();
      toast.success("Account created successfully!");
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
            <span>Lumina</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="mt-2 text-sm text-gray-600">Join our community today</p>
        </div>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Full Name"
            placeholder="John Doe"
            error={errors.name?.message as string}
            {...register("name", { required: "Name is required" })}
          />
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
          <Input
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            error={errors.confirmPassword?.message as string}
            {...register("confirmPassword", { 
              required: "Please confirm your password",
              validate: value => value === password || "Passwords do not match"
            })}
          />

          <Button type="submit" className="w-full mt-4" size="lg" isLoading={loading}>
            Sign Up
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">Sign in</Link>
        </p>
      </div>
    </div>
  );
};
