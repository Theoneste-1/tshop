'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'nextjs-toploader/app';
import { useAuth } from './AuthContext';
import { getIsInitialPassword } from './authUtils';

export type Role = 'admin' | 'focal person' | 'coordinator' | 'high authority' | 'director' | 'head of department' | 'legal staff';

interface UseAuthRedirectOptions {
  redirectAuthenticated?: boolean;
  requireAuth?: boolean;
  authenticatedRedirectPath?: string;
  unauthenticatedRedirectPath?: string;
}

interface UseAuthRedirectResult {
  isLoading: boolean;
  isAuthenticated: boolean;
  userRole?: string;
  shouldRender: boolean;
}

const ROLE_ROUTES: Record<Role, string> = {
  admin: '/admin',
  'focal person': '/focal-person',
  coordinator: '/coordinator',
  'high authority': '/high-authority',
  director: '/director',
  'head of department': '/hod',
  'legal staff': '/legal-staff'
};

const DEFAULT_ROUTE = '/404';

const getRoleBasedRoute = (role?: string): string => {
  console.log('This is the role', role)
  if (!role) return DEFAULT_ROUTE;
  return ROLE_ROUTES[role.toLowerCase() as Role] || DEFAULT_ROUTE;
};

export const useAuthRedirect = ({
  redirectAuthenticated = false,
  requireAuth = false,
  authenticatedRedirectPath,
  unauthenticatedRedirectPath = '/auth/login',
}: UseAuthRedirectOptions = {}): UseAuthRedirectResult => {
  const { isAuthenticated, loading, userRoleData, checkAuth } = useAuth();
  const router = useRouter();
  const [shouldRender, setShouldRender] = useState(false);
  const isInitialPassword = getIsInitialPassword();

  useEffect(() => {
    if (loading) return;

    const isAuthLocal = checkAuth();

    // Handle authenticated user redirection
    if (isAuthLocal && redirectAuthenticated) {
      if (isInitialPassword) {
        router.push('/auth/change-initial-password');
        setShouldRender(true);
        return;
      }
      const redirectPath =
        authenticatedRedirectPath || getRoleBasedRoute(userRoleData?.role_name);
      router.push(redirectPath);
      setShouldRender(false);
      return;
    }

    // Handle unauthenticated user redirection
    if (!isAuthLocal && requireAuth) {
      router.replace(unauthenticatedRedirectPath);
      setShouldRender(false);
      return;
    }

    // If we get here, allow rendering
    setShouldRender(true);
  }, [
    loading,
    isAuthenticated,
    userRoleData,
    router,
    redirectAuthenticated,
    requireAuth,
    authenticatedRedirectPath,
    unauthenticatedRedirectPath,
    checkAuth,
    isInitialPassword
  ]);

  return {
    isLoading: loading,
    isAuthenticated,
    userRole: userRoleData?.role_name,
    shouldRender: !loading && shouldRender,
  };
};
