DELETE FROM tmin
WHERE id IN (
    SELECT
      id
    FROM (
      SELECT
        id,
        observation_date,
        temperature,
        ROW_NUMBER() OVER (PARTITION BY (observation_date) ORDER BY temperature ASC) rn
    FROM tmin) tmp
WHERE tmp.rn > 1);

