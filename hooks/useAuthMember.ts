import {
  ChangeEmailRequest,
  ChangeEmailResponse,
  FindMemberNoRequest,
  FindMemberNoResponse,
  FindPasswordRequest,
  FindPasswordResponse,
  VerifyEmailChangeRequest,
  VerifyEmailChangeResponse,
  VerifyFindMemberNoRequest,
  VerifyFindMemberNoResponse,
  VerifyFindPasswordRequest,
  VerifyFindPasswordResponse,
} from "@/types/authMemberType";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

// ========== 이메일 변경 인증코드 검증 ==========

export const usePutVerifyEmailChange = () => {
  return useMutation<
    VerifyEmailChangeResponse,
    Error,
    VerifyEmailChangeRequest
  >({
    mutationFn: async (
      payload: VerifyEmailChangeRequest
    ): Promise<VerifyEmailChangeResponse> => {
      const { data } = await axios.put<VerifyEmailChangeResponse>(
        `${API_BASE_URL}/auth/members/me/email-code`,
        payload
      );
      return data;
    },
  });
};

// ========== 이메일 변경 요청 ==========

export const usePostChangeEmail = () => {
  return useMutation<ChangeEmailResponse, Error, ChangeEmailRequest>({
    mutationFn: async (
      payload: ChangeEmailRequest
    ): Promise<ChangeEmailResponse> => {
      const { data } = await axios.post<ChangeEmailResponse>(
        `${API_BASE_URL}/auth/members/me/email-code`,
        payload
      );
      return data;
    },
  });
};

// ========== 비밀번호 찾기 요청 ==========

export const usePostFindPassword = () => {
  return useMutation<FindPasswordResponse, Error, FindPasswordRequest>({
    mutationFn: async (
      payload: FindPasswordRequest
    ): Promise<FindPasswordResponse> => {
      const { data } = await axios.post<FindPasswordResponse>(
        `${API_BASE_URL}/auth/password`,
        payload
      );
      return data;
    },
  });
};

// ========== 비밀번호 찾기 인증코드 검증 ==========

export const usePostVerifyFindPassword = () => {
  return useMutation<
    VerifyFindPasswordResponse,
    Error,
    VerifyFindPasswordRequest
  >({
    mutationFn: async (
      payload: VerifyFindPasswordRequest
    ): Promise<VerifyFindPasswordResponse> => {
      const { data } = await axios.post<VerifyFindPasswordResponse>(
        `${API_BASE_URL}/auth/password/verify`,
        payload
      );
      return data;
    },
  });
};

// ========== 회원번호 찾기 요청 ==========

export const usePostFindMemberNo = () => {
  return useMutation<FindMemberNoResponse, Error, FindMemberNoRequest>({
    mutationFn: async (
      payload: FindMemberNoRequest
    ): Promise<FindMemberNoResponse> => {
      const { data } = await axios.post<FindMemberNoResponse>(
        `${API_BASE_URL}/auth/member-no`,
        payload
      );
      return data;
    },
  });
};

// ========== 회원번호 찾기 인증코드 검증 ==========

export const usePostVerifyFindMemberNo = () => {
  return useMutation<
    VerifyFindMemberNoResponse,
    Error,
    VerifyFindMemberNoRequest
  >({
    mutationFn: async (
      payload: VerifyFindMemberNoRequest
    ): Promise<VerifyFindMemberNoResponse> => {
      const { data } = await axios.post<VerifyFindMemberNoResponse>(
        `${API_BASE_URL}/auth/member-no/verify`,
        payload
      );
      return data;
    },
  });
};
