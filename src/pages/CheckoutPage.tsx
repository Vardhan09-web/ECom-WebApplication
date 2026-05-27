import { useForm } from "react-hook-form";
import { useCart } from "../hooks/useCart";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { formatCurrency } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import { CreditCard, Truck, ShieldCheck, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";
import { motion } from "motion/react";

export const CheckoutPage = () => {
  const { items, subtotal, discountAmount, tax, total, clearCart } = useCart();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = (data: any) => {
    console.log("Order Data:", data);
    setIsSuccess(true);
    setTimeout(() => {
      clearCart();
      toast.success("Order placed successfully!");
      navigate("/");
    }, 3000);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 pt-20 px-4 text-center">
        <motion.div
           initial={{ scale: 0 }}
           animate={{ scale: 1 }}
           className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center"
        >
          <CheckCircle2 className="h-12 w-12 text-green-600" />
        </motion.div>
        <h1 className="text-4xl font-bold">Thank You!</h1>
        <p className="text-xl text-gray-600 max-w-md">Your order has been placed and is being processed. You will receive an email confirmation shortly.</p>
        <p className="text-sm text-gray-400">Redirecting to home...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-10 text-3xl font-bold">Secure Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Checkout Form */}
        <div className="space-y-8">
          <form className="space-y-8" id="checkout-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Truck className="h-5 w-5 text-blue-600" /> Shipping Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <Input label="First Name" error={errors.firstName?.message as string} {...register("firstName", { required: "Required" })} />
                <Input label="Last Name" error={errors.lastName?.message as string} {...register("lastName", { required: "Required" })} />
              </div>
              <Input label="Address" error={errors.address?.message as string} {...register("address", { required: "Required" })} />
              <div className="grid grid-cols-3 gap-4">
                <Input label="City" error={errors.city?.message as string} {...register("city", { required: "Required" })} />
                <Input label="State" error={errors.state?.message as string} {...register("state", { required: "Required" })} />
                <Input label="ZIP" error={errors.zip?.message as string} {...register("zip", { required: "Required" })} />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-blue-600" /> Payment Details
              </h2>
              <Input label="Card Number" placeholder="0000 0000 0000 0000" />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Expiry Date" placeholder="MM/YY" />
                <Input label="CVV" placeholder="123" />
              </div>
            </div>
          </form>
        </div>

        {/* Order Summary Checkout View */}
        <div className="space-y-6">
          <div className="p-8 border rounded-2xl bg-white shadow-sm space-y-6">
            <h2 className="text-xl font-bold border-b pb-4 text-center">Order Summary</h2>
            
            <div className="max-h-64 overflow-y-auto space-y-4 pr-2">
              {items.map(item => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-3">
                    <img src={item.image} className="h-12 w-12 rounded object-cover" />
                    <div>
                      <p className="font-bold">{item.name}</p>
                      <p className="text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold">{formatCurrency(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-4 border-t text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium">{formatCurrency(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount Applied</span>
                  <span>-{formatCurrency(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Tax (18%)</span>
                <span className="font-medium">{formatCurrency(tax)}</span>
              </div>
              <div className="pt-4 flex justify-between text-xl font-bold">
                <span>Payable Amount</span>
                <span className="text-blue-600">{formatCurrency(total)}</span>
              </div>
            </div>

            <Button type="submit" form="checkout-form" className="w-full" size="lg">
              Place Order
            </Button>
            
            <p className="text-xs text-center text-gray-500 flex items-center justify-center gap-1">
              <ShieldCheck className="h-3 w-3" /> Encrypted and Secure
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
