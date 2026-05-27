import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../hooks/useCart";
import { Button } from "../components/ui/Button";
import { Star, Truck, ShieldCheck, ArrowRightLeft, Minus, Plus, ShoppingCart } from "lucide-react";
import { formatCurrency } from "../utils/utils";
import toast from "react-hot-toast";

export const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { currentProduct, fetchProductById, loading, clearCurrentProduct } = useProducts();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) fetchProductById(id);
    return () => clearCurrentProduct();
  }, [id]);

  if (loading || !currentProduct) {
    return <div className="mx-auto max-w-7xl px-4 py-20 animate-pulse space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="aspect-square bg-gray-200 rounded-2xl" />
        <div className="space-y-4">
          <div className="h-10 w-3/4 bg-gray-200 rounded" />
          <div className="h-6 w-1/4 bg-gray-200 rounded" />
          <div className="h-32 bg-gray-200 rounded" />
        </div>
      </div>
    </div>;
  }

  const handleAddToCart = () => {
    addToCart({ ...currentProduct, quantity, image: currentProduct.images[0] });
    toast.success(`${currentProduct.name} added to cart!`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-2xl border bg-white">
            <img src={currentProduct.images[0]} alt={currentProduct.name} className="h-full w-full object-contain" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {currentProduct.images.map((img, i) => (
              <div key={i} className="aspect-square overflow-hidden rounded-lg border bg-white cursor-pointer hover:opacity-80">
                <img src={img} alt={`${currentProduct.name} ${i}`} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col space-y-6">
          <div className="space-y-2">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">{currentProduct.category}</span>
            <h1 className="text-4xl font-bold text-gray-900">{currentProduct.name}</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-yellow-400">
                <Star className="h-5 w-5 fill-current" />
                <span className="ml-1 font-bold text-gray-900">{currentProduct.rating}</span>
                <span className="ml-1 text-gray-500 text-sm">(124 reviews)</span>
              </div>
              <span className="text-sm font-medium text-green-600 bg-green-50 px-2.5 py-0.5 rounded-full">In Stock ({currentProduct.stock})</span>
            </div>
          </div>

          <p className="text-3xl font-bold text-gray-900">{formatCurrency(currentProduct.price)}</p>
          
          <p className="text-gray-600 leading-relaxed">{currentProduct.description}</p>

          <div className="space-y-4 pt-6 border-t font-medium">
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2 border rounded-md p-1">
                <Button variant="ghost" size="sm" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{quantity}</span>
                <Button variant="ghost" size="sm" onClick={() => setQuantity(quantity + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button size="lg" className="flex-grow" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8">
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <Truck className="h-5 w-5 text-blue-600" />
              <span>Free Delivery on orders above $150</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <ShieldCheck className="h-5 w-5 text-blue-600" />
              <span>2 Year Extended Warranty</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <ArrowRightLeft className="h-5 w-5 text-blue-600" />
              <span>30 Day Easy Return Policy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
