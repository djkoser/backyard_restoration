const { GOOGLE_API_KEY, NOAA_TOKEN, NOAA_TOKEN_BACKUP } = process.env;
import { Observation, TMINMAXMap, WeatherAPIReturn } from '../src/types';
import fetch from 'node-fetch';
// import { readFileSync } from 'fs';
// import { join } from 'path';
export class GrowingCalculations {
  private zipcode: string;
  private street: string;
  private city: string;
  private state: string;
  private currentDate: Date;
  private tminMaxMap?: TMINMAXMap;
  // The number of km to increase the bounding box by with each expanding area search for weather towers with data
  private boundingBoxGrowFactor = 5;
  // Total number of years of temperature data to work with
  private numberOfYearsToRetrieve = 15;
  // The side of the bonding box (in km) surrounding the user's location in which to search for weather stations
  private boundingBoxSide = 10;
  // The number of days to look before and after a date to determine if the date represents a season start or end
  private leadingLaggingDays = 40;
  // The minimum percentage of leading days with non-zero (season start) or zero (season end) growing degree days in order to qualify it as a season start/end.
  private minimumSeasonStartQualifierPercentage = 0.90;
  // The minimum percentage of leading days with non-zero (season start) or zero (season end) growing degree days in order to qualify it as a season start/end.
  private minimumSeasonEndQualifierPercentage = 0.90;
  // The maximum percentage of lagging days with zero (season start) or non-zero (season end) growing degree days in order to qualify it as a season start/end.
  private maximumLagQualifierPercentage = 0.20;
  /**
   * 
   * @param zipcode The User's zipcode
   * @param street The User's street
   * @param city The user's city
   * @param state The user's state
   */
  constructor(zipcode: string, street: string, city: string, state: string) {
    this.zipcode = zipcode;
    this.street = street;
    this.city = city;
    this.state = state;
    this.currentDate = new Date();
  }
  /** An initializer that makes all necessary API calls and calculates all requisite growing paramters pertaining to the user's location*/
  async calculateGrowingParams() {
    // Get TMIN and TMAX data from the weather station closest to the user's location
    let { TMIN, TMAX } = await this.retrieveAPIData();
    // writeFileSync(join(__dirname, 'TMIN.json'), JSON.stringify(TMIN));
    // writeFileSync(join(__dirname, 'TMAX.json'), JSON.stringify(TMAX));
    // let TMIN = JSON.parse(readFileSync(join(__dirname, 'TMIN.json')).toString());
    // let TMAX = JSON.parse(readFileSync(join(__dirname, 'TMAX.json')).toString());
    // Clean the data
    TMAX = this.selectHighestDuplicates(TMAX);
    TMIN = this.selectLowestDuplicates(TMIN);
    this.sortTMINTMAX(TMIN, TMAX);
    // Create an observation_date -> {TMIN, TMAX, GDD } map using filtered for season starts and ends calculation
    this.mapTMINTMAX(TMIN, TMAX);
    const TMINAvg = this.getLowestTemperature(TMIN);

    const seasonStarts = this.removeOutliersFromDates(this.gdd45SpringTransitions());

    const seasonEnds = this.removeOutliersFromDates(this.gdd45WinterTransitions());

    const first_gdd45 = this.avgDateString(seasonStarts);
    const last_gdd45 = this.avgDateString(seasonEnds);
    return {
      hardiness_zone: this.hardinessZoneCalculator(TMINAvg),
      first_gdd45,
      last_gdd45,
      growing_season_length: Math.round(this.averageSeasonLength(last_gdd45, first_gdd45))
    };
  }

