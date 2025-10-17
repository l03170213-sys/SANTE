import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

export default function ProtectedRoute({ children, allowedRoles } : { children: React.ReactNode, allowedRoles?: string[] }) {
  const { user, profile, loading } = useAuth();

  if (loading) return <div className="container mx-auto py-12">Chargement...</div>;

  if (!user) return <Navigate to="/connexion" replace />;

  if (allowedRoles && allowedRoles.length > 0) {
    const role = profile?.role || 'patient';
    if (!allowedRoles.includes(role)) return <div className="container mx-auto py-12">Accès non autorisé.</div>;
  }

  return <>{children}</>;
}
