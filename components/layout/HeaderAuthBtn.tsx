"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { LogIn, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { tokenManager } from "@/lib/auth";
import { logout } from "@/lib/api/auth";
import { useRouter } from "next/navigation";

const HeaderAuthBtn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const initAuth = async () => {
      const isAuth = await tokenManager.initializeAuth();
      setIsLoggedIn(isAuth);
    };

    initAuth();
  }, []);

  // 로그아웃 함수
  const handleLogout = async () => {
    try {
      await logout();
      tokenManager.removeToken();
      updateLoginStatus();
      alert("로그아웃되었습니다.");
      router.push("/");
    } catch (error: any) {
      console.error("로그아웃 에러:", error);
      // 로그아웃 API 실패해도 로컬 토큰은 제거
      tokenManager.removeToken();
      updateLoginStatus();
      alert("로그아웃되었습니다.");
      router.push("/");
    }
  };

  // 로그인 상태를 실시간으로 업데이트하는 함수
  const updateLoginStatus = () => {
    setIsLoggedIn(tokenManager.isAuthenticated());
  };

  if (isLoggedIn) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center space-x-2"
        onClick={handleLogout}
      >
        <LogOut className="h-4 w-4" />
        <span>로그아웃</span>
      </Button>
    );
  }
  return (
    <Link href="/login">
      <Button variant="ghost" size="sm" className="flex items-center space-x-2">
        <LogIn className="h-4 w-4" />
        <span>로그인</span>
      </Button>
    </Link>
  );
};

export default HeaderAuthBtn;
