import { api } from '../api'

// 예약 요청 타입
export interface ReservationRequest {
  trainScheduleId: number;
  departureStationId: number;
  arrivalStationId: number;
  passengers: {
    passengerType: 'ADULT' | 'CHILD' | 'INFANT' | 'SENIOR' | 'DISABLED_HEAVY' | 'DISABLED_LIGHT' | 'VETERAN';
    count: number;
  }[];
  seatIds: number[];
  tripType: "OW";
}

// 예약 응답 타입
export interface ReservationResponse {
  reservationId: number
  seatReservationIds: number[]
}

// 예약 정보 조회 응답 타입
export interface ReservationDetailResponse {
  reservationId: number
  reservationCode: string
  trainNumber: string
  trainName: string
  departureStationName: string
  arrivalStationName: string
  departureTime: string
  arrivalTime: string
  operationDate: string
  expiresAt: string
  fare: number
  seats: {
    seatReservationId: number
    passengerType: string
    carNumber: number
    carType: string
    seatNumber: string
  }[]
}

// 승차권을 포함한 예매 목록 조회 응답 타입
export interface TicketResponse {
  message: string
  result: {
    bookingId: number
    bookingCode: string
    trainNumber: string
    trainName: string
    departureStationName: string
    arrivalStationName: string
    departureTime: string
    arrivalTime: string
    operationDate: string
    tickets: {
      ticketId: number
      ticketNumber: string
      status: string
      passengerType: string
      carNumber: number
      carType: string
      seatNumber: string
    }[]
  }[]
}

export interface TicketReceiptResponse {
  message: string
  result: {
    ticketNumber: string
    ticketCreatedAt: string
    trainNumber: string
    carNumber: number
    carType: string
    seatNumber: string
    operationDate: string
    departureStationName: string
    arrivalStationName: string
    departureTime: string
    arrivalTime: string
    passengerType: string
    paymentMethod: string
    paidAt: string
    paymentKey: string
    amount: number
  }
}

// 예약 요청 함수
export const makeReservation = async (request: ReservationRequest) => {
  return api.post<ReservationResponse>("/api/v1/booking/reservation", request)
}

// 예약 정보 조회 함수
export const getReservationDetail = async (reservationId: number) => {
  return api.get<ReservationDetailResponse>(`/api/v1/booking/reservation/${reservationId}`)
}

// 예약 취소 함수 (대기 예약 ID 기반)
export const deleteReservation = async (pendingBookingId: string) => {
  return api.delete<DeletePendingBookingsResponse>("/api/v1/pending-bookings", {
    pendingBookingIds: [pendingBookingId],
  })
}

// 장바구니에 예약 추가 요청 타입
export interface AddToCartRequest {
  reservationId: number
}

// 장바구니에 예약 추가 응답 타입
export interface AddToCartResponse {
  message: string
}

// 장바구니 조회 응답 타입
export interface PendingBookingCartItem {
  pendingBookingId: string
  trainNumber: string
  trainName: string
  departureStationName: string
  arrivalStationName: string
  departureTime: string
  arrivalTime: string
  operationDate: string
  totalFare?: number | null
  seats: {
    seatId: number
    passengerType: string
    carNumber: number
    carType: string
    seatNumber: string
  }[]
  // 백엔드 확장 필드 대응
  reservationId?: number
  reservationCode?: string
  expiresAt?: string
  fare?: number
}

export interface CartResponse {
  message: string
  result: PendingBookingCartItem[]
}

export interface DeletePendingBookingsRequest {
  pendingBookingIds: string[]
}

export interface DeletePendingBookingsResponse {
  message: string
}

// 장바구니에 예약 추가 함수
export const addToCart = async (request: AddToCartRequest) => {
  return api.post<AddToCartResponse>("/api/v1/cart/reservations", request)
}

// 장바구니 조회 함수
export const getCart = async () => {
  return api.get<CartResponse["result"]>("/api/v1/pending-bookings")
}

export const deletePendingBookings = async (pendingBookingIds: string[]) => {
  const request: DeletePendingBookingsRequest = {
    pendingBookingIds,
  }
  return api.delete<DeletePendingBookingsResponse>("/api/v1/pending-bookings", request)
}

// 예약 목록 조회 함수
export const getReservationList = async () => {
  return api.get<PendingBookingCartItem[]>("/api/v1/pending-bookings")
}

// 단일 예약 조회 함수
export const getReservation = async (reservationId: number) => {
  return api.get<ReservationDetailResponse>(`/api/v1/booking/reservation/${reservationId}`)
}

// 승차권 조회 함수
export const getTickets = async () => {
  return api.get<TicketResponse["result"]>("/api/v1/bookings")
}

// 예매 상세 조회 함수
export const getBookingDetail = async (bookingId: number) => {
  return api.get<TicketResponse["result"][number]>(`/api/v1/bookings/${bookingId}`)
}

// 승차권 영수증 상세 조회 함수
export const getTicketReceipt = async (ticketId: number) => {
  return api.get<TicketReceiptResponse["result"]>(`/api/v1/booking/ticket/receipt/${ticketId}`)
}

 
