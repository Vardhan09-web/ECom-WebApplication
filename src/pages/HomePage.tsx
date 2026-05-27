import { useEffect } from "react";
import { useProducts } from "../hooks/useProducts";
import { ProductCard } from "../components/product/ProductCard";
import { ArrowRight, Zap, Shield, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

export const HomePage = () => {
  const { products, fetchProducts, loading } = useProducts();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden bg-gray-900 text-white">
        <div className="absolute inset-0 opacity-50">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000" 
            alt="Hero Background" 
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative z-10 text-center space-y-6 max-w-3xl px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">Elevate Your Lifestyle</h1>
          <p className="text-xl text-gray-300">Discover curated premium products designed for the modern individual.</p>
          <div className="flex justify-center space-x-4">
            <Link to="/products">
              <Button size="lg" className="rounded-full">Shop Now <ArrowRight className="ml-2 h-5 w-5" /></Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex items-start space-x-4 p-6 rounded-2xl bg-white border">
          <Zap className="h-10 w-10 text-blue-600 shrink-0" />
          <div>
            <h3 className="font-bold text-lg">Fast Delivery</h3>
            <p className="text-gray-500">Free shipping on all orders over $150.</p>
          </div>
        </div>
        <div className="flex items-start space-x-4 p-6 rounded-2xl bg-white border">
          <Shield className="h-10 w-10 text-blue-600 shrink-0" />
          <div>
            <h3 className="font-bold text-lg">Secure Payment</h3>
            <p className="text-gray-500">100% secure payment processing with SSL.</p>
          </div>
        </div>
        <div className="flex items-start space-x-4 p-6 rounded-2xl bg-white border">
          <Truck className="h-10 w-10 text-blue-600 shrink-0" />
          <div>
            <h3 className="font-bold text-lg">Global Returns</h3>
            <p className="text-gray-500">Easy returns within 30 days of purchase.</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-4 space-y-8">
        <div className="flex items-end justify-between border-b pb-4">
          <div>
            <h2 className="text-3xl font-bold">Featured Collection</h2>
            <p className="text-gray-500">Explore our most popular items this week.</p>
          </div>
          <Link to="/products" className="text-blue-600 hover:underline font-medium">View All</Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-80 rounded-xl bg-gray-200 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
