import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

// 대기 예약 요청 타입
export interface PendingBookingRequest {
  trainScheduleId: number;
  departureStationId: number;
  arrivalStationId: number;
  passengerTypes: string[];
  seatIds: number[];
}

// 대기 예약 응답 타입
export interface PendingBookingResponse {
  message?: string;
  result?: any;
}

// 대기 예약 좌석 정보 타입
export interface PendingBookingSeat {
  seatId: number;
  passengerType: string;
  carNumber: number;
  carType: string;
  seatNumber: string;
}

// 대기 예약 정보 타입
export interface PendingBookingInfo {
  pendingBookingId: string;
  trainNumber: string;
  trainName: string;
  departureStationName: string;
  arrivalStationName: string;
  departureTime: string;
  arrivalTime: string;
  operationDate: string;
  seats: PendingBookingSeat[];
}

// 대기 예약 목록 조회 응답 타입
export interface PendingBookingListResponse {
  message: string;
  result: PendingBookingInfo[];
}

export const usePostPendingBooking = () => {
  return useMutation<PendingBookingResponse, Error, PendingBookingRequest>({
    mutationFn: async (
      params: PendingBookingRequest
    ): Promise<PendingBookingResponse> => {
      try {
        const { data } = await axios.post<PendingBookingResponse>(
          `${API_BASE_URL}/api/v1/pending-bookings`,
          params
        );
        return data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data) {
          const message =
            (error.response.data as { message?: string }).message ||
            "대기 예약 생성에 실패했습니다.";
          throw new Error(message);
        }
        throw error;
      }
    },
  });
};

export const useGetPendingBookingList = () => {
  return useQuery<PendingBookingListResponse, Error>({
    queryKey: ["pendingBookings"],
    queryFn: async (): Promise<PendingBookingListResponse> => {
      try {
        const { data } = await axios.get<PendingBookingListResponse>(
          `${API_BASE_URL}/api/v1/pending-bookings`
        );
        return data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data) {
          const message =
            (error.response.data as { message?: string }).message ||
            "대기 예약 목록 조회에 실패했습니다.";
          throw new Error(message);
        }
        throw error;
      }
    },
  });
};
