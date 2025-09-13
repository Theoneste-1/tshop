'use client';

import { useState } from 'react';
import { useRouter } from 'nextjs-toploader/app';

import {
  saveTokens,
  getRefreshToken,
  saveUserRole,
  clearTokens,
  clearUserData,
  saveIsInitialPassword,
  getUserData,
  saveCredentials,
  clearIsInitialPassword,
  clearCredentials,
} from './authUtils';
import { useAuth } from './AuthContext';
import { Router } from 'lucide-react';
import { requestFormReset } from 'react-dom';
import { useForgetPasswordMutation, useRefreshTokenMutation, useResetPasswordMutation, useSignInMutation } from './authApi';

export const useLoginFlow = () => {
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [signIn, { isLoading: isSigningIn, error: signInError }] = useSignInMutation();
  const router = useRouter();
  const { login } = useAuth();

  // Step 1: Sign in with email and password
  const handleSignIn = async (email: string, password: string) => {
    try {
      const response = await signIn({ usernameOrEmail: email, password }).unwrap();
      saveCredentials(email, password);
      router.push(`/auth/verification`);
      return response;
    } catch (error) {
      throw error;
    }
  };

  
  const handleLogout = () => {
    router.refresh();
    clearTokens();
    clearCredentials();
    clearIsInitialPassword();
    router.push('/auth/login');
    clearUserData();
  };

  return {
    password,
    setPassword,
    otp,
    setOtp,
    handleSignIn,
    isSigningIn,
    signInError,
    handleLogout,
  };
};

export const useForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [forgetPassword, { isLoading, error }] = useForgetPasswordMutation();
  const router = useRouter();

  const handleForgotPassword = async (email: string) => {
    try {
      const response = await forgetPassword({ email }).unwrap();
      router.push('/auth/check-email');
      return response;
    } catch (error) {
      console.error('Failed to request password reset:', error);
      throw error;
    }
  };

  return {
    email,
    setEmail,
    handleForgotPassword,
    isLoading,
    error,
  };
};

export const useResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState('');
  const [resetPassword, { isLoading, error }] = useResetPasswordMutation();
  const router = useRouter();

  const handleResetPassword = async (
    token: string,
    newPassword: string,
    email: string,
  ) => {
    try {
      const response = await resetPassword({
        token,
        newPassword,
        email,
      }).unwrap();
      router.push('/auth/login');
      return response;
    } catch (error) {
      console.error('Failed to reset password:', error);
      throw error;
    }
  };

  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    token,
    setToken,
    handleResetPassword,
    isLoading,
    error,
  };
};

export const useTokenRefresh = () => {
  const [refreshToken, { isLoading, error }] = useRefreshTokenMutation();

  const handleRefreshToken = async () => {
    try {
      const refreshTokenValue = getRefreshToken();
      const { id } = getUserData();

      if (!refreshTokenValue) {
        throw new Error('Missing refresh token');
      }

      const response = await refreshToken({
        userId: id,
        refreshToken: refreshTokenValue,
      }).unwrap();

      saveTokens(response);
      return response;
    } catch (error) {
      console.error('Failed to refresh token:', error);
      throw error;
    }
  };

  return {
    handleRefreshToken,
    isLoading,
    error,
  };
};
