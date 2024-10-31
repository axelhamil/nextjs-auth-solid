import { firebaseAuth } from "@/common/config/firebase.config";
import {
  IAuthService,
  IAuthUser,
} from "@/src/interfaces/IAuthService.interface";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
  signInWithPopup,
  User,
} from "firebase/auth";

export class FirebaseAuthService implements IAuthService {
  private handleError(operation: string, error: unknown): never {
    const errorMessage = `Failed to ${operation}: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  async signIn(providerName: string): Promise<void> {
    try {
      const providers = {
        google: () => {
          const provider = new GoogleAuthProvider();
          provider.addScope("email");
          provider.setCustomParameters({
            client_id: process.env.GOOGLE_CLIENT_ID!,
          });
          return provider;
        },
        github: () => {
          const provider = new GithubAuthProvider();
          provider.setCustomParameters({
            client_id: process.env.GITHUB_CLIENT_ID!,
            client_secret: process.env.GITHUB_CLIENT_SECRET!,
          });
          return provider;
        },
      };

      const getProvider = providers[providerName as keyof typeof providers];

      if (!getProvider)
        throw new Error(`Provider ${providerName} not supported`);

      const authProvider = getProvider();
      await signInWithPopup(firebaseAuth, authProvider);
    } catch (error) {
      this.handleError("Sign in", error);
    }
  }

  async signOut(): Promise<void> {
    try {
      await signOut(firebaseAuth);
    } catch (error) {
      this.handleError("Sign out", error);
    }
  }

  async getCurrentUser(): Promise<IAuthUser | null> {
    try {
      const user = await this.waitForAuthStateChange();
      return user ? this.mapFirebaseUserToAuthUser(user) : null;
    } catch (error) {
      this.handleError("Get current user", error);
      return null;
    }
  }

  onAuthStateChanged(callback: (user: IAuthUser | null) => void): () => void {
    return firebaseAuth.onAuthStateChanged((user) => {
      try {
        callback(user ? this.mapFirebaseUserToAuthUser(user) : null);
      } catch (error) {
        this.handleError("Auth state change callback", error);
      }
    });
  }

  private waitForAuthStateChange(): Promise<User | null> {
    return new Promise((resolve) => {
      const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
        resolve(user);
        unsubscribe();
      });
    });
  }

  private mapFirebaseUserToAuthUser(user: User): IAuthUser {
    return {
      id: user.uid,
      name: user.displayName,
      email: user.email,
      image: user.photoURL,
    };
  }
}
