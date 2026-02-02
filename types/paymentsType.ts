// ========== 결제 준비 ==========

export interface PaymentPrepareRequest {
  pendingBookingIds: string[];
}

export interface PaymentPrepareResult {
  orderId: string;
  amount: number;
}

export interface PaymentPrepareResponse {
  message: string;
  result: PaymentPrepareResult;
}

// ========== 결제 승인 ==========

export interface PaymentConfirmRequest {
  paymentKey: string;
  orderId: string;
  amount: number;
}

export interface PaymentConfirmResult {
  paymentId: number;
  orderId: string;
  paymentKey: string;
  amount: number;
  paymentMethod: string;
  paymentStatus: string;
  paidAt: string;
}

export interface PaymentConfirmResponse {
  message: string;
  result: PaymentConfirmResult;
}
