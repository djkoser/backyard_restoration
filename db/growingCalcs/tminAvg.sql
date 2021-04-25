-- Keep only 8 lowest data points
SELECT
  round(AVG(minTemp))
FROM (
  SELECT
    minTemp,
    ROW_NUMBER() OVER (ORDER BY minTemp ASC) rn
  FROM (
  SELECT
    DATE_TRUNC('year', observation_date) obs_year,
    MIN(temperature) minTemp
  FROM tmin
GROUP BY obs_year) tmp2) tmp
WHERE
  rn < 9;

