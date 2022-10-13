-- Keep only 8 lowest years
SELECT
  round(AVG(minTemp))
  -- we create a table containing the average of the 8 lowest years
FROM (
  -- tmp takes the year and minmum temperature recorded at each year and assigns them a number deonting their order in terms of coldest to warmest years allowing us to keep a select number of the lowest years
  SELECT
    minTemp,
    ROW_NUMBER() OVER (ORDER BY minTemp ASC) rn
  FROM (
    -- tmp2 contains the year and the minimum temperature recorded at each observation date, other date information has been removed and groups them by year selecting the lowest observation
  SELECT
    DATE_TRUNC('year', observation_date) obs_year,
    MIN(temperature) minTemp
  FROM tmin
GROUP BY obs_year) tmp2) tmp
WHERE
  rn < 9;

