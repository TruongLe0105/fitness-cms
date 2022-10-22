export interface PageLayoutAuthProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}
export interface LoginRequest {
  username: string;
  password: string;
}
export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  password: string;
  confirmPassword: string;
}
