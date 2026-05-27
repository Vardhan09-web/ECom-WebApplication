import { useForm } from "react-hook-form";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { X } from "lucide-react";
import { useProducts } from "../hooks/useProducts";
import toast from "react-hot-toast";

interface ProductModalProps {
  product?: any;
  onClose: () => void;
}

export const ProductModal = ({ product, onClose }: ProductModalProps) => {
  const { createProduct, updateProduct } = useProducts();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: product || {
      name: "",
      price: "",
      category: "",
      description: "",
      images: [""],
      stock: "",
      rating: 4.5
    }
  });

  const onSubmit = async (data: any) => {
    try {
      const payload = {
        ...data,
        price: parseFloat(data.price),
        stock: parseInt(data.stock),
        images: Array.isArray(data.images) ? data.images : [data.images]
      };

      if (product) {
        await updateProduct(product.id, payload);
        toast.success("Product updated!");
      } else {
        await createProduct(payload);
        toast.success("Product created!");
      }
      onClose();
    } catch (err: any) {
      toast.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden p-8 relative">
        <button onClick={onClose} className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full">
          <X className="h-6 w-6" />
        </button>
        
        <h2 className="text-2xl font-bold mb-8">{product ? "Edit Product" : "Add New Product"}</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Product Name" error={errors.name?.message as string} {...register("name", { required: "Name is required" })} />
            <Input label="Category" error={errors.category?.message as string} {...register("category", { required: "Category is required" })} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input label="Price ($)" type="number" step="0.01" {...register("price", { required: "Price is required" })} />
            <Input label="Stock" type="number" {...register("stock", { required: "Stock is required" })} />
          </div>

          <Input label="Image URL" {...register("images.0", { required: "Image is required" })} />

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              className="w-full h-32 rounded-md border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("description", { required: "Description is required" })}
            />
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t">
            <Button variant="ghost" type="button" onClick={onClose}>Cancel</Button>
            <Button type="submit">{product ? "Save Changes" : "Create Product"}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
