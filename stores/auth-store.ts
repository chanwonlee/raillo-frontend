import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TokenReissueResponse } from "@/types/authType";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "/__api";
let refreshPromise: Promise<boolean> | null = null;
let initializePromise: Promise<void> | null = null;

interface AuthState {
  isInitialized: boolean;
  isAuthenticated: boolean;
  accessToken: string | null;
  tokenExpiresIn: number | null;

  setTokens: (accessToken: string, expiresIn: number) => void;
  removeTokens: () => void;
  getToken: () => string | null;
  hasValidToken: () => boolean;
  refreshTokens: () => Promise<boolean>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isInitialized: false,
      isAuthenticated: false,
      accessToken: null,
      tokenExpiresIn: null,

      setTokens: (accessToken: string, expiresIn: number) => {
        set({
          isAuthenticated: true,
          accessToken,
          tokenExpiresIn: expiresIn,
        });
      },

      removeTokens: () => {
        set({
          isAuthenticated: false,
          accessToken: null,
          tokenExpiresIn: null,
        });
      },

      getToken: () => get().accessToken,

      hasValidToken: () => {
        const { accessToken, tokenExpiresIn } = get();

        if (!accessToken || !tokenExpiresIn) {
          return false;
        }

        return Date.now() < tokenExpiresIn;
      },

      refreshTokens: async () => {
        if (refreshPromise) {
          return refreshPromise;
        }

        refreshPromise = (async () => {
          const reissueEndpoints = ["/auth/reissue", "/api/v1/auth/reissue"];
          let lastError: unknown = null;

          for (const endpoint of reissueEndpoints) {
            try {
              const response = await axios.post<TokenReissueResponse>(
                `${API_BASE_URL}${endpoint}`,
                undefined,
                {
                  withCredentials: true,
                  validateStatus: (status) => status >= 200 && status < 500,
                }
              );

              if (
                response.status >= 200 &&
                response.status < 300 &&
                response.data?.result
              ) {
                const { accessToken, accessTokenExpiresIn } = response.data.result;
                const expiresIn = Date.now() + accessTokenExpiresIn * 1000;
                get().setTokens(accessToken, expiresIn);
                return true;
              }

              if (response.status === 401 || response.status === 404) {
                continue;
              }
            } catch (error) {
              lastError = error;
              continue;
            }
          }

          if (lastError) {
            if (axios.isAxiosError(lastError) && !lastError.response) {
              console.warn("토큰 갱신 서버 연결 실패:", lastError.message);
            } else {
              console.error("토큰 갱신 요청 실패:", lastError);
            }
          }

          get().removeTokens();
          return false;
        })().finally(() => {
          refreshPromise = null;
        });

        return refreshPromise;
      },

      // 앱 초기화 시 토큰 상태 확인 및 갱신
      initialize: async () => {
        if (get().isInitialized) {
          return;
        }

        if (initializePromise) {
          return initializePromise;
        }

        initializePromise = (async () => {
          if (get().hasValidToken()) {
            set({ isAuthenticated: true, isInitialized: true });
            return;
          }

          const refreshed = await get().refreshTokens();

          if (!refreshed) {
            get().removeTokens();
          }

          set({ isInitialized: true });
        })().finally(() => {
          initializePromise = null;
        });

        return initializePromise;
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        accessToken: state.accessToken,
        tokenExpiresIn: state.tokenExpiresIn,
      }),
    }
  )
);
