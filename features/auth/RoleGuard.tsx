'use client';

import { ReactNode } from 'react';
import { useRoleGuard } from './role-guard';
import { Loader2 } from 'lucide-react';
import { Role } from './useAuthRedirect';

type RoleGuardProps = {
  children: ReactNode;
  allowedRoles: Role[];
  redirectPath?: string;
};

export function RoleGuard({
  children,
  allowedRoles,
  redirectPath = '/unauthorized',
}: RoleGuardProps) {
  const { isAuthorized, isLoading } = useRoleGuard(allowedRoles, redirectPath);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}

export function AdminGuard({ children }: { children: ReactNode }) {
  return <RoleGuard allowedRoles={['admin']}>{children}</RoleGuard>;
}

export function CoordinatorGuard({ children }: { children: ReactNode }) {
  return <RoleGuard allowedRoles={['coordinator']}>{children}</RoleGuard>;
}
export function HodGuard({ children }: { children: ReactNode }) {
  return <RoleGuard allowedRoles={['head of department']}>{children}</RoleGuard>;
}
export function LegalStaffGuard({ children }: { children: ReactNode }) {
  return <RoleGuard allowedRoles={['legal staff']}>{children}</RoleGuard>;
}

export function DirectorGuard({ children }: { children: ReactNode }) {
  return <RoleGuard allowedRoles={['director']}>{children}</RoleGuard>;
}

export function FocalPersonGuard({ children }: { children: ReactNode }) {
  return <RoleGuard allowedRoles={['focal person']}>{children}</RoleGuard>;
}

export function HighAuthorityGuard({ children }: { children: ReactNode }) {
  return <RoleGuard allowedRoles={['high authority']}>{children}</RoleGuard>;
}
