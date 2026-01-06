"use client";

import Link from "next/link";
import LoginForm from "@/components/login/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      {/* Main Content */}
      {/* Login Card */}
      <LoginForm />

      {/* 회원가입 안내 */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          아직 RAIL-O 회원이 아니신가요?{" "}
          <Link
            href="/signup"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            회원가입하기
          </Link>
        </p>
      </div>
    </div>
  );
}
