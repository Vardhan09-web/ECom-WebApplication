import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowLeft, Ticket, Info } from "lucide-react";
import { useCart } from "../hooks/useCart";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { formatCurrency } from "../utils/utils";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applyCoupon, removeCoupon } from "../redux/slices/couponSlice";
import { RootState, AppDispatch } from "../redux/store";
import toast from "react-hot-toast";

export const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { items, subtotal, discountAmount, tax, total, removeFromCart, updateQuantity, appliedCoupon } = useCart();
  const { error: couponError, availableCoupons } = useSelector((state: RootState) => state.coupons);
  const [couponCode, setCouponCode] = useState("");

  const handleApplyCoupon = (codeOverride?: string) => {
    const code = codeOverride || couponCode;
    if (!code) return;
    dispatch(applyCoupon({ code, subtotal, items }));
  };

  useEffect(() => {
    if (couponError) {
      toast.error(couponError);
    } else if (appliedCoupon && couponCode) {
      toast.success(`Coupon "${appliedCoupon.code}" applied!`);
      setCouponCode("");
    }
  }, [couponError, appliedCoupon]);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center space-y-6">
        <h1 className="text-3xl font-bold">Your cart is empty</h1>
        <p className="text-gray-500">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/products">
          <Button size="lg">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center gap-6 p-4 border rounded-xl bg-white shadow-sm">
              <img src={item.image} alt={item.name} className="h-24 w-24 rounded-lg object-cover" />
              <div className="flex-grow space-y-1 text-center sm:text-left">
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.category}</p>
                <p className="font-semibold">{formatCurrency(item.price)}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-bold font-mono">{item.quantity}</span>
                <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-right sm:w-24">
                <p className="font-bold">{formatCurrency(item.price * item.quantity)}</p>
                <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 mt-1 transition-colors">
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}

          {/* Available Coupons Section */}
          <div className="mt-10 space-y-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Ticket className="h-5 w-5 text-blue-600" /> Available Deals
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableCoupons.map((coupon) => (
                <div 
                  key={coupon.code}
                  onClick={() => setCouponCode(coupon.code)}
                  className={`p-4 border rounded-xl cursor-pointer transition-all hover:border-blue-300 hover:bg-blue-50/50 ${
                    appliedCoupon?.code === coupon.code ? 'border-green-500 bg-green-50' : 'bg-white'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded uppercase">
                      {coupon.code}
                    </span>
                    <span className="text-sm font-bold text-gray-900">{coupon.discount}% OFF</span>
                  </div>
                  <p className="text-xs text-gray-600">
                    Min spend: <strong>{formatCurrency(coupon.minSpend)}</strong>
                  </p>
                  {coupon.eligibleCategory && (
                    <p className="text-[10px] text-blue-600 mt-1 flex items-center gap-1">
                      <Info className="h-2.5 w-2.5" /> Valid only for {coupon.eligibleCategory}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Link to="/products" className="inline-flex items-center text-blue-600 font-medium hover:underline pt-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
          </Link>
        </div>

        <div className="space-y-6">
          <div className="p-6 border rounded-xl bg-white shadow-sm space-y-4">
            <h2 className="text-xl font-bold border-b pb-2">Order Summary</h2>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">{formatCurrency(subtotal)}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-green-600 bg-green-50 p-2 rounded">
                  <span className="flex items-center text-xs font-bold uppercase tracking-tight">
                    <Ticket className="mr-2 h-3 w-3" /> {appliedCoupon.code} Applied
                  </span>
                  <span className="font-bold">-{formatCurrency(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Tax (18%)</span>
                <span className="font-semibold">{formatCurrency(tax)}</span>
              </div>
              <div className="pt-4 border-t flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-blue-600">{formatCurrency(total)}</span>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <div className="flex space-x-2">
                <Input 
                  placeholder="Enter code" 
                  value={couponCode} 
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="uppercase font-bold"
                />
                <Button variant="outline" onClick={() => handleApplyCoupon()}>Apply</Button>
              </div>
              {appliedCoupon && (
                <button 
                  onClick={() => dispatch(removeCoupon())} 
                  className="w-full text-center text-xs text-red-500 font-medium hover:underline"
                >
                  Remove Applied Discount
                </button>
              )}
              <Button className="w-full" size="lg" onClick={() => navigate("/checkout")}>
                Checkout Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};