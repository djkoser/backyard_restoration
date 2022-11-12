import { ManagementMethod } from './state';

export interface AddedNativesProps {
  searchAdded: boolean;
  setSearchAdded: (boolean) => void;
}

export interface NativeAddedProps {
  key: string;
  nativeId: string;
  botanicalName: string;
  commonName: string;
  moisture: string;
  sun: string;
  height: string;
  src: string;
  projectNotes: string;
}

export interface NativeSearchBarProps extends AddedNativesProps {
  setSearchResults: (data: UserNative[]) => void;
  setLoadingParent: (boolean: boolean) => void;
}

export interface NativeThumbnailProps {
  nativeId: string;
  commonName: string;
  botanicalName: string;
  moisture: string;
  sun: string;
  height: string;
  bloomTime: string;
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
  commonName: string;
  botanicalName: string;
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
  firstGdd45: string;
  lastGdd45: string;
  margin: { left: number; right: number; top: number; bottom: number };
  userMethods: ManagementMethod[];
}

export interface WeatherLoaderProps {
  noText: boolean;
}