  private removeOutliersFromDates(dates: Date[]) {
    const values = dates.map((dateString) => new Date(dateString).getTime());
    values.sort((a, b) => a - b);
    /* Then find a generous IQR. This is generous because if (values.length / 4) 
     * is not an int, then really you should average the two elements on either 
     * side to find q1.
     */
    const q1 = values[Math.floor((values.length / 4))];
    // Likewise for q3. 
    const q3 = values[Math.ceil((values.length * (3 / 4)))];
    // Then find min and max values
    const maxValue = q3;
    const minValue = q1;
    // Then filter anything beyond or beneath these values.
    return values.filter((x) => {
      return (x < maxValue) && (x > minValue);
    }).map(number => new Date(number));

  }
  private gdd45SpringTransitions(): Date[] {

    const gdd45SpringTransitionDates: Date[] = [];
    if (this.tminMaxMap) this.tminMaxMap.forEach((value, key) => {
      const { lagNonZeroGDDP, leadNonZeroGDDP, GDD } = value;
      // spring transitions are defined as days of positive GDD in which the percentage of lagging non-zero growing degree days is less than the maximumSeasonStartQualifierPercentage and the percentage of leading non-zero growing degree days is greater than the minimumSeasonStartQualifierPercentage;
      if ((lagNonZeroGDDP !== undefined) && (leadNonZeroGDDP !== undefined) && (GDD !== undefined) && (GDD > 0) && (lagNonZeroGDDP <= this.maximumLagQualifierPercentage) && (leadNonZeroGDDP >= this.minimumSeasonStartQualifierPercentage)) {
        gdd45SpringTransitionDates.push(new Date(key));
      }
    });
    gdd45SpringTransitionDates.forEach((date) => date.setFullYear(this.currentDate.getFullYear()));
    return gdd45SpringTransitionDates;
  }
  private gdd45WinterTransitions(): Date[] {

    const gdd45WinterTransitions: Date[] = [];
    if (this.tminMaxMap) this.tminMaxMap.forEach((value, key) => {
      const { lagZeroGDDP, leadZeroGDDP, GDD } = value;
      // winter transitions are defined as days of 0 GDD in which the percentage of lagging zero growing degree days is less than the maximumSeasonStartQualifierPercentage and the percentage of leading zero growing degree days is greater than the minimumSeasonStartQualifierPercentage;
      if ((lagZeroGDDP !== undefined) && (leadZeroGDDP !== undefined) && (GDD !== undefined) && (GDD > 0) && (lagZeroGDDP <= this.maximumLagQualifierPercentage) && (leadZeroGDDP >= this.minimumSeasonEndQualifierPercentage)) {
        gdd45WinterTransitions.push(new Date(key));
      }
    });
    gdd45WinterTransitions.forEach((date) => date.setFullYear(this.currentDate.getFullYear()));
    return gdd45WinterTransitions;
  }


  /** Determines the average lowest annual temperature */
  private getLowestTemperature(TMIN: Observation[]): number {
    return TMIN.reduce((lowestTemp, tminObs: Observation) => tminObs.temperature < lowestTemp ? tminObs.temperature : lowestTemp, 9999);
  }

  /** Return the GDD values from the leading and lagging observation dates
   * @param observationDate the date in which to determine leading and lagging GDD values
  */
  private getLeadAndLagGDDs(observationDate: string): { leadGDDs: number[], lagGDDs: number[] } {
    const currentLeadDate = new Date(observationDate);
    const currentLagDate = new Date(observationDate);
    // generate observation dates to search for
    const leadingObservationDates: string[] = [];
    const laggingObservationDates: string[] = [];
    for (let index = this.leadingLaggingDays; index > 0; index--) {
      currentLeadDate.setDate(currentLeadDate.getDate() + 1);
      currentLagDate.setDate(currentLagDate.getDate() - 1);

      leadingObservationDates.push(this.date2String(currentLeadDate));
      laggingObservationDates.push(this.date2String(currentLagDate));
    }

    return {
      leadGDDs: leadingObservationDates.map((obsDate) => {
        const mapValue = this.tminMaxMap ? this.tminMaxMap.get(obsDate) : undefined;
        return mapValue ? mapValue.GDD : undefined;
      }).filter((gdd) => typeof gdd === 'number') as number[],

      lagGDDs: laggingObservationDates.map((obsDate) => {
        const mapValue = this.tminMaxMap ? this.tminMaxMap.get(obsDate) : undefined;
        return mapValue ? mapValue.GDD : undefined;
      }).filter((gdd) => typeof gdd === 'number') as number[]
    };

  }

