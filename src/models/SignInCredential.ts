export interface SignInCredential {
    usernameOrEmail: string;
    password: string;
    rememberMe: boolean;
    expiresAt?: number
}