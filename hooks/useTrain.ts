import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  SearchTrainCalendarResponse,
  SearchTrainCarsRequest,
  SearchTrainCarsResponse,
  SearchTrainScheduleRequest,
  SearchTrainScheduleResponse,
  TrainSeatsDetailRequest,
  TrainSeatsDetailResponse,
} from "@/types/trainType";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export const usePostTrainSeatsDetail = (
  params: TrainSeatsDetailRequest | null
) => {
  return useMutation<TrainSeatsDetailResponse, Error, TrainSeatsDetailRequest>({
    mutationFn: async (
      params: TrainSeatsDetailRequest
    ): Promise<TrainSeatsDetailResponse> => {
      try {
        const { data } = await axios.post<TrainSeatsDetailResponse>(
          `${API_BASE_URL}/api/v1/trains/seats/detail`,
          params
        );
        return data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data) {
          const message =
            (error.response.data as { message?: string }).message ||
            "열차 좌석 상세 조회에 실패했습니다.";
          throw new Error(message);
        }
        throw error;
      }
    },
  });
};

export const usePostSearchTrainSchedule = (
  params: SearchTrainScheduleRequest | null
) => {
  return useMutation<
    SearchTrainScheduleResponse,
    Error,
    SearchTrainScheduleRequest
  >({
    mutationFn: async (
      params: SearchTrainScheduleRequest
    ): Promise<SearchTrainScheduleResponse> => {
      try {
        const { data } = await axios.post<SearchTrainScheduleResponse>(
          `${API_BASE_URL}/api/v1/trains/search/schedule`,
          params
        );
        return data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data) {
          const message =
            (error.response.data as { message?: string }).message ||
            "열차 운행 조회에 실패했습니다.";
          throw new Error(message);
        }
        throw error;
      }
    },
  });
};

export const usePostSearchTrainCars = (
  params: SearchTrainCarsRequest | null
) => {
  return useMutation<SearchTrainCarsResponse, Error, SearchTrainCarsRequest>({
    mutationFn: async (
      params: SearchTrainCarsRequest
    ): Promise<SearchTrainCarsResponse> => {
      try {
        const { data } = await axios.post<SearchTrainCarsResponse>(
          `${API_BASE_URL}/api/v1/trains/search/cars`,
          params
        );
        return data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data) {
          const message =
            (error.response.data as { message?: string }).message ||
            "열차 객차 조회에 실패했습니다.";
          throw new Error(message);
        }
        throw error;
      }
    },
  });
};

export const useGetSearchTrainCalendar = () => {
  return useQuery<SearchTrainCalendarResponse, Error>({
    queryKey: ["searchTrainCalendar"],
    queryFn: async (): Promise<SearchTrainCalendarResponse> => {
      try {
        const { data } = await axios.get<SearchTrainCalendarResponse>(
          `${API_BASE_URL}/api/v1/trains/search/calendar`
        );
        return data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data) {
          const message =
            (error.response.data as { message?: string }).message ||
            "열차 운행 캘린더 조회에 실패했습니다.";
          throw new Error(message);
        }
        throw error;
      }
    },
    enabled: true,
  });
};