  /** Maps sorted TMIN and TMAX objects to observation_date map keys, discarding any observation dates that are missing either TMIN or TMAX, calculates the GDD for that day and determines the percentage of leading and lagging days with and without non-zero GDD 
   * @param TMIN Minimum temperature data returned from the api calls
   * @param TMAX Maximum temperature data return from the api calls
  */
  private mapTMINTMAX(TMIN: Observation[], TMAX: Observation[]): void {
    this.tminMaxMap = new Map();
    TMIN.forEach(({ temperature, observation_date }) => {
      const observationDateParsed = observation_date.match(/\d\d\d\d-\d\d-\d\d/)?.[0] || '';
      if (this.tminMaxMap) this.tminMaxMap.set(observationDateParsed, { TMIN: temperature });
    }
    );
    TMAX.forEach(({ temperature, observation_date }) => {
      const observationDateParsed = observation_date.match(/\d\d\d\d-\d\d-\d\d/)?.[0] || '';
      if (this.tminMaxMap && this.tminMaxMap.has(observationDateParsed)) {
        const existing = this.tminMaxMap.get(observationDateParsed) as { TMIN: number, TMAX?: number, GDD?: number };
        existing.TMAX = temperature;
        existing.GDD = this.calculateGDD45(existing.TMAX, existing.TMIN);
      }
    });
    if (this.tminMaxMap)
      this.tminMaxMap.forEach((value, key) => {
        const { lagGDDs, leadGDDs } = this.getLeadAndLagGDDs(key);
        value.lagNonZeroGDDP = lagGDDs.length ? lagGDDs.reduce((count, gdd) => gdd > 0 ? count + 1 : count, 0) / lagGDDs.length : undefined;
        value.lagZeroGDDP = lagGDDs.length ? lagGDDs.reduce((count, gdd) => gdd <= 0 ? count + 1 : count, 0) / lagGDDs.length : undefined;
        value.leadNonZeroGDDP = leadGDDs.length ? leadGDDs.reduce((count, gdd) => gdd > 0 ? count + 1 : count, 0) / leadGDDs.length : undefined;
        value.leadZeroGDDP = leadGDDs.length ? leadGDDs.reduce((count, gdd) => gdd <= 0 ? count + 1 : count, 0) / leadGDDs.length : undefined;
      });
  }

  /** Sorts TMIN and TMAX data ascending by date */
  private sortTMINTMAX(TMIN: Observation[], TMAX: Observation[]) {
    TMAX.sort((tempObjectA, tempObjectB) =>
      new Date(tempObjectA.observation_date).getTime() - new Date(tempObjectB.observation_date).getTime()
    );
    TMIN.sort((tempObjectA, tempObjectB) =>
      new Date(tempObjectA.observation_date).getTime() - new Date(tempObjectB.observation_date).getTime()
    );

  }
  /** Utility function to calculate GDD45 
   * @param tmax - maximum temperature for that day
   * @param tmin - minimum temperature for that day
  */
  private calculateGDD45(tmax: number, tmin: number): number {
    return ((tmax + tmin) / 2) - 45;
  }
  /** Gets TMIN and TMAX data from the closest weather stations relative to the user's location  
   * 
  */
  private async retrieveAPIData(): Promise<WeatherAPIReturn> {
    // Get lat and long from Google Maps API
    const googleResult = await this.convertAddressToCoordinate();
    const googleResults = googleResult.results?.[0]?.geometry?.location;
    if (googleResults === undefined) throw new Error('retrieveAPIData: lat and lng could not be obtained from the user\'s address via Google Maps');
    const { lat, lng } = googleResults;
    let searchHalfSide = this.boundingBoxSide / 2;
    let coordinateArray = this.boundingBox(lat, lng, searchHalfSide);
    let coordinateString = coordinateArray.join(',');
    // Expand the half side of the bounding box by the boundingBoxGrowFactor until data is found.
    let apiOutputs = await this.returnResultsFromFirstStationWithData(coordinateString);
    while (!apiOutputs) {
      searchHalfSide += this.boundingBoxGrowFactor / 2;
      coordinateArray = this.boundingBox(lat, lng, searchHalfSide);
      coordinateString = coordinateArray.join(',');
      apiOutputs = await this.returnResultsFromFirstStationWithData(coordinateString);
      await this.delay(300);
    }
    return apiOutputs.reduce((apiOutputAcc, currentOutput) => {
      return { TMIN: [...apiOutputAcc.TMIN, ...currentOutput.TMIN], TMAX: [...apiOutputAcc.TMAX, ...currentOutput.TMAX] };
    }, { TMIN: [], TMAX: [] }) as WeatherAPIReturn;
  }
  /** Get weather data for the user's location over the prescribed timefrom from NOAA
   * @param endDate string in YYYY-MM-DD format representing the end timeframe of the weather inquiry
   * @param startDate string in YYYY-MM-DD format representing the start timeframe of the weather data query
   * @param stationID ID of the station to retrieve data from
    */
  private async getTMINandTMAXFromNOAA(endDate: string, startDate: string, stationID: string) {
    try {



      let response = await fetch(`https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&datatypeid=TMIN&datatypeid=TMAX&units=standard&limit=1000&startdate=${startDate}&enddate=${endDate}&stationid=${stationID}&includemetadata=false`, { method: 'get', headers: { token: NOAA_TOKEN as string } });

      if (response.status === 429) {
        console.warn('Exceeded query limit, using backup token');
        response = await fetch(`https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&datatypeid=TMIN&datatypeid=TMAX&units=standard&limit=1000&startdate=${startDate}&enddate=${endDate}&stationid=${stationID}&includemetadata=false`, { method: 'get', headers: { token: NOAA_TOKEN_BACKUP as string } });
      }
      const data: {
        results: [{ date: string, value: number, datatype: string }]
      } = await response.json();
      const TMAX: Observation[] = [];
      const TMIN: Observation[] = [];
      if (typeof data?.results?.forEach === 'function') data.results.forEach((el) => {
        if (el.datatype.toLowerCase() === 'tmin') {
          TMIN.push({ temperature: el.value, observation_date: el.date });
        } else if (el.datatype.toLocaleLowerCase() === 'tmax') {
          TMAX.push({ temperature: el.value, observation_date: el.date });
        }
      }
      );
      return { TMIN, TMAX };
    } catch (err) {
      console.warn(`Unable to get temperature data for start date: ${startDate} and end date: ${endDate} due to the following error: ${err instanceof Error ? err.message : JSON.stringify(err)}, proceeding...`);
      return { TMIN: [], TMAX: [] };
    }

  }

