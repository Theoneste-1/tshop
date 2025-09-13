import { TokenResponse } from '@/types/auth/auth.dto';
import CryptoJS from 'crypto-js';

const ACCESS_TOKEN_KEY = process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY || 'access_token';
const REFRESH_TOKEN_KEY = process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY || 'refresh_token';
const USER_ROLE_KEY = process.env.NEXT_PUBLIC_USER_ROLE_KEY || 'user_role';
const USER_DATA_KEY = process.env.NEXT_PUBLIC_USER_DATA_KEY || 'user_data';
const IS_INITIAL_PASSWORD_KEY =
  process.env.NEXT_PUBLIC_IS_INITIAL_PASSWORD_KEY || 'is_initial_password';
const LOGIN_CREDENTIALS_KEY =
  process.env.NEXT_PUBLIC_LOGIN_CREDENTIALS_KEY || 'login_credentials';

/**
 * Encrypts the given data using AES
 * @param data The data to encrypt
 */
const encrypt = (data: string): string => {
  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || 'our_super_secret_key';
  const encryptedData = CryptoJS.AES.encrypt(data, secretKey).toString();
  return encryptedData;
};

/**
 * Decrypts the given data using AES
 * @param data The data to decrypt
 */
const decrypt = (data: string): string | null => {
  try {
    const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || '';
    if (!secretKey) {
      console.error('Decryption error: Missing secret key');
      return null;
    }
    const bytes = CryptoJS.AES.decrypt(data, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData || null;
  } catch (error) {
    console.error('Decryption error:', error);
    return null;
  }
};

/**
 * Saves authentication tokens to localStorage and cookies
 */
export const saveTokens = (tokens: TokenResponse): void => {
  if (typeof window === 'undefined') return;

  // Encrypt the tokens
  const encryptedAccessToken = encrypt(tokens.accessToken);
  const encryptedRefreshToken = encrypt(tokens.refreshToken);

  // Save to localStorage
  localStorage.setItem(ACCESS_TOKEN_KEY, encryptedAccessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, encryptedRefreshToken);
};

/**
 * Retrieves the access token from localStorage
 */
export const getAccessToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  const encryptedAccessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (!encryptedAccessToken) return null;
  const accessToken = decrypt(encryptedAccessToken);
  return accessToken;
};

/**
 * Retrieves the refresh token from localStorage
 */
export const getRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  const encryptedRefreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  if (!encryptedRefreshToken) return null;
  const refreshToken = decrypt(encryptedRefreshToken);
  return refreshToken;
};

/**
 * Retrieves the user ID from localStorage
 */

/**
 * Clears authentication data from localStorage and cookies
 */
export const clearTokens = (): void => {
  if (typeof window === 'undefined') return;

  // Clear localStorage
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_ROLE_KEY);

  sessionStorage.clear();
  window.location.reload();
};

/**
 * Checks if the user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return !!getAccessToken();
};

export const saveUserRole = ({
  role_name,
  role_id,
}: {
  role_name: string;
  role_id: string;
}) => {
  if (typeof window === 'undefined') return;
  const encryptedData = encrypt(JSON.stringify({ role_name, role_id }));
  localStorage.setItem(USER_ROLE_KEY, encryptedData);
};

export const getUserRole = (): { role_name: string; role_id: string } | null => {
  if (typeof window === 'undefined') return null;
  try {
    const encryptedData = localStorage.getItem(USER_ROLE_KEY);
    if (!encryptedData) return null;
    const decrypted = decrypt(encryptedData);
    return decrypted ? JSON.parse(decrypted) : null;
  } catch (error) {
    console.error('Failed to get user role:', error);
    return null;
  }
};

export const clearUserData = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(USER_ROLE_KEY);
  localStorage.removeItem(USER_DATA_KEY);
  window.location.reload();
};

export const saveUserData = (userData: any) => {
  if (typeof window === 'undefined') return;
  const encryptedData = encrypt(JSON.stringify(userData));
  localStorage.setItem(USER_DATA_KEY, encryptedData);
};

export const getUserData = (): any | null => {
  if (typeof window === 'undefined') return null;
  try {
    const encryptedData = localStorage.getItem(USER_DATA_KEY);
    if (!encryptedData) return null;
    const decrypted = decrypt(encryptedData);
    return decrypted ? JSON.parse(decrypted) : null;
  } catch (error) {
    console.error('Failed to get user data:', error);
    return null;
  }
};

export const saveIsInitialPassword = (isInitialPassword: boolean) => {
  if (typeof window === 'undefined') return;
  const encryptedData = encrypt(JSON.stringify(isInitialPassword));
  localStorage.setItem(IS_INITIAL_PASSWORD_KEY, encryptedData);
};

export const getIsInitialPassword = (): boolean | null => {
  if (typeof window === 'undefined') return null;
  try {
    const encryptedData = localStorage.getItem(IS_INITIAL_PASSWORD_KEY);
    if (!encryptedData) return null;
    const decrypted = decrypt(encryptedData);
    return decrypted ? JSON.parse(decrypted) : null;
  } catch (error) {
    console.error('Failed to get initial password status:', error);
    return null;
  }
};

export const clearIsInitialPassword = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(IS_INITIAL_PASSWORD_KEY);
};

export const saveCredentials = (email: string, password: string) => {
  if (typeof window === 'undefined') return;
  const encryptedData = encrypt(JSON.stringify({ email, password }));
  localStorage.setItem(LOGIN_CREDENTIALS_KEY, encryptedData);
};

export const getCredentials = () => {
  if (typeof window === 'undefined') return null;
  const encryptedData = localStorage.getItem(LOGIN_CREDENTIALS_KEY);
  if (!encryptedData) return null;
  try {
    const decrypted = decrypt(encryptedData);
    return decrypted ? JSON.parse(decrypted) : null;
  } catch (error) {
    console.error('Failed to parse credentials:', error);
    return null;
  }
};

export const clearCredentials = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(LOGIN_CREDENTIALS_KEY);
};
