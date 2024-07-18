'use client'

import React, { createContext, useContext, ReactNode } from 'react';
import { NEXT_URL } from '../config';

type FormData = {
  firstname: string;
  lastname: string;
  email: string;
  message: string;
  phone: string;
};

// Define the authentication context type
interface AuthContextType {
  postFormData: (formData: FormData) => Promise<void>;
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

// Create the AuthProvider component: provides the following functions to all its children via the context.
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {


    const postFormData = async (formData: FormData): Promise<void> => {
        try {
            console.log('FormData being sent:', formData);
    
            const res = await fetch(`${NEXT_URL}/api/sendFormData`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (!res.ok) {
                // Handle HTTP errors
                const errorData = await res.json();
                console.error('Error response from server:', errorData);
                throw new Error(`HTTP error! status: ${res.status}`);
            }
    
            const contentType = res.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                console.error('Unexpected content type:', contentType);
                throw new Error('Unexpected content type received from server');
            }
    
            const data = await res.json();
            console.log('Form data submitted successfully:', data);
    
        } catch (error) {
            console.error('Error in postFormData:', error);
        }
    };
    

  const contextValue: AuthContextType = {
    postFormData,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
