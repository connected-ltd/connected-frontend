export interface User {
  address: string;
  created_at: string;
  description: string;
  id: number;
  role: string;
  updated_at: string;
  username: string;
}

export interface Credits {
  balance: number;
  created_at: string;
  id: number;
  updated_at: string;
}

export interface InitiatePaymentInput {
  amount: number;
}

export interface VerifyPaymentInput {
  reference: string;
}

export interface InitiatePaymentResponse {
  amount: number;
  authorization_url: string;
  reference: string;
  transaction: Transaction;
}

export interface VerifyPaymentResponse {
  credit_points: CreditPoints;
  transaction: Transaction;
}

export interface Transaction {
  amount: number;
  created_at: string;
  id: number;
  reference: string;
  status: string;
  transaction_type: string;
}

export interface CreditPoints {
  balance: number;
  created_at: string;
  id: number;
  updated_at: string;
}
