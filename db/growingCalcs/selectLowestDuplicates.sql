-- Removes the highest temperatures from duplicate observation dates from the tmin table
DELETE FROM tmin
-- We delete the highest temperatures on each observation date
WHERE id IN (
  -- This table contains only the ids of the highest tmperatures on each observation date (where rn is greater than 1)
    SELECT
      id
    FROM (
      -- tmp contains id, observation_date, temperature and a number indicating the temperature ranking from lowest to highest on a particular observation date from the tmin table
      SELECT
        id,
        observation_date,
        temperature,
        ROW_NUMBER() OVER (PARTITION BY (observation_date) ORDER BY temperature ASC) rn
    FROM tmin) tmp
WHERE tmp.rn > 1);

