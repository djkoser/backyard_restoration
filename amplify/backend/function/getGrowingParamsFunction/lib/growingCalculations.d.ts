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
