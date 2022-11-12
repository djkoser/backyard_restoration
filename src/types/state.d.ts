export interface UserInfoState {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  growingSeasonLength: number;
  firstGdd45: string;
  lastGdd45: string;
  hardinessZone: string;
  loading: boolean;
  failed: boolean;
}

interface ManagementMethod {
  methodId: string;
  weedCommonName: string;
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
}

export interface ManagementMethodState {
  userMethods: ManagementMethod[];
  loading: boolean;
  failed: boolean;
}

export interface UserNative {
  nativeId: string;
  commonName: string;
  botanicalName: string;
  moisture: string;
  sun: string;
  height: string;
  bloomTime: string;
  src: string;
  projectNotes: string;
}

export interface UserNativesState {
  userNatives: UserNative[];
  loading: boolean;
  failed: boolean;
}

export interface Observation {
  observation_date: string;
  temperature: number;
}
export interface WeatherAPIReturn {
  TMIN: Observation[];
  TMAX: Observation[];
}

export interface LeadLagObject {
  lagNonZeroGDDP?: number;
  lagZeroGDDP?: number;
  leadNonZeroGDDP?: number;
  leadZeroGDDP?: number;
}

export interface TMINMAXMapValue extends LeadLagObject {
  TMIN?: number;
  TMAX?: number;
  GDD?: number;
}

export type TMINMAXMap = Map<string, TMINMAXMapValue>;
