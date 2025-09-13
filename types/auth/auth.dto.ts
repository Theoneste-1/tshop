// JwtResponse.ts
export interface JwtResponse {
  token: string;
  type: string; // usually "Bearer"
  refreshToken: string;
  id: string;
  username: string;
  email: string;
  roles: string[];
}

// LoginRequestDto.ts
export interface LoginRequestDto {
  usernameOrEmail: string;
  password: string;
}

// Role.ts
export enum Role {
  ROLE_ADMIN = "ROLE_ADMIN",
  ROLE_SELLER = "ROLE_SELLER",
  ROLE_CUSTOMER = "ROLE_CUSTOMER",
  ROLE_DELIVERY = "ROLE_DELIVERY",
  ROLE_SUPPORT = "ROLE_SUPPORT",
}

// RoleRequest.ts
export interface RoleRequest {
  name: string;
}

// SignupRequest.ts
export interface SignupRequest {
  username: string;
  email: string;
  password: string;
  roles?: Role[];
}

// MessageResponse.ts
export interface MessageResponse {
  message: string;
}

// TokenRefreshRequest.ts
export interface TokenRefreshRequest {
  refreshToken: string;
}

// TokenRefreshResponse.ts
export interface TokenRefreshResponse {
  access_token: string;
  refresh_token: string;
}


export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}


// Define request types based on the auth guide
export interface SignInRequest {
  email: string;
  password: string;
}

export interface ForgetPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  email: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  email: string;
}

export interface RefreshTokenRequest {
  userId: string;
  refreshToken: string;
}

