import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TokenReissueResponse } from "@/types/authType";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
let refreshPromise: Promise<boolean> | null = null;

interface AuthState {
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
          try {
            const { data } = await axios.post<TokenReissueResponse>(
              `${API_BASE_URL}/auth/reissue`,
              {},
              { withCredentials: true }
            );

            if (!data.result) {
              get().removeTokens();
              return false;
            }

            const { accessToken, accessTokenExpiresIn } = data.result;
            const expiresIn = Date.now() + accessTokenExpiresIn * 1000;
            get().setTokens(accessToken, expiresIn);
            return true;
          } catch (error) {
            console.error("토큰 갱신 실패:", error);
            get().removeTokens();
            return false;
          } finally {
            refreshPromise = null;
          }
        })();

        return refreshPromise;
      },

      // 앱 초기화 시 토큰 상태 확인 및 갱신
      initialize: async () => {
        if (get().hasValidToken()) {
          set({ isAuthenticated: true });
          return;
        }

        const refreshed = await get().refreshTokens();

        if (!refreshed) {
          get().removeTokens();
        }
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
