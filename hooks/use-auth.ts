import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";

interface UseAuthOptions {
  redirectTo?: string;
  requireAuth?: boolean;
  redirectPath?: string;
}

export function useAuth(options: UseAuthOptions = {}) {
  const { redirectTo = "/login", requireAuth = true, redirectPath } = options;
  const { accessToken, tokenExpiresIn, initialize } = useAuthStore();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const isAuthenticated =
    Boolean(accessToken) &&
    Boolean(tokenExpiresIn) &&
    Date.now() < (tokenExpiresIn ?? 0);

  const checkAuth = useCallback(() => {
    if (!isInitialized) {
      return;
    }

    if (requireAuth && !isAuthenticated) {
      // 리다이렉트 경로가 있으면 해당 경로로, 없으면 기본 로그인 페이지로
      const redirectUrl = redirectPath
        ? `${redirectTo}?redirectTo=${encodeURIComponent(redirectPath)}`
        : redirectTo;
      router.push(redirectUrl);
    }
  }, [isInitialized, isAuthenticated, requireAuth, redirectTo, redirectPath, router]);

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        await initialize();
      } finally {
        if (!mounted) {
          return;
        }
        setIsInitialized(true);
        setIsLoading(false);
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
    };
  }, [initialize]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const isLoggedIn = isLoading ? null : isAuthenticated;

  return {
    isLoggedIn,
    isLoading,
    isAuthenticated,
    isUnauthenticated: !isLoading && !isAuthenticated,
    isChecking: isLoading,
  };
}
