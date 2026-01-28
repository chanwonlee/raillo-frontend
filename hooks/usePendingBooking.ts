import { useMutation, useQuery } from "@tanstack/react-query";
import { tokenManager } from "@/lib/auth";

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
    mutationFn: async (data: PendingBookingRequest) => {
      const response = await fetch(
        "http://localhost:8080/api/v1/pending-bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenManager.getToken()}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "대기 예약 생성에 실패했습니다.");
      }

      return response.json() as Promise<PendingBookingResponse>;
    },
  });
};

// 대기 예약 목록 조회 hook
export const useGetPendingBookingList = () => {
  return useQuery<PendingBookingListResponse, Error>({
    queryKey: ["pendingBookings"],
    queryFn: async () => {
      const token = tokenManager.getToken();
      if (!token) {
        throw new Error("인증 토큰이 없습니다.");
      }

      const response = await fetch(
        "http://localhost:8080/api/v1/pending-bookings",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || "대기 예약 목록 조회에 실패했습니다."
        );
      }

      return response.json() as Promise<PendingBookingListResponse>;
    },
  });
};
