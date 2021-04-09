SELECT
  *
FROM (
  SELECT
    observation_date,
    temperature,
    ROW_NUMBER() OVER (PARTITION BY (observation_date) ORDER BY temperature DESC) rn
FROM tmax) tmp
WHERE
  rn = 1;

