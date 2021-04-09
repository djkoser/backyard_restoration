SELECT
  observation_date,
  MIN(temperature)
FROM
  tmin
GROUP BY
  observation_date;

