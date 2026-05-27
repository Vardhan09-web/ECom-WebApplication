import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { 
  fetchProducts, 
  fetchProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  clearCurrentProduct,
  Product 
} from "../redux/slices/productSlice";

export const useProducts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, currentProduct, loading, error } = useSelector((state: RootState) => state.products);

  return {
    products: items,
    currentProduct,
    loading,
    error,
    fetchProducts: () => dispatch(fetchProducts()),
    fetchProductById: (id: string) => dispatch(fetchProductById(id)),
    createProduct: (p: Omit<Product, 'id'>) => dispatch(createProduct(p)),
    updateProduct: (id: string, data: Partial<Product>) => dispatch(updateProduct({ id, data })),
    deleteProduct: (id: string) => dispatch(deleteProduct(id)),
    clearCurrentProduct: () => dispatch(clearCurrentProduct()),
  };
};
