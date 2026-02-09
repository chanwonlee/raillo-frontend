import {
  PaymentConfirmRequest,
  PaymentConfirmResponse,
  PaymentPrepareRequest,
  PaymentPrepareResponse,
} from "@/types/paymentsType";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export const usePostPaymentPrepare = () => {
  return useMutation<PaymentPrepareResponse, Error, PaymentPrepareRequest>({
    mutationFn: async (
      params: PaymentPrepareRequest
    ): Promise<PaymentPrepareResponse> => {
      try {
        const { data } = await axios.post<PaymentPrepareResponse>(
          `${API_BASE_URL}/api/v1/payments/prepare`,
          params
        );
        return data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data) {
          const message =
            (error.response.data as { message?: string }).message ||
            "결제 준비에 실패했습니다.";
          throw new Error(message);
        }
        throw error;
      }
    },
  });
};

export const usePostPaymentConfirm = () => {
  return useMutation<PaymentConfirmResponse, Error, PaymentConfirmRequest>({
    mutationFn: async (
      params: PaymentConfirmRequest
    ): Promise<PaymentConfirmResponse> => {
      try {
        const { data } = await axios.post<PaymentConfirmResponse>(
          `${API_BASE_URL}/api/v1/payments/confirm`,
          params
        );
        return data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data) {
          const message =
            (error.response.data as { message?: string }).message ||
            "결제 승인에 실패했습니다.";
          throw new Error(message);
        }
        throw error;
      }
    },
  });
};
