import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Coupon {
  code: string;
  discount: number; // percentage
  minSpend: number;
  expiryDate: string; // ISO string
  eligibleCategory?: string;
}

interface CouponState {
  availableCoupons: Coupon[];
  appliedCoupon: Coupon | null;
  error: string | null;
}

const initialState: CouponState = {
  availableCoupons: [
    { code: "SAVE10", discount: 10, minSpend: 100, expiryDate: "2026-12-31" },
    { code: "FLAT500", discount: 20, minSpend: 500, expiryDate: "2026-12-31" },
    { code: "NEWUSER", discount: 15, minSpend: 0, expiryDate: "2026-12-31" },
    { code: "ELECTRO25", discount: 25, minSpend: 200, expiryDate: "2026-12-31", eligibleCategory: "Electronics" },
  ],
  appliedCoupon: null,
  error: null,
};

const couponSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {
    applyCoupon: (state, action: PayloadAction<{ code: string; subtotal: number; items: any[] }>) => {
      const code = action.payload.code.toUpperCase();
      const coupon = state.availableCoupons.find(c => c.code === code);
      
      if (!coupon) {
        state.error = "Invalid coupon code";
        state.appliedCoupon = null;
        return;
      }

      // Check Expiry
      const now = new Date();
      const expiry = new Date(coupon.expiryDate);
      if (now > expiry) {
        state.error = "Coupon has expired";
        state.appliedCoupon = null;
        return;
      }

      // Check Min Spend
      if (action.payload.subtotal < coupon.minSpend) {
        state.error = `Minimum spend of $${coupon.minSpend} required`;
        state.appliedCoupon = null;
        return;
      }

      // Check Category eligibility if applicable
      if (coupon.eligibleCategory) {
        const hasCategory = action.payload.items.some(item => item.category === coupon.eligibleCategory);
        if (!hasCategory) {
          state.error = `This coupon is only valid for ${coupon.eligibleCategory} products`;
          state.appliedCoupon = null;
          return;
        }
      }

      state.appliedCoupon = coupon;
      state.error = null;
    },
    removeCoupon: (state) => {
      state.appliedCoupon = null;
      state.error = null;
    }
  },
});

export const { applyCoupon, removeCoupon } = couponSlice.actions;
export default couponSlice.reducer;
