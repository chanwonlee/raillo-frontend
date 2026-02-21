import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

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
  result?: {
    reservationId?: number;
    id?: number;
    pendingBookingId?: string;
    [key: string]: unknown;
  };
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
      const response = await api.post<PendingBookingResponse["result"]>(
        "/api/v1/pending-bookings",
        params
      );

      return {
        message: response.message ?? "대기 예약이 생성되었습니다.",
        result: response.result,
      };
    },
  });
};

export const useGetPendingBookingList = () => {
  return useQuery<PendingBookingListResponse, Error>({
    queryKey: ["pendingBookings"],
    queryFn: async (): Promise<PendingBookingListResponse> => {
      const response = await api.get<PendingBookingInfo[]>(
        "/api/v1/pending-bookings"
      );

      return {
        message: response.message ?? "대기 예약 목록 조회에 성공했습니다.",
        result: response.result ?? [],
      }
    },
  });
};
