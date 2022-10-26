
const { GOOGLE_API_KEY, NOAA_TOKEN } = process.env;
import axios from 'axios';
import axiosRetry from 'axios-retry';

export class GrowingCalculations {
  private zipcode: string;
  private street: string;
  private city: string;
  private state: string;
  private currentDate: Date;
  private numberOfYearsToRetrieve: number;
  private boundingBoxSide: number;
  private boundingBoxGrowFactor: number;
  private TMAX: { observation_date: string, temperature: number }[];
  private TMIN: { observation_date: string, temperature: number }[];
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
    this.numberOfYearsToRetrieve = 10;
    // Notated in Km
    this.boundingBoxSide = 1;
    // Number of Km to grow the box with each failed attempt to find towers;
    this.boundingBoxGrowFactor = 5;
    this.TMAX = [];
    this.TMIN = [];

    this.configureAxiosRetry();
  }
  /** An initializer that makes all necessary API calls and calculates all requisite growing paramters pertaining to the user's location*/
  async calculateGrowingParams() {
    // Get TMIN and TMAX data from the weather station closest to the user's location
    await this.retrieveAPIData();
    this.selectHighestDuplicates();
    this.selectLowestDuplicates();
    const TMINAvg = this.TMIN.reduce((acc, tminObj) => acc + tminObj.temperature, 0) / this.TMIN.length;
    const TMAXAvg = this.TMAX.reduce((acc, tminObj) => acc + tminObj.temperature, 0) / this.TMAX.length;
    const seasonStarts = this.gdd35SpringTransitions();
    const seasonEnds = this.gdd35WinterTransitions();
    return {
      hardiness_zone: this.hardinessZoneCalculator(TMINAvg, TMAXAvg),
      first_gdd35: this.avgDateString(seasonStarts),
      last_gdd35: this.avgDateString(seasonEnds),
      growing_season_length: Math.round(this.averageSeasonLength(seasonEnds, seasonStarts))
    };
  }

  private gdd35SpringTransitions(): Date[] { }
  private gdd35WinterTransitions(): Date[] { }

  /** Gets TMIN and TMAX data from the closest weather stations relative to the user's location  
   * 
  */
  private async retrieveAPIData() {
    try {
      // Get lat and long from Google Maps API
      const googleResult = await this.convertAddressToCoordinate();

      const googleResults = googleResult.data?.results?.[0]?.geometry?.location;
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
      }
      const { TMIN, TMAX } = apiOutputs.reduce((apiOutputAcc, currentOutput) => { return { TMIN: [...apiOutputAcc.TMIN, ...currentOutput.TMIN], TMAX: [...apiOutputAcc.TMAX, ...currentOutput.TMIN] }; }, { TMIN: [], TMAX: [] });
      this.TMIN = TMIN;
      this.TMAX = TMAX;
    } catch (err) {
      console.log(err);
    }
  }
  /** Get weather data for the user's location over the prescribed timefrom from NOAA
   * @param endDate string in YYYY-MM-DD format representing the end timeframe of the weather inquiry
   * @param startDate string in YYYY-MM-DD format representing the start timeframe of the weather data query
   * @param stationID ID of the station to retrieve data from
    */
  private async getTMINandTMAXFromNOAA(endDate: string, startDate: string, stationID: string) {
    return new Promise<{
      TMAX: { temperature: number, observation_date: string }[],
      TMIN: { temperature: number, observation_date: string }[]
    }>((resolve, reject) => {
      axios
        .get<{ results: { value: number, date: string, datatype: string }[] }>(
          `https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&datatypeid=TMAX&datatypeid=TMIN&units=standard&startdate=${startDate}&enddate=${endDate}&limit=1000&stationid=$${stationID}includemetadata=false`,
          { headers: { token: NOAA_TOKEN } }
        )
        .then((res) => {
          const TMAX: { temperature: number, observation_date: string }[] = [];
          const TMIN: { temperature: number, observation_date: string }[] = [];
          res.data.results.forEach((el) => {
            if (el.datatype === 'TMIN') {
              TMIN.push({ temperature: el.value, observation_date: el.date });
            } else if (el.datatype === 'TMAX') {
              TMAX.push({ temperature: el.value, observation_date: el.date });
            }
          }
          );
          resolve({ TMIN, TMAX });
        })
        .catch((err) => {
          reject(err);
        });
    });
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
    if (stationList.data.results) {
      // query the stations in the current bounding box for TMIN and TMAX data, getting results from the first station with data
      for (let i = 0; i < stationList.data.results.length; i++) {
        const tempData = await this.getTMINandTMAXFromNOAA(edString, sdString, stationList.data.results[i].id);
        // Get the prescribed number of years of historical temperature data if this station contains it, if not, proceed to the next station in the bounding box
        if (tempData.TMAX.length && tempData.TMIN.length) {
          // Run the query, reducing the year value each time to obtain each year of historical data,
          // Must run seperate queries in a delayed fashion in order to get around NOAA 1-year Data limitation and rate limitations
          const promises: ReturnType<typeof this.getTMINandTMAXFromNOAA>[] = [];
          for (let i = this.numberOfYearsToRetrieve; i > 0; i--) {
            promises.push(this.getTMINandTMAXFromNOAA(edString, sdString, stationList.data.results[i].id));
            sd = this.less1Year(sd);
            ed = this.less1Year(ed);
            edString = this.date2String(ed);
            sdString = this.date2String(sd);
            await this.delay(1000);
          }
          return Promise.all(promises);

        }
      }
    }
  }

  /**
   * Filter out the lower TMAX values (if multiple present on same day) out of the data if present
   */
  private selectHighestDuplicates() {
    const observationDateMap: { [obsDate: string]: number } = {};
    this.TMAX.forEach(tmax => {
      if (observationDateMap[tmax.observation_date] !== undefined) {
        const existing = observationDateMap[tmax.observation_date];
        if (tmax.temperature > existing) {
          observationDateMap[tmax.observation_date] = tmax.temperature;
        }
      } else {
        observationDateMap[tmax.observation_date] = tmax.temperature;
      }
    });
    // eslint-disable-next-line @typescript-eslint/naming-convention
    this.TMAX = Object.entries(observationDateMap).map(([observation_date, temperature]) => { return { observation_date, temperature }; });
  }


  /**
   * Filter out the the higher TMIN values (if multiple present on same day) out of the data if present
   */
  private selectLowestDuplicates() {
    const observationDateMap: { [obsDate: string]: number } = {};
    this.TMIN.forEach(tmin => {
      if (observationDateMap[tmin.observation_date] !== undefined) {
        const existing = observationDateMap[tmin.observation_date];
        if (tmin.temperature < existing) {
          observationDateMap[tmin.observation_date] = tmin.temperature;
        }
      } else {
        observationDateMap[tmin.observation_date] = tmin.temperature;
      }
    });
    // eslint-disable-next-line @typescript-eslint/naming-convention
    this.TMIN = Object.entries(observationDateMap).map(([observation_date, temperature]) => { return { observation_date, temperature }; });
  }

  /** Get the user's location coordinates via Google maps */
  private convertAddressToCoordinate() {
    return axios
      .get<{ results: [{ geometry: { location: { lat: number, lng: number } } }] }>(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
          this.street + '+' + this.city + '+' + this.state + '+' + this.zipcode
        )}&key=${GOOGLE_API_KEY}`);
  }

  /** Get the list of stations within a prescribed bounding box 
   * @param boundingBox a string representing the box from which to pull towers
   * @param edString a string in YYYY-MM-DD represengin the 
  */
  private getStationList(boundingBox: string) {
    return axios
      .get<{ results: [{ id: string }] }>(
        `https://www.ncdc.noaa.gov/cdo-web/api/v2/stations?extent=${boundingBox}&dataset=GHCND&datatypeid=TMIN&datatypeid=TMAX&limit=1000`,
        { headers: { token: NOAA_TOKEN } }
      );
  }

  /** Calculate the hardiness revealed by the maximum and minimum temperature data    
   * @param averageTMIN the average minimum yearly temperature
   * @param averageTMAX the average maximum yearly temperature
  */
  private hardinessZoneCalculator(averageTMIN: number, averageTMAX: number): string {
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
      if (averageTMIN >= zoneMap[i].low && averageTMAX <= zoneMap[i].high) {
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
    return dateParam.toISOString()?.match(/\d\d\d\d-\d\d-\d\d/)?.[0] as string;
  }

  /** Subtracts one year from the passed-in date and returns a new date object */
  private less1Year(dateObject: Date) {
    return new Date(dateObject.setFullYear(dateObject.getFullYear() - 1));
  }

  /** Configures axios for retry on exponitial delay */
  private configureAxiosRetry() {
    axiosRetry(axios, {
      retries: 10,
      retryDelay: axiosRetry.exponentialDelay,
      retryCondition: axiosRetry.isRetryableError
    });
  }

  /** Computes the average date from a list of dates and resturns it as YYYY-MM-DD
   * @param seasonStartsEnds an array of objects containing an obs_date key with a Date object key 
   */
  private avgDateString(seasonStartsEnds: Date[]): string {
    // normalize to current year
    const currentYear = new Date().getFullYear();
    const normalizedDates = seasonStartsEnds.map((el) => new Date(el.setFullYear(currentYear)));
    // convert to milleseconds
    const datesAsMs = normalizedDates.map((el) => el.getTime());
    // Sum and divide by normalized Dates' lengh creating a new date
    const averageDate = new Date(datesAsMs.reduce((prev, next) => prev + next) / normalizedDates.length);
    return averageDate.toISOString().substring(5, 10);
  }

  /** Compute the average season length given start dates and end dates */
  private averageSeasonLength(seasonEnds: Date[], seasonStarts: Date[]) {
    // normalize to current year
    const currentYear = new Date().getFullYear();
    const normalizedStarts = seasonStarts.map((el) => new Date(el.setFullYear(currentYear)));
    const normalizedEnds = seasonEnds.map((el) => new Date(el.setFullYear(currentYear)));

    // convert to milleseconds
    const startsMs = normalizedStarts.map((el => el.getTime()));
    const endsMs = normalizedEnds.map((el => el.getTime()));

    // Calculate the difference between start and end dates for each year
    const seasonLengthsDays = [];
    for (let i = 0; i < startsMs.length; i++) {
      seasonLengthsDays[i] = (endsMs[i] - startsMs[i]) / 1000 / 60 / 60 / 24;

    }
    // Calculate average season length
    return seasonLengthsDays.reduce((prev, next) => prev + next) / seasonLengthsDays.length;
  }

}
