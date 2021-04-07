SELECT
  email,
  first_name,
  last_name,
  street,
  city,
  state,
  zipcode,
  lat,
  long,
  growing_season_length,
  first_gdd32,
  hardiness_zone
FROM
  user_info
WHERE
  user_id = $1;

