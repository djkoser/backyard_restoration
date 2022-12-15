export interface UserInfoState {
  user_id: number;
  email: string;
  first_name: string;
  last_name: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  growing_season_length: number;
  first_gdd35: string;
  last_gdd35: string;
  hardiness_zone: string;
  loading: boolean;
  failed: boolean;
}

interface ManagementMethod {
  method_id: string;
  common_name: string;
  name: string;
  description: string;
  january: '0' | '1';
  february: '0' | '1';
  march: '0' | '1';
  april: '0' | '1';
  may: '0' | '1';
  june: '0' | '1';
  july: '0' | '1';
  august: '0' | '1';
  september: '0' | '1';
  october: '0' | '1';
  november: '0' | '1';
  december: '0' | '1';
}

export interface ManagementMethodState {
  userMethods: ManagementMethod[];
  loading: boolean;
  failed: boolean;
}

export interface UserNative {
  native_id: string;
  common_name: string;
  botanical_name: string;
  moisture: string;
  sun: string;
  height: string;
  bloom_time: string;
  src: string;
  project_notes: string;
}

export interface UserNativesState {
  userNatives: UserNative[];
  loading: boolean;
  failed: boolean;
}
