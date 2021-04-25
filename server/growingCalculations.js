const { GOOGLE_API_KEY, NOAA_TOKEN } = process.env;
const axios = require('axios');
const axiosRetry = require('axios-retry');


module.exports = {
  getGrowingParams: async (zipcode, street, city, state, db) => {
    // @ts-ignore
    axiosRetry(axios, { retries: 50, retryDelay: axiosRetry.exponentialDelay, retryCondition: axiosRetry.isRetryableError });

    // Creates a bounding box from from a lat/long coordinate -> will be used for gathering a list of weather stations surrounding the user's lat-long -> from stack overflow, courtesy of Federico A Rampnoni (comverted by me from Python)
    // degrees to radians
    const deg2rad = (degrees) => {
      return Math.PI * degrees / 180.0
    }
    // # radians to degrees
    const rad2deg = (radians) => {
      return 180.0 * radians / Math.PI
    }

    // Semi - axes of WGS - 84 geoidal reference # Major semiaxis[m]
    const WGS84_a = 6378137.0
    const WGS84_b = 6356752.3

    // # Earth radius at a given latitude, according to the WGS - 84 ellipsoid[m]
    const WGS84EarthRadius = (lat) => {
      // # http://en.wikipedia.org/wiki/Earth_radius
      const An = WGS84_a * WGS84_a * Math.cos(lat)
      const Bn = WGS84_b * WGS84_b * Math.sin(lat)
      const Ad = WGS84_a * Math.cos(lat)
      const Bd = WGS84_b * Math.sin(lat)
      return Math.sqrt((An * An + Bn * Bn) / (Ad * Ad + Bd * Bd))
    }

    // # Bounding box surrounding the point at given coordinates,
    // # assuming local approximation of Earth surface as a sphere
    // # of radius given by WGS84
    // Default is set high on purpose due to many stations not making data available on API
    const boundingBox = (latitudeInDegrees, longitudeInDegrees, halfSideInKm) => {
      const lat = deg2rad(latitudeInDegrees)
      const lon = deg2rad(longitudeInDegrees)
      const halfSide = 1000 * halfSideInKm
      // # Radius of Earth at given latitude
      const radius = WGS84EarthRadius(lat)
      // # Radius of the parallel at given latitude
      const pradius = radius * Math.cos(lat)

      const latMin = lat - halfSide / radius
      const latMax = lat + halfSide / radius
      const lonMin = lon - halfSide / pradius
      const lonMax = lon + halfSide / pradius

      return [rad2deg(latMin), rad2deg(lonMin), rad2deg(latMax), rad2deg(lonMax)]
    }

    // function for delaying calls to NOAA
    const delay = interval => new Promise(resolve => setTimeout(resolve, interval))
    // Function designed to convert date into ISO formatted date without time data. 
    const date2String = (dateParam = new Date()) => {
      return dateParam.toISOString().match(/\d\d\d\d-\d\d-\d\d/)[0];
    }
    // subtracts one year from passed-in date and returns new date object
    const less1Date = (dateParam) => {
      return new Date(dateParam.setFullYear(dateParam.getFullYear() - 1));
    }

    // Initialize start and end dates for temperature queries to NOAA 
    let ed = new Date();
    ed = new Date(ed.getFullYear() - 1, 12, 0)
    let edString = ed.toISOString().match(/\d\d\d\d-\d\d-\d\d/)[0];
    let sd = new Date();
    sd = new Date(sd.getFullYear() - 1, 12, 0)
    sd = less1Date(sd);
    let sdString = date2String(sd);
    // Pulled-out GET request to NOAA in order to make code easier to read
    // Also added setTimeout to prevent too many requests per second to NOAA server when looping 
    const getDataFromNOAA = async (edString, sdString, stationList) => {
      // Initialize TMAX and TMIN arrays for growing zone and GDD calcualtion
      let TMAX = [];
      let TMIN = [];
      try {
        // @ts-ignore
        await axios.get(`https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&datatypeid=TMAX&datatypeid=TMIN&units=standard&startdate=${null}&enddate=${edString}&limit=1000&${stationList}includemetadata=false`, { headers: { token: NOAA_TOKEN } })
          .then(res => {
            res.data.results.forEach(el => el.datatype === "TMIN" ? TMIN.push({ value: el.value, date: el.date }) : TMAX.push({ value: el.value, date: el.date }));
          })
          .catch(err => { console.log(err) })
        return { TMAX, TMIN };
      } catch (err) { console.log(err) }
    }

    // Block of code used within pseudo for-loops, subtracts one year from sd and ed and uses this to getData from NOAA
    const forBlock = async () => {
      sd = less1Date(sd);
      ed = less1Date(ed);
      edString = date2String(ed);
      sdString = date2String(sd);
      // 
      await delay(1000)
    }

    const hardinessZoneCalculator = (TMINAvg) => {
      const zoneMap =
        [{ low: -60, high: -55, zone: "1a" },
        { low: -55, high: -50, zone: "1b" },
        { low: -50, high: -45, zone: "2a" },
        { low: -45, high: -40, zone: "2b" },
        { low: -40, high: -35, zone: "3a" },
        { low: -35, high: -30, zone: "3b" },
        { low: -30, high: -25, zone: "4a" },
        { low: -25, high: -20, zone: "4b" },
        { low: -20, high: -15, zone: "5a" },
        { low: -15, high: -10, zone: "5b" },
        { low: -10, high: -5, zone: "6a" },
        { low: -5, high: 0, zone: "6b" },
        { low: 0, high: 5, zone: "7a" },
        { low: 5, high: 10, zone: "7b" },
        { low: 10, high: 15, zone: "8a" },
        { low: 15, high: 20, zone: "8b" },
        { low: 20, high: 25, zone: "9a" },
        { low: 25, high: 30, zone: "9b" },
        { low: 30, high: 35, zone: "10a" },
        { low: 35, high: 40, zone: "10b" },
        { low: 40, high: 45, zone: "11a" },
        { low: 45, high: 50, zone: "11b" },
        { low: 50, high: 55, zone: "12a" },
        { low: 55, high: 60, zone: "12b" },
        { low: 60, high: 65, zone: "13a" },
        { low: 65, high: 70, zone: "13b" }];
      for (let i = 0; i < zoneMap.length; i++) {
        if (TMINAvg >= zoneMap[i].low && TMINAvg <= zoneMap[i].high) {
          return zoneMap[i].zone;
        }
      }
    };

    const avgDateString = (seasonStartsEnds) => {
      // normalize to current year
      let currentYear = new Date().getFullYear()
      const normalizedDates = seasonStartsEnds.map(el => new Date(el.obs_date.setFullYear(currentYear)))
      // convert to milleseconds
      normalizedDates.forEach((el, ind, arr) => arr[ind] = el.getTime());
      // Sum and divide by normalized Dates' lengh creating a new date
      const averageDate = new Date(normalizedDates.reduce((prev, next) => prev + next) / normalizedDates.length);
      return averageDate.toISOString().substring(5, 10);

    }


    const averageSeasonLength = (seasonEnds, seasonStarts) => {
      // normalize to current year
      let currentYear = new Date().getFullYear()
      const normalizedStarts = seasonStarts.map(el => new Date(el.obs_date.setFullYear(currentYear)))
      const normalizedEnds = seasonEnds.map(el => new Date(el.obs_date.setFullYear(currentYear)))

      // convert to milleseconds
      normalizedStarts.forEach((el, ind, arr) => arr[ind] = el.getTime());
      normalizedEnds.forEach((el, ind, arr) => arr[ind] = el.getTime());

      // Calculate the difference between start and end dates for each year
      const seasonLengthsDays = []
      for (let i = 0; i < normalizedStarts.length; i++) {
        seasonLengthsDays[i] = normalizedEnds[i] - normalizedStarts[i];
      }
      // Convert each difference into days
      seasonLengthsDays.forEach((el, ind, arr) => arr[ind] = el / 1000 / 60 / 60 / 24);
      // Calculate average season length
      return seasonLengthsDays.reduce((prev, next) => prev + next) / seasonLengthsDays.length

    }
    // Final return from the script
    const calculateGParams = async (db, TMAX, TMIN) => {
      // insert values into TMIN and TMAX tables
      try {
        await db.growingCalcs.truncateTMAX();
        await db.growingCalcs.truncateTMIN();
        await TMIN.forEach(async (el) => await db.growingCalcs.insertIntoTMIN(el.value, el.date))
        await TMAX.forEach(async el => await db.growingCalcs.insertIntoTMAX(el.value, el.date))
        await db.growingCalcs.selectHighestDuplicates();
        await db.growingCalcs.selectLowestDuplicates();
        const TMINAvg = await db.growingCalcs.tminAvg();
        const seasonStarts = await db.growingCalcs.GDD35SpringTransitions();
        const seasonEnds = await db.growingCalcs.GDD35WinterTransitions();
        return {
          hardiness_zone: hardinessZoneCalculator(TMINAvg[0].round),
          first_gdd35: avgDateString(seasonStarts),
          last_gdd35: avgDateString(seasonEnds),
          growing_season_length: Math.round(averageSeasonLength(seasonEnds, seasonStarts))
        }
      } catch (err) { console.log(err) }
    };

    const apiLogic = async (coordinateString) => {
      let APIOutputs;
      // @ts-ignore
      await axios.get(`https://www.ncdc.noaa.gov/cdo-web/api/v2/stations?extent=${coordinateString}&dataset=GHCND&datatypeid=TMIN&datatypeid=TMAX&endDate=${edString}&limit=1000`, { headers: { token: NOAA_TOKEN } })
        .then(async res => {
          // Concatenate station names into a string for data request
          if (res.data.results) {
            const stationString = res.data.results.reduce((acc, next) => acc + (acc ? "stationid=" + next.id + "&" : "stationid=" + next.id + "&"), "");
            // @ts-ignore
            await axios.get(`https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&datatypeid=TMAX&datatypeid=TMIN&units=standard&startdate=${sdString}&enddate=${edString}&limit=1000&${stationString}includemetadata=false`, { headers: { token: NOAA_TOKEN } })
              .then(async res => {
                // Check if station list returns results if not, expand the search area by 20 km2
                if (res.data.results) {
                  // Run the query 10 times getting any available data from the towers collected during the second request reducing the year value each time to get 10 years of data
                  // Must run seperate queries to get around NOAA 1-year Data limitation
                  try {
                    const output1 = getDataFromNOAA(edString, sdString, stationString)
                    await forBlock();
                    const output2 = getDataFromNOAA(edString, sdString, stationString)
                    await forBlock();
                    const output3 = getDataFromNOAA(edString, sdString, stationString)
                    await forBlock();
                    const output4 = getDataFromNOAA(edString, sdString, stationString)
                    await forBlock();
                    const output5 = getDataFromNOAA(edString, sdString, stationString)
                    await forBlock();
                    const output6 = getDataFromNOAA(edString, sdString, stationString)
                    await forBlock();
                    const output7 = getDataFromNOAA(edString, sdString, stationString)
                    await forBlock();
                    const output8 = getDataFromNOAA(edString, sdString, stationString)
                    await forBlock();
                    const output9 = getDataFromNOAA(edString, sdString, stationString)
                    await forBlock();
                    const output10 = getDataFromNOAA(edString, sdString, stationString)

                    APIOutputs = await Promise.all([output1, output2, output3, output4, output5, output6, output7, output8, output9, output10]);

                  } catch (err) { console.log(err) }
                } else { return null }
              }).catch(err => console.log(err))
          }
        }).catch(err => console.log(err));
      return APIOutputs
    };

    let searchHalfSide = 0;
    let foundTowers = false;
    // collector for initial axios requests
    const thisTMINMAX = { TMIN: [], TMAX: [] };
    try {
      // Get lat and long from Google Maps API for Use with FCC lat/long-to-FIPS API
      // @ts-ignore
      await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(street + "+" + city + "+" + state + "+" + zipcode)}&key=${GOOGLE_API_KEY}`)
        .then(async res => {
          try {
            const location = res.data.results[0].geometry.location;
            searchHalfSide += 0.5;
            let coordinateArray = boundingBox(location.lat, location.lng, searchHalfSide);
            let coordinateString = coordinateArray.join(",")
            // Expand the half side of the bounding box by 0.5 km and whole side by 1km until data is found. 
            let APIOutputs = await apiLogic(coordinateString)
            while (foundTowers === false) {
              if (APIOutputs) {
                foundTowers = true;
                thisTMINMAX.TMIN = [...APIOutputs[0].TMIN, ...APIOutputs[1].TMIN, ...APIOutputs[2].TMIN, ...APIOutputs[3].TMIN, ...APIOutputs[4].TMIN, ...APIOutputs[5].TMIN, ...APIOutputs[6].TMIN, ...APIOutputs[7].TMIN, ...APIOutputs[8].TMIN, ...APIOutputs[9].TMIN]
                thisTMINMAX.TMAX = [...APIOutputs[0].TMAX, ...APIOutputs[1].TMAX, ...APIOutputs[2].TMAX, ...APIOutputs[3].TMAX, ...APIOutputs[4].TMAX, ...APIOutputs[5].TMAX, ...APIOutputs[6].TMAX, ...APIOutputs[7].TMAX, ...APIOutputs[8].TMAX, ...APIOutputs[9].TMAX];
              } else if (!APIOutputs && foundTowers === false) {
                searchHalfSide += 2.5;
                coordinateArray = boundingBox(location.lat, location.lng, searchHalfSide);
                coordinateString = coordinateArray.join(",");
                APIOutputs = await apiLogic(coordinateString);
              }
            }
          } catch (err) { console.log(err) }
        });
    } catch (err) { console.log(err) };

    const output = await calculateGParams(db, thisTMINMAX.TMAX, thisTMINMAX.TMIN);
    return output;
  }
};