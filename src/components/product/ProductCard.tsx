import React from "react";
import { Link } from "react-router-dom";
import { Star, ShoppingCart, Eye } from "lucide-react";
import { Product } from "../../redux/slices/productSlice";
import { useCart } from "../../hooks/useCart";
import { Button } from "../ui/Button";
import { formatCurrency } from "../../utils/utils";
import { motion } from "motion/react";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: any;
  key?: string | number;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({ ...product, quantity: 1, image: product.images[0] });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-md"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="p-4">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">{product.category}</span>
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium text-gray-600">{product.rating || 0}</span>
            </div>
          </div>
          <h3 className="mb-2 line-clamp-1 text-lg font-bold text-gray-900 group-hover:text-blue-600">{product.name}</h3>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-gray-900">{formatCurrency(product.price)}</span>
            <Button size="sm" onClick={handleAddToCart} className="opacity-0 group-hover:opacity-100 transition-opacity">
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
