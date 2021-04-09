SELECT
  AVG(temperature)
FROM
  tmin
GROUP BY
  observation_date
