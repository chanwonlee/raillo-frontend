import { useMutation } from "@tanstack/react-query";
import { tokenManager } from "@/lib/auth";

// 결제 준비 요청 타입
export interface PaymentPrepareRequest {
  message: string;
  pendingBookingIds: string[];
}

// 결제 준비 응답 타입
export interface PaymentPrepareResponse {
  message: string;
  result: {
    orderId: string;
    amount: number;
  };
}

// 결제 확정 요청 타입
export interface PaymentConfirmRequest {
  paymentKey: string;
  orderId: string;
  amount: number;
}

// 결제 확정 응답 타입
export interface PaymentConfirmResponse {
  message: string;
  result: {
    paymentId: number;
    orderId: string;
    paymentKey: string;
    amount: number;
    paymentMethod: string;
    paymentStatus: string;
    paidAt: string;
  };
}

// 결제 준비 hook
export const usePostPaymentPrepare = () => {
  return useMutation<PaymentPrepareResponse, Error, PaymentPrepareRequest>({
    mutationFn: async (body: PaymentPrepareRequest) => {
      const token = tokenManager.getToken();
      if (!token) {
        throw new Error("인증 토큰이 없습니다.");
      }

      const response = await fetch(
        "http://localhost:8080/api/v1/payments/prepare",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          // 메시지와 대기 예약 ID 목록을 JSON 형태로 전송
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "결제 준비에 실패했습니다.");
      }

      return response.json() as Promise<PaymentPrepareResponse>;
    },
  });
};

// 결제 확정 hook
export const usePostPaymentConfirm = () => {
  return useMutation<PaymentConfirmResponse, Error, PaymentConfirmRequest>({
    mutationFn: async (body: PaymentConfirmRequest) => {
      console.log(body);
      const token = tokenManager.getToken();
      if (!token) {
        throw new Error("인증 토큰이 없습니다.");
      }

      const response = await fetch(
        "http://localhost:8080/api/v1/payments/confirm",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "결제 확정에 실패했습니다.");
      }

      return response.json() as Promise<PaymentConfirmResponse>;
    },
  });
};
