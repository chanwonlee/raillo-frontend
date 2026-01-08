"use client";

import { useSearchParams } from "next/navigation";
import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

const LoginHeader = () => {
  const searchParams = useSearchParams();
  const redirectMessage =
    searchParams.get("redirectTo") && "로그인이 필요한 서비스입니다.";
  return (
    <CardHeader className="text-center">
      <CardTitle className="text-2xl font-bold text-gray-900">로그인</CardTitle>
      <CardDescription className="text-gray-600">
        회원번호로 로그인하세요
      </CardDescription>
      {redirectMessage && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">{redirectMessage}</p>
        </div>
      )}
    </CardHeader>
  );
};

export default LoginHeader;