  /** Gets Stations within a bounding box around the user's location, and returns historical data from the first suitable location or undefined.
   * @param coordinateString WGS84 coordinate string representing the bounding box around the user's location location
  */
  private async returnResultsFromFirstStationWithData(coordinateString: string) {

    // Initialize the search end date as the 31st of December last year,  and the start date as the 31st of December the year before last in order to keep time within an even 1-year window (none of the current year will be considered, even if the user is querying on the 31st of December )
    let ed = new Date(this.currentDate.getFullYear() - 1, 12, 0);
    let edString = this.date2String(ed);
    let sd = this.less1Year(new Date(this.currentDate.getFullYear() - 1, 12, 0));
    let sdString = this.date2String(sd);

    // Pull station IDs within the bounding box around the user's location
    const stationList = await this.getStationList(coordinateString);
    // Only proceed if there are stations in this bounding box, otherwise exit to get a new bounding box on next call
    if (stationList.results) {
      // query the stations in the current bounding box for TMIN and TMAX data, getting results from the first station with data
      for (let stationIndex = 0; stationIndex < stationList.results.length; stationIndex++) {
        if (!stationList.results?.[stationIndex]?.id) {
          console.warn(`returnResultsFromFirstStationWithData: station at index ${stationIndex} does not contain an ID, continuing to the next ->`);
          continue;
        }
        const tempData = await this.getTMINandTMAXFromNOAA(edString, sdString, stationList.results[stationIndex].id);
        // Get the prescribed number of years of historical temperature data if this station contains it, if not, proceed to the next station in the bounding box
        if (tempData.TMAX.length && tempData.TMIN.length) {
          await this.delay(300);
          // Run the query, reducing the year value each time to obtain each year of historical data,
          // Must run seperate queries in a delayed fashion in order to get around NOAA 1-year Data limitation and rate limitations
          const promises: Promise<WeatherAPIReturn>[] = [];
          for (let yearIndex = 0; yearIndex < this.numberOfYearsToRetrieve; yearIndex++) {
            promises.push(this.getTMINandTMAXFromNOAA(edString, sdString, stationList.results[stationIndex].id));
            sd = this.less1Year(sd);
            ed = this.less1Year(ed);
            ed.setDate(ed.getDate() - 1);
            edString = this.date2String(ed);
            sdString = this.date2String(sd);
            await this.delay(300);
          }
          return Promise.all(promises);

        }
      }
    }
  }

  /**
   * Filter out the lower TMAX values (if multiple present on same day) out of the data if present
   * @param TMAX TMAX data returned from the API calls
   */
  private selectHighestDuplicates(TMAX: { observation_date: string, temperature: number }[]): Observation[] {
    const observationDateMap: { [obsDate: string]: number } = {};
    TMAX.forEach(obsTmax => {
      const { observation_date, temperature } = obsTmax;
      if (observationDateMap[observation_date] !== undefined) {
        const existing = observationDateMap[observation_date];
        if (temperature > existing) {
          observationDateMap[observation_date] = temperature;
        }
      } else {
        observationDateMap[observation_date] = temperature;
      }
    });
    // eslint-disable-next-line @typescript-eslint/naming-convention
    return Object.entries(observationDateMap).map(([observation_date, temperature]) => { return { observation_date, temperature }; });
  }


