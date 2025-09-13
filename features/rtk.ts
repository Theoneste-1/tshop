import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";

import {
  getAccessToken,
  getRefreshToken,
  saveTokens,
  clearTokens,
  getUserData,
} from "./auth/authUtils";
import { TokenResponse } from "@/types/auth/auth.dto";

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: `${
    process.env.NEXT_PUBLIC_API_URL
      ? process.env.NEXT_PUBLIC_API_URL
      : "http://localhost:8080"
  }/api`,
  prepareHeaders: (headers) => {
    const token = getAccessToken();
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
  credentials: "include",
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const release = await mutex.acquire();

  try {
    let result = await baseQuery(args, api, extraOptions);

    // check if we got htm instead of JSON
    if (
      result.error &&
      result.error.status === "PARSING_ERROR" &&
      result.error.data.toString().includes("<!DOCTYPE html>")
    ) {
      const originalUrl = typeof args === "string" ? args : args.url;
      const customError: FetchBaseQueryError = {
        status: "CUSTOM_ERROR",
        data: {
          message: "Received HTML instead of JSON  from the server",
        },
        error: "Received HTML instead of JSON  from the server",
      };
      result.error = customError;
      return result;
    }

    if (result.error && result.error.status === 401) {
      const refreshToken = getRefreshToken();
      const userData = getUserData();

      if (refreshToken && userData.id) {
        const refreshResult = await baseQuery(
          {
            url: "/auth/refresh",
            method: "POST",
            body: {
              refreshToken,
              userId: userData.id,
            },
          },
          api,
          extraOptions
        );
        if (refreshResult.data) {
          saveTokens(refreshResult.data as TokenResponse);
          result = await baseQuery(args, api, extraOptions);
        } else {
          clearTokens();
          if (typeof window !== "undefined") {
            window.location.href = "/auth/login";
          }
        }
      } else {
        clearTokens();
        if (typeof window !== "undefined") {
          window.location.href = "/auth/login";
        }
      }
    }
    return result;
  } finally {
    release();
  }
};


export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
    tagTypes: []
});

export const {} = baseApi