import {
  ChangePasswordRequest,
  ChangePasswordResponse,
  ChangePhoneNumberRequest,
  ChangePhoneNumberResponse,
  DeleteMemberResponse,
  GetMemberInfoResponse,
  RegisterGuestRequest,
  RegisterGuestResponse,
} from "@/types/memberType";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export const usePutChangePhoneNumber = () => {
  return useMutation({
    mutationFn: async (
      params: ChangePhoneNumberRequest
    ): Promise<ChangePhoneNumberResponse> => {
      const { data } = await axios.put<ChangePhoneNumberResponse>(
        `${API_BASE_URL}/api/v1/members/phone-number`,
        params
      );
      return data;
    },
  });
};

export const usePutChangePassword = () => {
  return useMutation({
    mutationFn: async (
      params: ChangePasswordRequest
    ): Promise<ChangePasswordResponse> => {
      const { data } = await axios.put<ChangePasswordResponse>(
        `${API_BASE_URL}/api/v1/members/password`,
        params
      );
      return data;
    },
  });
};

export const usePostRegisterGuest = () => {
  return useMutation({
    mutationFn: async (
      params: RegisterGuestRequest
    ): Promise<RegisterGuestResponse> => {
      const { data } = await axios.post<RegisterGuestResponse>(
        `${API_BASE_URL}/api/v1/guest/register`,
        params
      );
      return data;
    },
  });
};

export const useGetMemberInfo = () => {
  return useQuery({
    queryKey: ["memberInfo"],
    queryFn: async (): Promise<GetMemberInfoResponse> => {
      const { data } = await axios.get<GetMemberInfoResponse>(
        `${API_BASE_URL}/api/v1/members/me`
      );
      return data;
    },
  });
};

export const useDeleteMember = () => {
  return useMutation({
    mutationFn: async (): Promise<DeleteMemberResponse> => {
      const { data } = await axios.delete<DeleteMemberResponse>(
        `${API_BASE_URL}/api/v1/members`
      );
      return data;
    },
  });
};
