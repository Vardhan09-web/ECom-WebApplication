import { Outlet } from "react-router-dom";
import { Navbar } from "../components/common/Navbar";
import { Toaster } from "react-hot-toast";

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="bg-white border-t py-12">
        <div className="mx-auto max-w-7xl px-4 text-center text-gray-500">
          <p>&copy; 2026 Lumina E-Commerce. All rights reserved.</p>
        </div>
      </footer>
      <Toaster position="bottom-right" />
    </div>
  );
};
