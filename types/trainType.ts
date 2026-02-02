// ========== 좌석 상세 ==========

export interface TrainSeatsDetailRequest {
  trainCarId: number;
  trainScheduleId: number;
  departureStationId: number;
  arrivalStationId: number;
}

export interface TrainSeatItem {
  seatId: number;
  seatNumber: string;
  isAvailable: boolean;
  seatDirection: string;
  seatType: string;
  remarks: string;
}

export interface TrainSeatsDetailResult {
  carNumber: string;
  carType: string;
  totalSeatCount: number;
  remainingSeatCount: number;
  layoutType: number;
  seatList: TrainSeatItem[];
}

export interface TrainSeatsDetailResponse {
  message: string;
  result: TrainSeatsDetailResult;
}

// ========== 열차 스케줄 검색 ==========

export interface SearchTrainScheduleRequest {
  departureStationId: number;
  arrivalStationId: number;
  operationDate: string;
  passengerCount: number;
  departureHour: string;
  departureTimeFilter: string;
}

export interface SearchTrainSchedulePageResult {
  content: unknown[]; // 실제 스케줄 아이템 타입으로 교체
  currentPage: number;
  pageSize: number;
  numberOfElements: number;
  hasNext: boolean;
  hasPrevious: boolean;
  first: boolean;
  last: boolean;
}

export interface SearchTrainScheduleResponse {
  message: string;
  result: SearchTrainSchedulePageResult;
}

// ========== 객차 검색 ==========

export interface SearchTrainCarsRequest {
  trainScheduleId: number;
  departureStationId: number;
  arrivalStationId: number;
  passengerCount: number;
}

export interface TrainCarItem {
  id: number;
  carNumber: string;
  carType: string;
  totalSeats: number;
  remainingSeats: number;
  seatArrangement: string;
}

export interface SearchTrainCarsResult {
  trainScheduleId: number;
  recommendedCarNumber: string;
  totalCarCount: number;
  trainClassificationCode: string;
  trainNumber: string;
  carInfos: TrainCarItem[];
}

export interface SearchTrainCarsResponse {
  message: string;
  result: SearchTrainCarsResult;
}

// ========== 운행 캘린더 ==========

export interface TrainCalendarDay {
  operationDate: string;
  dayOfWeek: string;
  businessDayType: string;
  isHoliday: string;
  isBookingAvailable: string;
}

export interface SearchTrainCalendarResponse {
  message: string;
  result: TrainCalendarDay[];
}
