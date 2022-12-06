import type { ManagementMethodStateVersion, UserNativeStateVersion } from './';

export interface AddedNativesProps {
  searchAdded: boolean;
  setSearchAdded: (boolean) => void;
}

export type NativeAddedProps = Omit<
  UserNativeStateVersion,
  'nativeId' | 'bloomTime'
>;
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
  weedMethod: ManagementMethodStateVersion;
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
  userMethods: UserManagementMethodStateVersion[];
}

export interface WeatherLoaderProps {
  noText: boolean;
}
