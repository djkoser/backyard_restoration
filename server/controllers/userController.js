const axios = require('axios');
const bcrypt = require("bcryptjs");
const { GOOGLE_API_KEY, NOAA_TOKEN } = process.env;

module.exports = {
  newUser: async (req, res) => {
    // Initialize TMAX and TMIN arrays for growing zone and GDD calcualtion
    let TMAX = [];
    let TMIN = [];

    // Zip iteration and FiPS query iteration counts. 
    let count = 0;
    const zipIterations = 8
    const FIPSIterations = 9

    const { email, password, first_name, last_name, street, city, state, zipcode } = req.body;
    const db = req.app.get('db');
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // function for delaying calls to NOAA
    const delay = interval => new Promise(resolve => setTimeout(resolve, interval))
    // Function designed to convert date into ISO formatted date without time data. 
    const date2String = (dateParam = new Date()) => {
      return dateParam.toISOString().match(/\d\d\d\d-\d\d-\d\d/)[0];
    }
    // subtracts one year from passed-in date and returns new date object
    const less1Date = (dateParam = new Date()) => {
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
    // Also added setTimeout to prevent too many requests per second to NOAA server when "looping" 
    const getDataFromNOAA = async (acc, datatype, edString, sdString, locationType, zipFips, iterations) => {
      axios.get(`https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&datatypeid=${datatype}&units=standard&startdate=${sdString}&enddate=${edString}&locationid=${locationType}:${zipFips}&limit=1000`, { headers: { token: NOAA_TOKEN } })
        .then(res => {
          res.data.results.forEach(el => acc.push({ value: el.value, date: el.date }));
          count === iterations ? calculateGParams() : count += 1;
        })
        .catch(err => { console.log(err) })
      await delay(500)
    }

    // Block of code acting like a for loop -> subtracts one year from sd and ed and uses this to getData from NOAA
    const forBlock = async (acc, type, locationType, location, iterations) => {
      console.log(sd, ed)
      sd = less1Date(sd);
      ed = less1Date(ed);
      edString = date2String(ed);
      sdString = date2String(sd);
      await getDataFromNOAA(acc, type, edString, sdString, locationType, location, iterations);
    }

    // Calculate absolute TMIN, TMAX and determine hardiness zone, Season STart Date and Average Season length over a 5 year period

    const calculateGParams = async () => {
      console.log(TMIN.length, TMAX.length);
      // insert values into TMIN and TMAX tables
      await db.growingCalcs.truncateTMAX();
      await db.growingCalcs.truncateTMIN();
      TMIN.forEach(async el => await db.growingCalcs.insertIntoTMIN(el.value, el.date))
      TMAX.forEach(async el => await db.growingCalcs.insertIntoTMAX(el.value, el.date))
      const TMAXFiltered = await db.growingCalcs.selectHighestDuplicates();
      const TMINFiltered = await db.growingCalcs.selectLowestDuplicates();

      // Remove day values from date to break data into years and add this back to the TMIN table
      await db.growingCalcs.truncateTMIN();
      TMINFiltered.forEach(async el => {
        el.observation_date = new Date(el.observation_date.getFullYear(), 0)
        await db.growingCalcs.insertIntoTMIN(el.temperature, el.observation_date)
      })

      let yearlyAvgTMIN = await db.growingCalcs.TMINByYear()
      console.log(yearlyAvgTMIN)
      const numYears = yearlyAvgTMIN.length;
      yearlyAvgTMIN = yearlyAvgTMIN.reduce((acc, el) => acc + el);
      yearlyAvgTMIN = yearlyAvgTMIN / numYears;

      console.log(yearlyAvgTMIN);

      let hardinessZone;
      if (yearlyAvgTMIN >= -60 && yearlyAvgTMIN < -55) {
        hardinessZone = "1a"
      } else if (yearlyAvgTMIN >= -55 && yearlyAvgTMIN < -50) {
        hardinessZone = "1b"
      } else if (yearlyAvgTMIN >= -50 && yearlyAvgTMIN < -45) {
        hardinessZone = "2a"
      } else if (yearlyAvgTMIN >= -45 && yearlyAvgTMIN < -40) {
        hardinessZone = "2b"
      } else if (yearlyAvgTMIN >= -40 && yearlyAvgTMIN < -35) {
        hardinessZone = "3a"
      } else if (yearlyAvgTMIN >= -35 && yearlyAvgTMIN < -30) {
        hardinessZone = "3b"
      } else if (yearlyAvgTMIN >= -30 && yearlyAvgTMIN < -25) {
        hardinessZone = "4a"
      } else if (yearlyAvgTMIN >= -25 && yearlyAvgTMIN < -20) {
        hardinessZone = "4b"
      } else if (yearlyAvgTMIN >= -20 && yearlyAvgTMIN < -15) {
        hardinessZone = "5a"
      } else if (yearlyAvgTMIN >= -15 && yearlyAvgTMIN < -10) {
        hardinessZone = "5b"
      } else if (yearlyAvgTMIN >= -10 && yearlyAvgTMIN < -5) {
        hardinessZone = "6a"
      } else if (yearlyAvgTMIN >= -5 && yearlyAvgTMIN < 0) {
        hardinessZone = "6b"
      } else if (yearlyAvgTMIN >= 0 && yearlyAvgTMIN < 5) {
        hardinessZone = "7a"
      } else if (yearlyAvgTMIN >= 5 && yearlyAvgTMIN < 10) {
        hardinessZone = "7b"
      } else if (yearlyAvgTMIN >= 10 && yearlyAvgTMIN < 15) {
        hardinessZone = "8a"
      } else if (yearlyAvgTMIN >= 15 && yearlyAvgTMIN < 20) {
        hardinessZone = "8b"
      } else if (yearlyAvgTMIN >= 20 && yearlyAvgTMIN < 25) {
        hardinessZone = "9a"
      } else if (yearlyAvgTMIN >= 25 && yearlyAvgTMIN < 30) {
        hardinessZone = "9b"
      } else if (yearlyAvgTMIN >= 30 && yearlyAvgTMIN < 35) {
        hardinessZone = "10a"
      } else if (yearlyAvgTMIN >= 35 && yearlyAvgTMIN < 40) {
        hardinessZone = "10b"
      } else if (yearlyAvgTMIN >= 40 && yearlyAvgTMIN < 45) {
        hardinessZone = "11a"
      } else if (yearlyAvgTMIN >= 45 && yearlyAvgTMIN < 50) {
        hardinessZone = "11b"
      } else if (yearlyAvgTMIN >= 50 && yearlyAvgTMIN < 55) {
        hardinessZone = "12a"
      } else if (yearlyAvgTMIN >= 55 && yearlyAvgTMIN < 60) {
        hardinessZone = "12b"
      } else if (yearlyAvgTMIN >= 60 && yearlyAvgTMIN < 65) {
        hardinessZone = "13a"
      } else if (yearlyAvgTMIN >= 65 && yearlyAvgTMIN < 70) {
        hardinessZone = "13b"
      }
    };

    // Get TMAX for the First year (1-Year Data Restriction)
    // if data returned for zipcode, proceed with zipcode querying, if no data, use county FIPS code
    // @ts-ignore
    axios.get(`https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&datatypeid=TMAX&units=standard&startdate=${sdString}&enddate=${edString}&locationid=ZIP:${zipcode}&limit=1000`, { headers: { token: NOAA_TOKEN } })
      .then(async res => {
        if (res.data.results.length === 0) {
          // Extra Steps required to get FIPS code to facilitate wider geographic range
          // @ts-ignore
          axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(street + "+" + city + "+" + state + "+" + zipcode)}&key=${GOOGLE_API_KEY}&address`)
            .then(axiosRes => {
              const location = axiosRes.data.results[0].geometry.location
              // Get lat and long from Google Maps API for Use with FCC lat/long-to-FIPS API
              // @ts-ignore
              axios.get(`https://geo.fcc.gov/api/census/block/find?latitude=${location.lat}&longitude=${location.lng}&showall=false&format=json`)
                .then(async res => {
                  // Run the query 5 times using FIPS code, reducing the year value each time to get 5 years of data
                  // Must run seperate queries to get around NOAA 1-year of Data limitation
                  const FIPS = res.data.County.FIPS;

                  await forBlock(TMIN, "TMIN", "FIPS", FIPS, FIPSIterations)
                  await forBlock(TMIN, "TMIN", "FIPS", FIPS, FIPSIterations)
                  await forBlock(TMIN, "TMIN", "FIPS", FIPS, FIPSIterations)
                  await forBlock(TMIN, "TMIN", "FIPS", FIPS, FIPSIterations)
                  await forBlock(TMIN, "TMIN", "FIPS", FIPS, FIPSIterations)
                  await forBlock(TMAX, "TMAX", "FIPS", FIPS, FIPSIterations)
                  await forBlock(TMAX, "TMAX", "FIPS", FIPS, FIPSIterations)
                  await forBlock(TMAX, "TMAX", "FIPS", FIPS, FIPSIterations)
                  await forBlock(TMAX, "TMAX", "FIPS", FIPS, FIPSIterations)
                  await forBlock(TMAX, "TMAX", "FIPS", FIPS, FIPSIterations)

                })
                // Completed Google Maps API Promise
                .catch(err => console.log(err))
            })
            // Completed FCC Promise
            .catch(err => console.log(err))
        } else {
          res.data.results.forEach(el => TMAX.push({ value: el.value, date: el.date }));
          // Run Query for TMIN to Catch it up
          await getDataFromNOAA(TMIN, "TMIN", edString, sdString, "ZIP", zipcode, zipIterations);

          // Run the query 4 more times using zipcode, reducing the year value each time to get 4 more years of data
          // Must run seperate queries to get around NOAA Data Limitations

          await forBlock(TMIN, "TMIN", "ZIP", zipcode, zipIterations);
          await forBlock(TMIN, "TMIN", "ZIP", zipcode, zipIterations);
          await forBlock(TMIN, "TMIN", "ZIP", zipcode, zipIterations);
          await forBlock(TMIN, "TMIN", "ZIP", zipcode, zipIterations);

          await forBlock(TMAX, "TMAX", "ZIP", zipcode, zipIterations);
          await forBlock(TMAX, "TMAX", "ZIP", zipcode, zipIterations);
          await forBlock(TMAX, "TMAX", "ZIP", zipcode, zipIterations);
          await forBlock(TMAX, "TMAX", "ZIP", zipcode, zipIterations);




        };
      }).catch(err => console.log(err))
    // db.user.newUser(email, first_name, last_name, street, city, state, zipcode, hash, lat, long, growing_season_length, first_gdd32, hardiness_zone)
  },
  login: async (req, res) => {
    const db = req.app.get('db')
  },
  logout: async (req, res) => {

  },
  getInfo: async (req, res) => {
    const db = req.app.get('db')
  }
};

