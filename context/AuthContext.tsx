'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { NEXT_URL } from '../config';
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
    registerUser: (user: any) => Promise<void>;
    loginUser: (user: any) => Promise<void>; // Specify login credentials types
    logoutUser: () => Promise<void>; // Add logoutUser function type
    deleteUser: (user: any) => Promise<void>;
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



  const registerUser = async (user: { username: string; identifier: string; password: string }) => {
    try {
        
        // console.log(`user is ${user.username}, email is ${user.identifier}, password is ${user.password}`);

        const res = await fetch(`${NEXT_URL}/api/registerUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: user.username,
                email: user.identifier,
                password: user.password,
            }),
        });

        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            // The response is not JSON, handle accordingly
            console.error('Unexpected content type:', contentType);
            return;
        }

        const data = await res.json();
        // console.log(`Auth context registerUser data is: ${data}`);
        // console.log(data)

        if (res.ok && data.data !== null) {

            setUser(data);
            setIsAuthenticated(true);
            router.push('/')

        } else {
            const errorMessage = data.error;
            setError(errorMessage);
            console.log(errorMessage);
        }
    } catch (error) {
        
        console.error('Error in registerUser:', error);
    }
  };


  const deleteUser = async( user: {userId: string; token: string}) => {
  try {
        
    // console.log(`user is ${user.username}, email is ${user.identifier}, password is ${user.password}`);

    const res = await fetch(`${NEXT_URL}/api/deleteUser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: user.userId,
            token: user.token,
        }),
    });

    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
        // The response is not JSON, handle accordingly
        console.error('Unexpected content type:', contentType);
        return;
    }

    const data = await res.json();
    // console.log(`Auth context deleteUser data is: ${data}`);
    // console.log(data)

      if (res.ok) {

          setUser(null);
          setIsAuthenticated(false);
          console.log('user deleted')
          router.push('/')

      } else {
          const errorMessage = data.error.message;
          setError(errorMessage);
          console.log(errorMessage);
      }
    } catch (error) {
        
        console.error('Error in registerUser:', error);
    }
  }

  const loginUser = async (user: { identifier: string; password: string }) => {
   try {
    const res = await fetch(`${NEXT_URL}/api/loginUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.identifier,
        password: user.password,
      }),
    });

    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Unexpected content type:', contentType);
      return;
    }

    const data = await res.json();

    if (res.ok && data.data !== null) {
      setUser(data);
      setIsAuthenticated(true);
      
      router.push('/')
    } else {
      
      setError(data.error);
    }
    } catch (error) {
      console.error('Error in loginUser:', error);
    }
  };

  const logoutUser = async () => {
    try {
      const res = await fetch(`${NEXT_URL}/api/logoutUser`, {
        method: 'POST',
      });

      if (res.ok) {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error in logoutUser:', error);
    }
  };


  const contextValue: AuthContextType = {
    error,
    registerUser,
    loginUser,
    logoutUser,
    deleteUser
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};