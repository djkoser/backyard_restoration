import type { ManagementMethodStateVersion, UserNativeStateVersion } from './';
import type { PropsWithChildren } from 'react';

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
  src: string;
}

export interface ThumbnailProps {
  weedInfo: Weed;
}

export interface TimelineProps {
  width: number;
  height: number;
  margin: { left: number; right: number; top: number; bottom: number };
}

export interface WeatherLoaderProps extends PropsWithChildren {
  text?: string;
  loadingOverride?: boolean;
  invertColors?: boolean;
}
