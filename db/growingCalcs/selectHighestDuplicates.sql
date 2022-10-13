-- Removes the lowest temperatures from duplicate observation dates from the tmax table
DELETE FROM tmax
  -- This table contains only the ids of the lowest tmperatures on each observation date (where rn is greater than 1)
WHERE id IN (
    SELECT
      id
    FROM (
            -- tmp contains id, observation_date, temperature and a number indicating the temperature ranking from higheest to lowest on a particular observation date from the tmax table
      SELECT
        id,
        observation_date,
        temperature,
        ROW_NUMBER() OVER (PARTITION BY (observation_date) ORDER BY temperature DESC) rn
    FROM tmax) tmp
WHERE tmp.rn > 1);