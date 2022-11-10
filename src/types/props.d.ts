import { ManagementMethod } from './state';

export interface AddedNativesProps {
  searchAdded: boolean;
  setSearchAdded: (boolean) => void;
}

export interface NativeAddedProps {
  key: string;
  native_id: string;
  botanical_name: string;
  common_name: string;
  moisture: string;
  sun: string;
  height: string;
  src: string;
  project_notes: string;
}

export interface NativeSearchBarProps extends AddedNativesProps {
  setSearchResults: (data: UserNative[]) => void;
  setLoadingParent: (boolean: boolean) => void;
}

export interface NativeThumbnailProps {
  native_id: string;
  common_name: string;
  botanical_name: string;
  moisture: string;
  sun: string;
  height: string;
  bloom_time: string;
  src: string;
}

export interface NavProps {
  invertColors: boolean;
}

export interface SwitchMakerProps {
  weedMethod: ManagementMethod;
}

export interface Weed {
  weed_id: string;
  common_name: string;
  botanical_name: string;
  annual_perennial_biennial: string;
  veg_type: string;
  description: string;
  src: string;
}

export interface ThumbnailProps {
  weedInfo: Weed;
}

export interface TimelineProps {
  width: number;
  height: number;
  first_gdd35: string;
  last_gdd35: string;
  margin: { left: number; right: number; top: number; bottom: number };
  userMethods: ManagementMethod[];
}

export interface WeatherLoaderProps {
  noText: boolean;
}
