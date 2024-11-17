export interface UserModel {
  id: string;
  name: string;
  email: string;
  avatar: string;
  balance: string;
  dob: Date;
  phoneNumber?: string;
  reputationPoint?: string;
  status: 'ACTIVE' | 'PROHIBITIVE';
  role: 'CUSTOMER' | 'FREELANCER';
  gender: 'MALE' | 'FEMALE';
}

export interface ApiResponse<T> {
  returnCode: string;
  message: string;
  items: T;
}
