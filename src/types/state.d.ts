export interface UserPayload {
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  street?: string | null;
  city?: string | null;
  state?: string | null;
  zipcode?: string | null;
  growingSeasonLength: number;
  firstGdd45: string;
  lastGdd45: string;
  hardinessZone: string;
}

interface FailedLoading {
  loading: boolean;
  failed: boolean;
}

export type UserState = UserPayload & FailedLoading;

export interface UserNativePayload {
  nativePlants: UserNativeStateVersion[];
}

export interface UserNativeStateVersion {
  id: string;
  nativeId: string;
  botanicalName: string;
  commonName: string;
  moisture: string;
  sun: string;
  height: string;
  bloomTime: string;
  src: string;
  projectNotes: string;
}

export type UserNativeState = UserNativePlantPayload & FailedLoading;

export interface UserMethodPayload {
  userMethods: UserManagementMethodStateVersion[];
}
export interface UserManagementMethodStateVersion {
  id: string;
  methodId: string;
  name: string;
  description: string;
  january: number;
  february: number;
  march: number;
  april: number;
  may: number;
  june: number;
  july: number;
  august: number;
  september: number;
  october: number;
  november: number;
  december: number;
  commonName: string;
  projectNotes: string;
}

export type UserMethodState = UserMethodsPayload & FailedLoading;
