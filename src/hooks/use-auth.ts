'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { onAuthStateChanged, User, signOut as firebaseSignOut } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter, usePathname } from 'next/navigation';
import { officeBearers } from '@/app/data/office-bearers';

interface FirestoreUser {
  name: string;
  email: string;
  ieeeId: string;
}

interface AuthContextType {
  user: User | null;
  firestoreUser: FirestoreUser | null;
  isOfficeBearer: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [firestoreUser, setFirestoreUser] = useState<FirestoreUser | null>(null);
  const [isOfficeBearer, setIsOfficeBearer] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data() as FirestoreUser;
            setFirestoreUser(userData);
            // The USN in office-bearers.ts seems to be the unique ID. The registration uses ieeeId.
            // For now, let's assume the `ieeeId` stored in firestore for a user corresponds to one of the USNs.
            // A more robust solution would be to have a consistent ID.
            const officeBearer = officeBearers.find(ob => ob.usn === userData.ieeeId);
            setIsOfficeBearer(!!officeBearer);
          }
        } catch (error) {
          console.error("Error fetching user data from Firestore:", error);
        }
      } else {
        setFirestoreUser(null);
        setIsOfficeBearer(false);
        if (pathname.startsWith('/dashboard')) {
          router.push('/login');
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router, pathname]);
  
  const signOut = async () => {
    await firebaseSignOut(auth);
    router.push('/');
  };


  return (
    <AuthContext.Provider value={{ user, firestoreUser, isOfficeBearer, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export default function withAuth<P extends object>(WrappedComponent: React.ComponentType<P>) {
    const WithAuthComponent = (props: P) => {
        return (
            <AuthProvider>
                <AuthRedirect>
                  <WrappedComponent {...props} />
                </AuthRedirect>
            </AuthProvider>
        );
    };
    return WithAuthComponent;
};

const AuthRedirect = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user && pathname.startsWith('/dashboard')) {
      router.push('/login');
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!user && pathname.startsWith('/dashboard')) {
    return null;
  }

  return <>{children}</>;
};

export function withAdminAuth<P extends object>(WrappedComponent: React.ComponentType<P>) {
  const WithAdminAuthComponent = (props: P) => {
      return (
          <AuthProvider>
              <AdminAuthRedirect>
                <WrappedComponent {...props} />
              </AdminAuthRedirect>
          </AuthProvider>
      );
  };
  return WithAdminAuthComponent;
};

const AdminAuthRedirect = ({ children }: { children: React.ReactNode }) => {
  const { user, isOfficeBearer, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
      } else if (!isOfficeBearer) {
        router.push('/dashboard');
      }
    }
  }, [user, isOfficeBearer, loading, router]);

  if (loading || !isOfficeBearer) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return <>{children}</>;
};