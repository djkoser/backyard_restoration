SELECT
  *
FROM (
  SELECT
    observation_date,
    temperature,
    ROW_NUMBER() OVER (PARTITION BY observation_date ORDER BY temperature ASC) rn
  FROM tmin) tmp
WHERE
  rn = 1;

