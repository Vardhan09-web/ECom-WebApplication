import { Link } from "react-router-dom";
import { ShoppingCart, User, LogOut, Menu, X, Package } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import { Button } from "../ui/Button";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const { itemCount } = useCart();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-blue-600">
              <Package className="h-8 w-8" />
              <span>Lumina</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <Link to="/products" className="text-gray-600 hover:text-blue-600 font-medium">Products</Link>
              {isAdmin && <Link to="/admin" className="text-blue-600 hover:text-blue-700 font-bold px-3 py-1 bg-blue-50 rounded-md">Admin Panel</Link>}
              
              <Link to="/cart" className="relative group p-2">
                <ShoppingCart className="h-6 w-6 text-gray-600 group-hover:text-blue-600" />
                {itemCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white bg-blue-600 rounded-full transform translate-x-1 -translate-y-1">
                    {itemCount}
                  </span>
                )}
              </Link>

              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">Hi, {user?.name}</span>
                  <Button variant="ghost" size="sm" onClick={() => logout()}>
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link to="/login">
                    <Button variant="ghost" size="sm">Login</Button>
                  </Link>
                  <Link to="/signup">
                    <Button size="sm">Signup</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative p-2">
              <ShoppingCart className="h-6 w-6 text-gray-600" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold text-white bg-blue-600 rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white p-4 space-y-4">
          <Link to="/products" className="block text-gray-600 font-medium" onClick={() => setIsMenuOpen(false)}>Products</Link>
          {isAdmin && <Link to="/admin" className="block text-blue-600 font-medium" onClick={() => setIsMenuOpen(false)}>Admin Dashboard</Link>}
          {isAuthenticated ? (
            <Button variant="outline" className="w-full" onClick={() => { logout(); setIsMenuOpen(false); }}>Logout</Button>
          ) : (
            <div className="flex flex-col space-y-2">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}><Button variant="outline" className="w-full">Login</Button></Link>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)}><Button className="w-full">Signup</Button></Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};
