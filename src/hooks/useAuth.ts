import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { login, signup, logout } from "../redux/slices/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, token, loading, error } = useSelector((state: RootState) => state.auth);

  return {
    user,
    token,
    loading,
    error,
    login: (creds: any) => dispatch(login(creds)),
    signup: (data: any) => dispatch(signup(data)),
    logout: () => dispatch(logout()),
    isAuthenticated: !!token,
    isAdmin: !!user?.isAdmin,
  };
};
