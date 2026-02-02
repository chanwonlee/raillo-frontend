export interface TrainSeatsDetailRequest {
  trainCarId: number;
  trainScheduleId: number;
  departureStationId: number;
  arrivalStationId: number;
}

export interface TrainSeatsDetailSuccessResponse {
  message: string;
  result: {
    carNumber: string;
    carType: string;
    totalSeatCount: number;
    remainingSeatCount: number;
    layoutType: number;
    seatList: {
      seatId: number;
      seatNumber: string;
      isAvailable: boolean;
      seatDirection: string;
      seatType: string;
      remarks: string;
    }[];
  };
}

export interface SearchTrainScheduleRequest {
  departureStationId: number;
  arrivalStationId: number;
  operationDate: string;
  passengerCount: number;
  departureHour: string;
  departureTimeFilter: string;
}

export interface SearchTrainScheduleSuccessResponse {
  message: string;
  result: {
    content: string;
    currentPage: number;
    pageSize: number;
    numberOfElements: number;
    hasNext: boolean;
    hasPrevious: boolean;
    first: boolean;
    last: boolean;
  };
}

export interface SearchTrainCarsRequest {
  trainScheduleId: number;
  departureStationId: number;
  arrivalStationId: number;
  passengerCount: number;
}

export interface SearchTrainCarsSuccessResponse {
  message: string;
  result: {
    trainScheduleId: number;
    recommendedCarNumber: string;
    totalCarCount: number;
    trainClassificationCode: string;
    trainNumber: string;
    carInfos: {
      id: number;
      carNumber: string;
      carType: string;
      totalSeats: number;
      remainingSeats: number;
      seatArrangement: string;
    }[];
  };
}

export interface SearchTrainCalendarResponse {
  message: string;
  result: {
    operationDate: string;
    dayOfWeek: string;
    businessDayType: string;
    isHoliday: string;
    isBookingAvailable: string;
  }[];
}
