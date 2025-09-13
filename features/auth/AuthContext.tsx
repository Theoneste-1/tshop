'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'nextjs-toploader/app';
import {
  clearIsInitialPassword,
  clearTokens,
  clearUserData,
  getAccessToken,
  getIsInitialPassword,
  getUserRole,
  saveTokens,
  saveUserData,
  saveUserRole,
} from './authUtils';
import type { TokenResponse } from '@/types/dto/auth.dto';
import { useLogoutMutation } from './authApi';

interface userData {
  email: string;
  id: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  userRoleData: any | null;
  userData: userData | null;
  isInitialPassword: boolean;
  login: (userRoleData: any, userData: userData, tokens: TokenResponse) => void;
  logout: () => void;
  checkAuth: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [userRoleData, setUserRoleData] = useState<any | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [isInitialPassword, setIsInitialPassword] = useState(false);
  const [userData, setUserData] = useState<userData | null>(null);
  const router = useRouter();
  const [logout] = useLogoutMutation();

  const checkAuth = (): boolean => {
    if (typeof window === 'undefined') return false;

    const token = getAccessToken();
    if (!token) return false;

    return true;
  };

  const checkIsInitialPassword = (): boolean => {
    if (typeof window === undefined) return false;
    const isInitialPassword = getIsInitialPassword();
    if (!isInitialPassword) return false;
    return true;
  };

  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const isAuth = checkAuth();
        setAuthenticated(isAuth);

        const isInitialPassword = checkIsInitialPassword();
        setIsInitialPassword(isInitialPassword);

        if (isAuth) {
          const roleData = getUserRole();
          if (roleData && roleData.role_name) {
            setUserRoleData(roleData);
          }
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();

    // Also check when window gets focus (useful for token expiry)
    const handleFocus = () => {
      checkAuthStatus();
    };

    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const login = (userRoleData: any, userData: userData, tokens: TokenResponse) => {
    setAuthenticated(true);
    if (userRoleData) {
      setUserRoleData(userRoleData);
      saveUserRole(userRoleData);
    }
    if (userData) {
      setUserData(userData);
      saveUserData(userData);
    }
    if (tokens) {
      saveTokens(tokens);
    }
  };

  const handleLogout = async () => {
    try {
      // Call server-side logout
      await logout().unwrap();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear all auth data
      clearTokens();
      clearUserData();
      clearIsInitialPassword();
      // Reset state
      setAuthenticated(false);
      setUserRoleData(null);

      // Redirect to login
      router.push('/auth/login');
    }
  };

  const value = {
    isAuthenticated: authenticated,
    loading,
    userRoleData,
    userData,
    login,
    logout: handleLogout,
    checkAuth,
    isInitialPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading, checkAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const isAuthLocal = checkAuth();

    if (!loading && !isAuthenticated && !isAuthLocal) {
      router.push('/auth/login');
    }
  }, [loading, isAuthenticated, router, checkAuth]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
};
