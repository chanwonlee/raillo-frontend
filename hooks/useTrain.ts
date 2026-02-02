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
  TrainSeatsDetailResult,
} from "@/types/trainType";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export const usePostTrainSeatsDetail = (
  params: TrainSeatsDetailRequest | null
) => {
  return useMutation({
    mutationFn: async (): Promise<TrainSeatsDetailResponse> => {
      const { data } = await axios.post<TrainSeatsDetailResponse>(
        `${API_BASE_URL}/api/v1/trains/seats/detail`,
        params!
      );
      return data;
    },
  });
};

export const usePostSearchTrainSchedule = (
  params: SearchTrainScheduleRequest | null
) => {
  return useMutation({
    mutationFn: async (): Promise<SearchTrainScheduleResponse> => {
      const { data } = await axios.post<SearchTrainScheduleResponse>(
        `${API_BASE_URL}/api/v1/trains/search/schedule`,
        params!
      );
      return data;
    },
  });
};

export const usePostSearchTrainCars = (
  params: SearchTrainCarsRequest | null
) => {
  return useMutation({
    mutationFn: async (): Promise<SearchTrainCarsResponse> => {
      const { data } = await axios.post<SearchTrainCarsResponse>(
        `${API_BASE_URL}/api/v1/trains/search/cars`,
        params!,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return data;
    },
  });
};

export const useGetSearchTrainCalendar = () => {
  return useQuery({
    queryKey: ["searchTrainCalendar"],
    queryFn: async (): Promise<SearchTrainCalendarResponse> => {
      const { data } = await axios.get<SearchTrainCalendarResponse>(
        `${API_BASE_URL}/api/v1/trains/search/calendar`
      );
      return data;
    },
    enabled: true,
  });
};
