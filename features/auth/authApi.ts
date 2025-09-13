import { baseApi } from '@/features/rtk';
import { ForgetPasswordRequest, LoginRequestDto, RefreshTokenRequest, ResetPasswordRequest, SignupRequest, TokenResponse } from '@/types/auth/auth.dto';
const _enhancedAuthApi = baseApi.enhanceEndpoints({
  addTagTypes: ['Auth'],
});

// Inject endpoints into the base API
export const authApi = _enhancedAuthApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<any, LoginRequestDto>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),
    
    signUp: builder.mutation<any, SignupRequest>({
      query: (data: any) => ({
        url: '/auth',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Auth'],
    }),

    forgetPassword: builder.mutation<any,ForgetPasswordRequest>({
      query: (data) => ({
        url: '/auth/forget-password',
        method: 'POST',
        body: data,
      }),
    }),

    resetPassword: builder.mutation<any, ResetPasswordRequest>({
      query: (data) => ({
        url: '/auth/reset-password',
        method: 'PUT',
        body: {
          token: data.token,
          email: data.email,
          newPassword: data.newPassword,
        },
      }),
    }),

    refreshToken: builder.mutation<TokenResponse, RefreshTokenRequest>({
      query: (data) => ({
        url: '/auth/refresh-token',
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
  overrideExisting: false,
});

// Export hooks for usage in functional components
export const {
  // useSignInMutation,
  // useSignUpMutation,
  // useVerifyOtpMutation,
  // useForgetPasswordMutation,
  // useResetPasswordMutation,
  // useRefreshTokenMutation,
  // useConfirmEmailMutation,
  // useLogoutMutation,
  // useChangeTemporaryPasswordMutation,
} = authApi;
