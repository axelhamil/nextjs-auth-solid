"use client"
import { IAuthService, IAuthUser } from '@/src/interfaces/IAuthService.interface';
import { FirebaseAuthService } from '@/src/services/auth/FirebaseAuthService';
import { NextAuthService } from '@/src/services/auth/NextAuthService';
import { createContext, useContext, ReactNode, useEffect, useState } from 'react';

interface AuthContextType extends IAuthService {
  user: IAuthUser | null;
  serviceType: string;
  handleServiceChange: (newService: "firebase" | "nextauth") => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

const determineServiceType = (service: IAuthService): string => {
  return service.constructor.name === "NextAuthService" ? "NextAuth" : "Firebase";
};

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [user, setUser] = useState<IAuthUser | null>(null);
  const [service, setService] = useState<IAuthService>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("authService") === "firebase" 
        ? new FirebaseAuthService() 
        : new NextAuthService();
    }
    return new NextAuthService();
  });

  useEffect(() => {
    const handleAuthStateChange = (newUser: IAuthUser | null) => {
      setUser(newUser);
    };

    const unsubscribe = service.onAuthStateChanged(handleAuthStateChange);
    return () => unsubscribe();
  }, [service]);

  const handleServiceChange = async (newService: "firebase" | "nextauth") => {
    setService(
      newService === "firebase" ? new FirebaseAuthService : new NextAuthService()
    );
    localStorage.setItem("authService", newService);
    await service.signOut();
  };

  const contextValue: AuthContextType = {
    signIn: service.signIn,
    signOut: service.signOut,
    getCurrentUser: service.getCurrentUser,
    onAuthStateChanged: service.onAuthStateChanged,
    user,
    serviceType: determineServiceType(service),
    handleServiceChange
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};