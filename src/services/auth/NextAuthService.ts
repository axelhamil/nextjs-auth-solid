import {
  signIn as nextAuthSignIn,
  signOut as nextAuthSignOut,
  getSession,
} from "next-auth/react";
import {
  IAuthService,
  IAuthUser,
} from "@/src/interfaces/IAuthService.interface";

export class NextAuthService implements IAuthService {
  private handleError(operation: string, error: unknown): never {
    const errorMessage = `Failed to ${operation}: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  public async signIn(provider: string): Promise<void> {
    try {
      await nextAuthSignIn(provider);
    } catch (error) {
      this.handleError(`sign in with ${provider}`, error);
    }
  }

  public async signOut(): Promise<void> {
    try {
      await nextAuthSignOut();
    } catch (error) {
      this.handleError("sign out", error);
    }
  }

  public async getCurrentUser(): Promise<IAuthUser | null> {
    try {
      const session = await getSession();
      return session?.user || null;
    } catch (error) {
      this.handleError("get current user", error);
    }
  }

  public onAuthStateChanged(
    callback: (user: IAuthUser | null) => void
  ): () => void {
    const handleAuthChange = async (): Promise<void> => {
      try {
        const currentUser = await this.getCurrentUser();
        callback(currentUser);
      } catch (error) {
        console.error("Error in auth state change handler:", error);
      }
    };

    handleAuthChange();

    return () => {
      // Cleanup logic if needed
    };
  }
}
