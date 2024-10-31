/**
 * This interface represents an abstraction of the authentication system that unifies SOLID principles:
 *
 * 1. Single Responsibility Principle (SRP):
 *    - Each interface has one well-defined responsibility
 *    - IAuthUser -> user data structure
 *    - IAuthState -> authentication state
 *    - IAuthService -> authentication operations
 *    - FirebaseAuthService -> handles Firebase-specific auth
 *    - NextAuthService -> handles NextAuth-specific auth
 *
 * 2. Open/Closed Principle (OCP):
 *    - Interface is open for extension (new providers)
 *    - Concrete classes extend behavior without modifying the interface
 *    - FirebaseAuthService adds Firebase-specific handling
 *    - NextAuthService adds NextAuth-specific handling
 *
 * 3. Liskov Substitution Principle (LSP):
 *    - FirebaseAuthService and NextAuthService are interchangeable
 *    - Each implementation respects the interface contract
 *    - Methods return consistent types
 *    - Error handling is standardized
 *
 * 4. Interface Segregation Principle (ISP):
 *    - Minimalist interface that each service fully implements
 *    - FirebaseAuthService exposes only necessary methods
 *    - NextAuthService stays lean and focused
 *
 * 5. Dependency Inversion Principle (DIP):
 *    - Application depends on IAuthService, not implementations
 *    - Allows injection of FirebaseAuthService or NextAuthService
 *    - Facilitates testing with mocks
 *
 * Team Benefits:
 * - Living documentation of the auth contract
 * - Easier onboarding for new developers
 * - Reduces git conflicts and merge issues
 * - Enables parallel work on different providers
 * - Standardizes team practices
 * - Simplifies code review process
 *
 * Technical Benefits:
 * - Seamless migration between Firebase and NextAuth
 * - Simplified unit and integration testing
 * - Consistent developer experience
 * - Reduced cognitive complexity
 * - Improved maintainability
 * - Enables provider A/B testing
 * - Isolates external provider changes
 *
 * Drawbacks and Challenges:
 * - Initial increased complexity in architecture setup
 * - Development overhead for small projects
 * - Risk of over-engineering for simple cases
 * - Requires solid understanding of SOLID principles
 * - Can slow down initial development
 * - Learning curve for new team members
 * - Maintaining multiple implementations in parallel
 *
 * Conclusion:
 * While this architecture requires a higher initial investment,
 * it offers exceptional flexibility and maintainability in the long run.
 * It enables smooth evolution of the authentication system while ensuring
 * a robust and testable codebase. The benefits for the team and code quality
 * far outweigh the initial drawbacks, especially in an enterprise or team context.
 */

export interface IAuthUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  // You can add other properties here, for example:
  // createdAt?: Date;
  // lastLoginAt?: Date;
  // phoneNumber?: string;
  // isAnonymous?: boolean;
  // providerData?: { providerId: string; uid: string }[];
  // metadata?: { creationTime?: string; lastSignInTime?: string };
}

export interface IAuthState {
  user: IAuthUser | null;
  // You can add other data here, for example:
  // isLoading?: boolean;
  // error?: string | null;
  // lastLoginDate?: Date;
  // authProvider?: "google" | "github" | null;
  // isEmailVerified?: boolean;
  // ...others
}

export interface IAuthService {
  signIn(provider: string): Promise<void>;
  signOut(): Promise<void>;
  getCurrentUser(): Promise<IAuthUser | null>;
  onAuthStateChanged(callback: (user: IAuthUser | null) => void): () => void;
  // Note: This interface should be extended based on the specific adapter requirements.
  // Each adapter (Firebase, NextAuth, etc.) might need additional methods or properties.
  // The interface controls the application's authentication behavior, not the service implementation.
  // Examples of potential additions:
  // - linkAccounts(provider: string): Promise<void>;
  // - updateProfile(data: Partial<IAuthUser>): Promise<void>;
  // - deleteAccount(): Promise<void>;
  // - sendPasswordResetEmail(email: string): Promise<void>;
  // - verifyEmail(): Promise<void>;
}
