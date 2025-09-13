import { useRouter } from 'nextjs-toploader/app';
import { useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getIsInitialPassword } from './authUtils';

type UserRole = 'admin' | 'coordinator' | 'director' | 'focal person' | 'high authority' | 'head of department' | 'legal staff';

export const useRoleGuard = (
  allowedRoles: UserRole[],
  redirectPath = '/unauthorized',
) => {
  const { userRoleData, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const isInitialPassword = getIsInitialPassword();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (loading) return;
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    if (isInitialPassword) {
      router.push('/auth/change-initial-password');
      return;
    }
    if (!userRoleData) return;
    const hasRequiredRole = allowedRoles.some(
      (role) => userRoleData.role_name?.toLowerCase() === role.toLowerCase(),
    );
    if (!hasRequiredRole) {
      console.log('User does not have required role');
      router.push(redirectPath);
    }
  }, [isAuthenticated, userRoleData, loading, allowedRoles, router, redirectPath, isInitialPassword]);

  const isAuthorized = userRoleData
    ? allowedRoles.some(
        (role) => userRoleData.role_name?.toLowerCase() === role.toLowerCase(),
      )
    : false;

  return {
    isAuthorized,
    isLoading: loading || !userRoleData,
    userRole: userRoleData?.role_name as UserRole | undefined,
  };
};
