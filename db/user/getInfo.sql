SELECT
  email,
  first_name,
  last_name,
  street,
  city,
  state,
  zipcode,
  growing_season_length,
  first_gdd35,
  hardiness_zone
FROM
  user_info
WHERE
  user_id = $1;

