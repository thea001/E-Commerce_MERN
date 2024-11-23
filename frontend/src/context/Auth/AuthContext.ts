import { createContext, useContext } from "react";

interface AuthContextType {
  username: string | null;
  token: string | null;
  role: string | null;
  isAuthenticated: boolean;
  myOrders: any[];
  login: (username: string, token: string, role: string) => void;
  logout: () => void;
  getMyOrders: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  username: null,
  token: null,
  role: null,
  login: () => {},
  isAuthenticated: false,
  myOrders: [],
  logout: () => {},
  getMyOrders: () => {},
});
export const useAuth = () => useContext(AuthContext);
