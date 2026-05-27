import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { addToCart, removeFromCart, updateQuantity, clearCart, CartItem } from "../redux/slices/cartSlice";
import { useMemo } from "react";

export const useCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.cart);
  const { appliedCoupon } = useSelector((state: RootState) => state.coupons);

  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [items]);

  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    
    // If category specific, discount only those items
    if (appliedCoupon.eligibleCategory) {
      const eligibleTotal = items
        .filter(item => item.category === appliedCoupon.eligibleCategory)
        .reduce((acc, item) => acc + item.price * item.quantity, 0);
      return (eligibleTotal * appliedCoupon.discount) / 100;
    }
    
    return (subtotal * appliedCoupon.discount) / 100;
  }, [subtotal, appliedCoupon, items]);

  const taxRate = 0.18; // 18% GST
  const taxableAmount = subtotal - discountAmount;
  const tax = useMemo(() => taxableAmount * taxRate, [taxableAmount]);
  const total = useMemo(() => taxableAmount + tax, [taxableAmount, tax]);

  return {
    items,
    subtotal,
    discountAmount,
    tax,
    total,
    itemCount: items.reduce((acc, item) => acc + item.quantity, 0),
    addToCart: (item: CartItem) => dispatch(addToCart(item)),
    removeFromCart: (id: string) => dispatch(removeFromCart(id)),
    updateQuantity: (id: string, qty: number) => dispatch(updateQuantity({ id, quantity: qty })),
    clearCart: () => dispatch(clearCart()),
    appliedCoupon,
  };
};
