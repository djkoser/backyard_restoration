SELECT
  weed_id,
  common_name,
  botanical_name,
  veg_type,
  src
FROM
  weed
WHERE
  veg_type = $1;

