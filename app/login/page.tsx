import { Card } from "@/components/ui/card";
import LoginHeader from "./_components/LoginHeader";
import LoginField from "./_components/LoginField";
import LoginHelpLinks from "./_components/LoginHelpLinks";
import { CardContent } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="py-10 flex justify-center items-center w-full">
      <Card className="bg-white shadow-lg w-full max-w-md">
        <LoginHeader />
        <CardContent>
          {/* 회원번호 로그인 */}
          <LoginField />
          {/* 찾기 및 회원가입 링크 */}
          <LoginHelpLinks />
          {/* 추가 안내 */}
          <div className="text-center text-xs text-gray-500 mt-6">
            <p>
              로그인 시 RAIL-O의 이용약관 및 개인정보처리방침에 동의하게 됩니다.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
