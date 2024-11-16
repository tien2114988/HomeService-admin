export interface AuthModel {
  api_token: string;
  refresh_token?: string;
}
export interface UserModel {
  id: number;
  username: string;
  password: string | undefined;
  email: string;
  firstname: string;
  lastname: string;
  fullname?: string;
  province?: string;
  district?: string;
  country?: string;

  gender: "male" | "female";
  phone?: string;
}
