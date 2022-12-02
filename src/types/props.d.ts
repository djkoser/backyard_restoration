import { ManagementMethodState } from './';

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
  weedMethod: ManagementMethodState;
}

export interface Weed {
  weedId: string;
  vegetationType: string;
  commonName: string;
  botanicalName: string;
  annualPerennialBiennial: string;
  description: string;
  managementMethods?: ModelManagementMethodConnection | null;
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
  userMethods: ManagementMethodState[];
}

export interface WeatherLoaderProps {
  noText: boolean;
}