  /**
   * Filter out the the higher TMIN values (if multiple present on same day) out of the data if present
   * @param TMIN TMIN data returned from the API calls

   */
  private selectLowestDuplicates(TMIN: { observation_date: string, temperature: number }[]) {
    const observationDateMap: { [obsDate: string]: number } = {};
    TMIN.forEach(obsTmin => {
      const { observation_date, temperature } = obsTmin;
      if (observationDateMap[observation_date] !== undefined) {
        const existing = observationDateMap[observation_date];
        if (temperature < existing) {
          observationDateMap[observation_date] = temperature;
        }
      } else {
        observationDateMap[observation_date] = temperature;
      }
    });
    // eslint-disable-next-line @typescript-eslint/naming-convention
    return Object.entries(observationDateMap).map(([observation_date, temperature]) => { return { observation_date, temperature }; });
  }

  /** Get the user's location coordinates via Google maps */
  private async convertAddressToCoordinate(): Promise<{ results: [{ geometry: { location: { lat: number; lng: number; }; }; }]; }> {

    return (await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
      this.street + '+' + this.city + '+' + this.state + '+' + this.zipcode
    )}&key=${GOOGLE_API_KEY}`, { method: 'get' })).json();
  }

  /** Get the list of stations within a prescribed bounding box 
   * @param boundingBox a string representing the box from which to pull towers
  */
  private async getStationList(boundingBox: string): Promise<{ results: [{ id: string }] }> {
    let response = await fetch(`https://www.ncdc.noaa.gov/cdo-web/api/v2/stations?extent=${boundingBox}&dataset=GHCND&datatypeid=TMIN&datatypeid=TMAX&limit=1000`, { headers: { token: NOAA_TOKEN as string }, method: 'get' });
    if (response.status === 429) {
      console.warn('exceeded query limit, using backup token');
      response = await fetch(`https://www.ncdc.noaa.gov/cdo-web/api/v2/stations?extent=${boundingBox}&dataset=GHCND&datatypeid=TMIN&datatypeid=TMAX&limit=1000`, { headers: { token: NOAA_TOKEN_BACKUP as string }, method: 'get' });
    }
    return response.json();
  }

  /** Calculate the hardiness revealed by the maximum and minimum temperature data    
   * @param averageTMIN the average minimum yearly temperature
   * @param averageTMAX the average maximum yearly temperature
  */
  private hardinessZoneCalculator(averageTMIN: number): string {

    const zoneMap = [
      { low: -60, high: -55, zone: '1a' },
      { low: -55, high: -50, zone: '1b' },
      { low: -50, high: -45, zone: '2a' },
      { low: -45, high: -40, zone: '2b' },
      { low: -40, high: -35, zone: '3a' },
      { low: -35, high: -30, zone: '3b' },
      { low: -30, high: -25, zone: '4a' },
      { low: -25, high: -20, zone: '4b' },
      { low: -20, high: -15, zone: '5a' },
      { low: -15, high: -10, zone: '5b' },
      { low: -10, high: -5, zone: '6a' },
      { low: -5, high: 0, zone: '6b' },
      { low: 0, high: 5, zone: '7a' },
      { low: 5, high: 10, zone: '7b' },
      { low: 10, high: 15, zone: '8a' },
      { low: 15, high: 20, zone: '8b' },
      { low: 20, high: 25, zone: '9a' },
      { low: 25, high: 30, zone: '9b' },
      { low: 30, high: 35, zone: '10a' },
      { low: 35, high: 40, zone: '10b' },
      { low: 40, high: 45, zone: '11a' },
      { low: 45, high: 50, zone: '11b' },
      { low: 50, high: 55, zone: '12a' },
      { low: 55, high: 60, zone: '12b' },
      { low: 60, high: 65, zone: '13a' },
      { low: 65, high: 70, zone: '13b' }
    ] as const;
    for (let i = 0; i < zoneMap.length; i++) {
      if (averageTMIN >= zoneMap[i].low && averageTMIN <= zoneMap[i].high) {
        return zoneMap[i].zone;
      }
    }
    return '';
  }

  /** Converts degrees to radians */
  private deg2rad(degrees: number): number {
    return (Math.PI * degrees) / 180.0;
  }

  /** converts radians to degrees */
  private rad2deg(radians: number): number {
    return (180.0 * radians) / Math.PI;
  }

  /** Determines the Earth's Radius at a given latitude according to WGS84 ellipsoid (what Google Maps uses)
   * 
   * @param lat input latitude at which to determin the radius of the earth
   */
  private WGS84EarthRadius(lat: number) {
    // Semi - axes of WGS - 84 geoidal reference # Major semiaxis[m]
    const WGS84_a = 6378137.0;
    const WGS84_b = 6356752.3;
    // # http://en.wikipedia.org/wiki/Earth_radius
    const An = WGS84_a * WGS84_a * Math.cos(lat);
    const Bn = WGS84_b * WGS84_b * Math.sin(lat);
    const Ad = WGS84_a * Math.cos(lat);
    const Bd = WGS84_b * Math.sin(lat);
    return Math.sqrt((An * An + Bn * Bn) / (Ad * Ad + Bd * Bd));
  }

  /**Creates a bounding box from from a lat/long coordinate -> will be used for gathering a list of weather stations surrounding the user's lat-long -> from stack overflow, courtesy of Federico A Rampnoni (converted by me from Python). This assumes assumes local approximation of the Earth surface as a sphere with a radius given by WGS84. The default half side  is set high on purpose due to many stations not making data available on API
   * 
   * @param latitudeInDegrees The longitude at the user's location
   * @param longitudeInDegrees The latitude at the user's location
   * @param halfSideInKm The number of kilometers representing half the side of the bounding box -> set high due to many stations keeping data from api
   */
  private boundingBox(latitudeInDegrees: number, longitudeInDegrees: number, halfSideInKm: number): [number, number, number, number] {
    const lat = this.deg2rad(latitudeInDegrees);
    const lon = this.deg2rad(longitudeInDegrees);
    const halfSide = 1000 * halfSideInKm;
    // # Radius of Earth at given latitude
    const radius = this.WGS84EarthRadius(lat);
    // # Radius of the parallel at given latitude
    const pradius = radius * Math.cos(lat);

    const latMin = lat - halfSide / radius;
    const latMax = lat + halfSide / radius;
    const lonMin = lon - halfSide / pradius;
    const lonMax = lon + halfSide / pradius;

    return [this.rad2deg(latMin), this.rad2deg(lonMin), this.rad2deg(latMax), this.rad2deg(lonMax)];
  }

  /** Stock promisified setTimeout for delaying calls to NOAA 
   * @param interval the delay period in ms
  */
  private delay(interval: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, interval));
  }

  /** Converts date object to yyyy-mm-dd format */
  private date2String(dateParam = new Date()): string {
    return `${dateParam.getFullYear()}-${('0' + (dateParam.getMonth() + 1)).slice(-2)}-${('0' + dateParam.getDate()).slice(
      -2
    )}`;
  }

  /** Subtracts one year from the passed-in date and returns a new date object */
  private less1Year(dateObject: Date) {
    return new Date(dateObject.setFullYear(dateObject.getFullYear() - 1));
  }

  /** Computes the average date from a list of dates and resturns it as YYYY-MM-DD
   * @param seasonStartsEnds an array of Date objects normalized to the current year
   */
  private avgDateString(seasonStartsEnds: Date[]): string {
    if (seasonStartsEnds.length) {
      // convert to milleseconds
      const datesAsMs = seasonStartsEnds.map((el) => el.getTime());
      // Sum and divide by normalized Dates' lengh creating a new date
      const averageDate = new Date(datesAsMs.reduce((prev, next) => prev + next) / seasonStartsEnds.length);
      return this.date2String(averageDate);
    } else {
      throw new Error('avgDateString: seasonStartsEnds must contian at least one Date');
    }
  }

  /** Compute the average season length given start dates and end dates */
  private averageSeasonLength(averageSeasonEndString: string, averageSeasonStartString: string) {
    return (new Date(averageSeasonEndString).getTime() - new Date(averageSeasonStartString).getTime()) / 1000 / 60 / 60 / 24;
  }

}

const tester = async () => {
  const test = await new GrowingCalculations('55912', '1500 9th St NW', 'Austin', 'Minnesota').calculateGrowingParams();
  console.log(test);

};

void tester();