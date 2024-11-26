'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { NEXT_URL } from '../config';
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { useRouter } from "next/navigation";
import { User } from '@/app/types/userTypes';

interface Error {
    status?: number;
    name?: string;
    message?: string;
    details?: object;
  
}

// Define the authentication context type
interface AuthContextType {
    error: Error | null;
    token: null;
    user: User | null;
    isAuthenticated: boolean;
    checkUserLoggedIn: () => void;
}

// Create the authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Create the AuthProvider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const router = useRouter();
  
    const [error, setError] = useState(null)
    const [token, setToken] = useState(null)
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkUserLoggedIn = async () => {
    try {
      const res = await fetch(`${NEXT_URL}/api/checkUserLoggedIn`);
      const data = await res.json();

        // console.log(data);

      if (res.ok) {

        setUser(data);
        setIsAuthenticated(true);

      } else {

        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error checking user login status:', error);
    }
  };

  const getUserToken = async () => {
    try {
        const res = await fetch(`${NEXT_URL}/api/getUserToken`);

        const data = await res.json();

        if (res.ok) {
            setToken(data);
        } else {
            setToken(null); 
        }
    } catch (error) {
        console.error('Error fetching user token:', error);

        return
    }
  };

  useEffect(() => {
    checkUserLoggedIn();
    getUserToken();
  }, [user]);

  const contextValue: AuthContextType = {
    error,
    user,
    token,
    isAuthenticated,
    checkUserLoggedIn,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};