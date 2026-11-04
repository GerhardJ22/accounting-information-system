export interface Customer {
  id: number;
  userId: number;
  name: string;
  email: string | null;
  contactNumber: string | null;
  address: string | null;
}

export interface CreateCustomerInput {
  name: string;
  email?: string | null;
  contactNumber?: string | null;
  address?: string | null;
}

export interface CustomerApiResponse {
  success: true;
  data: Customer[];
}

export interface CreateCustomerApiResponse {
  success: true;
  data: Customer;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
}
