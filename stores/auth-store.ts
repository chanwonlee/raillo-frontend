import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TokenReissueResponse } from "@/types/authType";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  tokenExpiresIn: number | null;

  setTokens: (accessToken: string, expiresIn: number) => void;
  removeTokens: () => void;
  getToken: () => string | null;
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

      // 앱 초기화 시 토큰 상태 확인 및 갱신
      initialize: async () => {
        const { accessToken, tokenExpiresIn } = get();

        // 토큰이 없으면 reissue 시도 (HttpOnly refreshToken이 있을 수 있음)
        if (!accessToken) {
          try {
            const { data } = await axios.post<TokenReissueResponse>(
              `${API_BASE_URL}/auth/reissue`,
              {},
              { withCredentials: true }
            );

            if (data.result) {
              const { accessToken, accessTokenExpiresIn } = data.result;
              const expiresIn = Date.now() + accessTokenExpiresIn * 1000;
              set({
                isAuthenticated: true,
                accessToken,
                tokenExpiresIn: expiresIn,
              });
            }
          } catch (error) {
            // reissue 실패 시 로그아웃 상태 유지
            console.log("토큰 복원 불가 (로그인 필요)");
          }
          return;
        }

        // 토큰이 있으면 만료 여부 확인
        const currentTime = Date.now();
        if (tokenExpiresIn && currentTime >= tokenExpiresIn) {
          // 만료됐으면 reissue 시도
          try {
            const { data } = await axios.post<TokenReissueResponse>(
              `${API_BASE_URL}/auth/reissue`,
              {},
              { withCredentials: true }
            );

            if (data.result) {
              const { accessToken, accessTokenExpiresIn } = data.result;
              const expiresIn = Date.now() + accessTokenExpiresIn * 1000;
              set({
                isAuthenticated: true,
                accessToken,
                tokenExpiresIn: expiresIn,
              });
            } else {
              get().removeTokens();
            }
          } catch (error) {
            console.error("토큰 갱신 실패:", error);
            get().removeTokens();
          }
        } else {
          // 만료되지 않았으면 isAuthenticated true로 설정
          set({ isAuthenticated: true });
        }
      },
    }),
    {
      name: "auth-storage", // sessionStorage key
      partialize: (state) => ({
        accessToken: state.accessToken,
        tokenExpiresIn: state.tokenExpiresIn,
      }),
    }
  )
);
