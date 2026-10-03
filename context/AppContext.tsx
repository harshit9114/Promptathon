'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
  id: string | number;
  name: string;
  price: string;
  gradient: string;
}

interface UserProfile {
  email: string;
  name: string;
  password: string;
}

interface AppContextType {
  isLoggedIn: boolean;
  user: UserProfile | null;
  setIsLoggedIn: (val: boolean) => void;
  register: (email: string, password: string, name: string) => { success: boolean; error?: string };
  login: (email: string, password: string) => { success: boolean; error?: string };
  cartItems: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (id: string | number) => void;
  clearCart: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedInState] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedLogin = localStorage.getItem('isLoggedIn') === 'true';
    const savedUser = localStorage.getItem('user');
    const savedCart = localStorage.getItem('cartItems');
    
    if (savedLogin) setIsLoggedInState(true);
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn.toString());
    if (user) localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [isLoggedIn, user, cartItems]);

  const getRegisteredUsers = (): UserProfile[] => {
    const stored = localStorage.getItem('registeredUsers');
    return stored ? JSON.parse(stored) : [];
  };

  const saveRegisteredUsers = (users: UserProfile[]) => {
    localStorage.setItem('registeredUsers', JSON.stringify(users));
  };

  const register = (email: string, password: string, name: string): { success: boolean; error?: string } => {
    const users = getRegisteredUsers();
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return { success: false, error: 'An account with this email already exists.' };
    }
    const cleanName = name.replace(/[0-9]/g, '') || email.split('@')[0].replace(/[0-9]/g, '');
    const newUser: UserProfile = { email, password, name: cleanName };
    saveRegisteredUsers([...users, newUser]);
    setIsLoggedInState(true);
    setUser(newUser);
    return { success: true };
  };

  const login = (email: string, password: string): { success: boolean; error?: string } => {
    const users = getRegisteredUsers();
    const found = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) {
      return { success: false, error: 'Invalid email or password. Please check your credentials or create an account.' };
    }
    setIsLoggedInState(true);
    setUser(found);
    return { success: true };
  };

  const setIsLoggedIn = (val: boolean) => {
    setIsLoggedInState(val);
    if (!val) {
      setUser(null);
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user');
    }
  };

  const addToCart = (product: CartItem) => {
    setCartItems((prev) => {
      if (prev.find((item) => item.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromCart = (id: string | number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <AppContext.Provider value={{ isLoggedIn, user, setIsLoggedIn, register, login, cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
