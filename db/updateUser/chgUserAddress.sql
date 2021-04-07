UPDATE
  user_info
SET
  street = $2,
  city = $3,
  state = $4,
  zipcode = $5,
  lat = $6,
  long = $7,
  growing_season_length = $8,
  first_gdd32 = $9,
  hardiness_zone = $10
WHERE
  user_id = $1;

