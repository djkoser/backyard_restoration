DELETE FROM tmax
WHERE id IN (
    SELECT
      id
    FROM (
      SELECT
        id,
        observation_date,
        temperature,
        ROW_NUMBER() OVER (PARTITION BY (observation_date) ORDER BY temperature DESC) rn
    FROM tmax) tmp
WHERE tmp.rn > 1);

