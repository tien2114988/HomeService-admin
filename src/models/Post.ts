import { AddressModel, UserModel } from './User';
import { WorkModel } from './Work';

export interface PostModel {
  id: string;
  createdAt: number[]; // [Year, Month, Day, Hour, Minute, Second, Millisecond]
  updatedAt: number[];
  customerNote: string;
  startTime: string; // HH:mm:ss
  duration: number; // Duration in minutes
  price: number;
  status: string; // e.g., "INITIAL"
  paymentType: string; // e.g., "QR"
  totalFreelancer: number;
  numOfFreelancer: number;
  packageName: string; // e.g., "_1MONTH"
  totalWorkDay: number;
  numOfWorkedDay: number;
  chooseFreelancer: boolean;
  customer: UserModel;
  workSchedules: WorkScheduleModel[];
  work: WorkModel;
  houseCleaning: HouseCleaningModel | null;
  babysitting: BabysittingModel | null;
  payment: boolean;
  address: AddressModel;
  freelancerTakePosts: TakePostModel[];
}

export interface TakePostModel {
  id: string;
  status: string;
  freelancer: UserModel;
  post: PostModel;
  createdAt: number[]; // [Year, Month, Day, Hour, Minute, Second, Millisecond]
  updatedAt: number[];
}

export interface WorkScheduleModel {
  id: string;
  date: number[]; // [Year, Month, Day]
  status: string; // e.g., "INITIAL"
}

export interface HouseCleaningModel {
  area: number;
}

export interface BabysittingModel {
  numOfBaby: number;
  babies: BabyModel[];
}

export interface BabyModel {
  age: number;
}
